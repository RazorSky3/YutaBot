import 'dotenv/config';
import {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
} from 'discord.js';
import { keepAlive } from './keep_alive.js';

const CONFIG = {
  MEMBER_ROLE_ID: '1049104030070231151',            // Rol "Miembro"
  MEMBER_COUNT_CHANNEL_ID: '1138272471301226527',   // Canal Member Count (voz)
  WELCOME_CHANNEL_ID: '880857671597694978',         // Canal de bienvenida
  WELCOME_IMAGE_URL: 'https://images7.alphacoders.com/114/1143187.jpg', // Imagen de bienvenida
  CREATE_ROOM_CHANNEL_ID: '1462238875555463483',    // Create Room (voz) - genera canales temporales
  GENERAL_CHANNEL_ID: '880916181110890516',         // Canal general para notificaciones
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,    // Necesario para tener cache completa de miembros
    GatewayIntentBits.MessageContent,  // Necesario para menciones
  ],
  partials: [Partials.Channel],
});

const tempChannels = new Map(); // Map<channelId, { ownerId, number }>
const usedNumbers = new Set(); // Track used room numbers

function getNextRoomNumber() {
  let number = 1;
  while (usedNumbers.has(number)) {
    number++;
  }
  usedNumbers.add(number);
  return number;
}

function releaseRoomNumber(number) {
  usedNumbers.delete(number);
}


async function createTempVoiceChannel(member) {
  try {
    const guild = member.guild;
    const createRoomChannel = guild.channels.cache.get(CONFIG.CREATE_ROOM_CHANNEL_ID);
    if (!createRoomChannel) {
      console.error('[CREATE ROOM] Canal "Create Room" no encontrado');
      return null;
    }

    const roomNumber = getNextRoomNumber();
    const channelName = `🌌┇：Chill Cage #${roomNumber}`;

    // Create the temporary voice channel in the same category as Create Room
    const tempChannel = await guild.channels.create({
      name: channelName,
      type: 2, // Voice channel
      parent: createRoomChannel.parentId, // Same category as Create Room
      userLimit: 0, // No limit
      bitrate: createRoomChannel.bitrate || 64000,
      permissionOverwrites: [
        {
          id: guild.id,
          allow: ['Connect', 'Speak', 'Stream', 'UseVAD'],
        },
        {
          id: member.id,
          allow: ['Connect', 'Speak', 'Stream', 'UseVAD', 'ManageChannels', 'MoveMembers'],
        },
      ],
    });

    console.log(`[CREATE ROOM] Canal temporal creado: ${channelName} para ${member.user.tag}`);

    // Send notification to general channel
    let notificationMessageId = null;
    try {
      const generalChannel = await guild.channels.fetch(CONFIG.GENERAL_CHANNEL_ID);
      if (generalChannel && generalChannel.isTextBased()) {
        const notificationMessage = await generalChannel.send({ 
          content: `@everyone\n\n🌌 **Nuevo Room creado por ${member}**\n\n📍 Canal: ${tempChannel}`,
          allowedMentions: { parse: ['everyone'] }
        });
        
        notificationMessageId = notificationMessage.id;
        
        // Pin the message without showing the system message
        try {
          await notificationMessage.pin({ reason: 'Room notification' });
          
          // Delete the system message "Yuta pinned a message"
          const pinnedMessages = await generalChannel.messages.fetch({ limit: 5 });
          const systemMessage = pinnedMessages.find(
            msg => msg.type === 6 && msg.reference?.messageId === notificationMessage.id
          );
          
          if (systemMessage) {
            await systemMessage.delete();
            console.log(`[CREATE ROOM] Mensaje de sistema del pin eliminado`);
          }
          
          console.log(`[CREATE ROOM] Mensaje fijado en el canal general`);
        } catch (pinError) {
          console.error('[CREATE ROOM PIN ERROR]', pinError);
        }
        
        console.log(`[CREATE ROOM] Notificación enviada al canal general con @everyone`);
      }
    } catch (error) {
      console.error('[CREATE ROOM NOTIFICATION ERROR]', error);
    }

    // Store the temp channel info with notification message ID
    tempChannels.set(tempChannel.id, {
      ownerId: member.id,
      number: roomNumber,
      createdAt: Date.now(),
      notificationMessageId: notificationMessageId,
    });

    return tempChannel;
  } catch (error) {
    console.error('[CREATE ROOM ERROR]', error);
    return null;
  }
}

async function deleteTempChannelIfEmpty(channel) {
  if (!tempChannels.has(channel.id)) return;

  try {
    if (channel.members.size === 0) {
      const channelInfo = tempChannels.get(channel.id);
      
      // Delete the notification message from general channel
      if (channelInfo.notificationMessageId) {
        try {
          const generalChannel = await channel.guild.channels.fetch(CONFIG.GENERAL_CHANNEL_ID);
          if (generalChannel && generalChannel.isTextBased()) {
            const notificationMessage = await generalChannel.messages.fetch(channelInfo.notificationMessageId);
            
            // Unpin the message before deleting
            if (notificationMessage.pinned) {
              try {
                await notificationMessage.unpin();
                console.log(`[CREATE ROOM] Mensaje desfijado del canal general`);
              } catch (unpinError) {
                console.error('[CREATE ROOM UNPIN ERROR]', unpinError);
              }
            }
            
            await notificationMessage.delete();
            console.log(`[CREATE ROOM] Notificación eliminada del canal general`);
          }
        } catch (error) {
          console.error('[CREATE ROOM NOTIFICATION DELETE ERROR]', error);
        }
      }
      
      await channel.delete();
      tempChannels.delete(channel.id);
      releaseRoomNumber(channelInfo.number);
      console.log(`[CREATE ROOM] Canal temporal eliminado: ${channel.name}`);
    }
  } catch (error) {
    console.error('[CREATE ROOM DELETE ERROR]', error);
  }
}

async function updateMemberCountChannel(guild) {
  try {
    const channel = await guild.channels.fetch(CONFIG.MEMBER_COUNT_CHANNEL_ID);
    if (!channel || !channel.isVoiceBased()) return;

    await guild.members.fetch();

    const totalMembers = guild.members.cache.size;
    const newName = `𝕄𝕖𝕞𝕓𝕖𝕣 ℂ𝕠𝕦𝕟𝕥: ${totalMembers}`;

    if (channel.name !== newName) {
      await channel.setName(newName);
      console.log(`[MEMBER COUNT] Actualizado a: ${newName}`);
    }
  } catch (error) {
    console.error('[MEMBER COUNT ERROR]', error);
  }
}

client.on('voiceStateUpdate', async (oldState, newState) => {
  const guild = newState.guild;

  // Handle Create Room channel - user joins to create a temp channel
  if (
    newState.channelId === CONFIG.CREATE_ROOM_CHANNEL_ID &&
    oldState.channelId !== CONFIG.CREATE_ROOM_CHANNEL_ID
  ) {
    const member = newState.member;
    const tempChannel = await createTempVoiceChannel(member);
    
    if (tempChannel) {
      try {
        await member.voice.setChannel(tempChannel);
        console.log(`[CREATE ROOM] Usuario ${member.user.tag} movido a ${tempChannel.name}`);
      } catch (error) {
        console.error(`[CREATE ROOM MOVE ERROR]`, error);
        // If we can't move them, delete the empty channel
        await deleteTempChannelIfEmpty(tempChannel);
      }
    }
  }

  // Handle temp channel cleanup - delete when empty
  if (oldState.channelId && tempChannels.has(oldState.channelId)) {
    const channel = guild.channels.cache.get(oldState.channelId);
    if (channel) {
      await deleteTempChannelIfEmpty(channel);
    }
  }
});

client.on('guildMemberAdd', async member => {
  // Update member count
  updateMemberCountChannel(member.guild);

  // Assign member role automatically
  try {
    if (CONFIG.MEMBER_ROLE_ID) {
      await member.roles.add(CONFIG.MEMBER_ROLE_ID);
      console.log(`[AUTO-ROLE] Rol asignado automáticamente a ${member.user.tag}`);
    }
  } catch (error) {
    console.error(`[AUTO-ROLE ERROR] No se pudo asignar rol a ${member.user.tag}:`, error);
  }

  // Send welcome message
  try {
    const welcomeChannel = await member.guild.channels.fetch(CONFIG.WELCOME_CHANNEL_ID);
    if (!welcomeChannel || !welcomeChannel.isTextBased()) return;

    const welcomeEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Welcome to California Niggas!')
      .setDescription(`Welcome ${member} to California Niggas\nPlease read the rules to access the rest of the server\nenjoy`)
      .setImage(CONFIG.WELCOME_IMAGE_URL)
      .setTimestamp();

    const message = await welcomeChannel.send({ embeds: [welcomeEmbed] });
    
    // If it's an announcement channel, publish the message so everyone can see it
    if (welcomeChannel.type === 5) { // 5 = GUILD_ANNOUNCEMENT
      await message.crosspost().catch(() => {
        console.log(`[WELCOME] No se pudo publicar el mensaje (puede que no sea un canal de anuncios)`);
      });
      console.log(`[WELCOME] Mensaje de bienvenida enviado y publicado para ${member.user.tag}`);
    } else {
      console.log(`[WELCOME] Mensaje de bienvenida enviado para ${member.user.tag}`);
    }
  } catch (error) {
    console.error('[WELCOME ERROR]', error);
  }
});

client.on('guildMemberRemove', member => {
  updateMemberCountChannel(member.guild);
});

client.once('ready', () => {
  console.log(`Bot listo: ${client.user.tag}`);

  // Establecer estado a "No Molestar" (Do Not Disturb) con actividad personalizada
  client.user.setPresence({
    status: 'dnd', // Icono rojo "No molestar"
    activities: [
      {
        name: ' 🎮 Valorant 1 / 5',
        type: 0, // Jugando
      },
    ],
  });

  // Actualizar conteo al iniciar el bot en todos los servidores
  client.guilds.cache.forEach(guild => updateMemberCountChannel(guild));
});

// Iniciar servidor keep-alive para Replit
keepAlive();

client.login(process.env.DISCORD_TOKEN);
