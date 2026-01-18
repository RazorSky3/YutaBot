# 🤖 Yuta - Discord Bot

Bot de Discord con funcionalidades de gestión de canales de voz temporales, bienvenida automática y contador de miembros.

## 🌟 Características

- ✅ **Auto-Role**: Asigna automáticamente el rol "Miembro" a nuevos usuarios
- 👋 **Mensajes de Bienvenida**: Envía un embed personalizado cuando alguien se une
- 📊 **Contador de Miembros**: Actualiza automáticamente un canal de voz con el número total de miembros
- 🎮 **Canales de Voz Temporales**: Crea salas privadas cuando alguien se une a "Create Room"
- 🔔 **Notificaciones**: Avisa en el canal general cuando se crea una nueva sala

## 📋 Requisitos Previos

1. Una cuenta de Discord
2. Una cuenta de Replit (gratis)
3. Una cuenta de UptimeRobot (gratis) - para mantener el bot activo 24/7

## 🚀 Configuración en Replit

### Paso 1: Crear el Bot en Discord

1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Haz clic en "New Application"
3. Dale un nombre a tu aplicación (ej: "Yuta")
4. Ve a la sección "Bot" en el menú lateral
5. Haz clic en "Add Bot"
6. **Importante**: Activa estos "Privileged Gateway Intents":
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent
7. Copia el **Token** (lo necesitarás después)

### Paso 2: Invitar el Bot a tu Servidor

1. En el Developer Portal, ve a "OAuth2" > "URL Generator"
2. Selecciona estos scopes:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Selecciona estos permisos de bot:
   - ✅ Manage Roles
   - ✅ Manage Channels
   - ✅ Send Messages
   - ✅ Embed Links
   - ✅ Attach Files
   - ✅ Read Message History
   - ✅ Mention Everyone
   - ✅ Connect
   - ✅ Speak
   - ✅ Move Members
   - ✅ Manage Messages
4. Copia la URL generada y ábrela en tu navegador
5. Selecciona tu servidor y autoriza el bot

### Paso 3: Configurar en Replit

1. **Importa el proyecto a Replit**:
   - Ve a [Replit](https://replit.com)
   - Haz clic en "Create Repl"
   - Selecciona "Import from GitHub" o sube los archivos manualmente
   
2. **Configura las Variables de Entorno**:
   - En Replit, ve a la pestaña "Secrets" (🔒 en el panel izquierdo)
   - Agrega una nueva secret:
     - Key: `DISCORD_TOKEN`
     - Value: (pega el token que copiaste del Discord Developer Portal)

3. **Instala las Dependencias**:
   - Replit debería instalarlas automáticamente
   - Si no, ejecuta en la consola: `npm install`

4. **Ejecuta el Bot**:
   - Haz clic en el botón "Run" ▶️
   - Deberías ver: `Bot listo: Yuta#1234`

### Paso 4: Configurar IDs de Discord

El bot necesita los IDs de ciertos canales y roles de tu servidor. Edita el archivo `index.js` y actualiza el objeto `CONFIG`:

```javascript
const CONFIG = {
  MEMBER_ROLE_ID: 'TU_ROL_ID_AQUI',              // Rol que se asigna automáticamente
  MEMBER_COUNT_CHANNEL_ID: 'TU_CANAL_VOZ_ID',    // Canal de voz para mostrar contador
  WELCOME_CHANNEL_ID: 'TU_CANAL_BIENVENIDA_ID',  // Canal de texto para bienvenidas
  WELCOME_IMAGE_URL: 'URL_DE_TU_IMAGEN',         // Imagen del embed de bienvenida
  CREATE_ROOM_CHANNEL_ID: 'TU_CANAL_CREATE_ID',  // Canal de voz "Create Room"
  GENERAL_CHANNEL_ID: 'TU_CANAL_GENERAL_ID',     // Canal para notificaciones
};
```

#### ¿Cómo obtener los IDs?

1. En Discord, ve a "Configuración de Usuario" > "Avanzado"
2. Activa "Modo Desarrollador"
3. Haz clic derecho en cualquier canal/rol y selecciona "Copiar ID"

### Paso 5: Mantener el Bot Activo 24/7 con UptimeRobot

Replit pone los proyectos gratuitos en "sleep" después de inactividad. Para evitarlo:

1. **Obtén la URL de tu Repl**:
   - Cuando ejecutes el bot, Replit te dará una URL (ej: `https://yuta.tu-usuario.repl.co`)
   - O haz clic en el ícono de "Webview" en Replit

2. **Configura UptimeRobot**:
   - Ve a [UptimeRobot](https://uptimerobot.com) y crea una cuenta gratis
   - Haz clic en "+ Add New Monitor"
   - Configura así:
     - Monitor Type: `HTTP(s)`
     - Friendly Name: `Yuta Bot`
     - URL: `https://tu-repl-url.repl.co` (la URL de tu Replit)
     - Monitoring Interval: `5 minutes`
   - Haz clic en "Create Monitor"

¡Listo! UptimeRobot hará ping a tu bot cada 5 minutos para mantenerlo despierto.

## 🎮 Funcionalidades del Bot

### 1. Auto-Role
Cuando alguien se une al servidor, automáticamente recibe el rol configurado en `MEMBER_ROLE_ID`.

### 2. Mensaje de Bienvenida
Envía un embed personalizado en el canal de bienvenida con:
- Mención del nuevo miembro
- Imagen personalizada
- Mensaje de bienvenida

### 3. Contador de Miembros
Actualiza automáticamente el nombre de un canal de voz para mostrar:
```
𝕄𝕖𝕞𝕓𝕖𝕣 ℂ𝕠𝕦𝕟𝕥: 42
```

### 4. Canales de Voz Temporales
- Los usuarios se unen al canal "Create Room"
- El bot crea automáticamente un canal privado: `🌌┇：Chill Cage #1`
- El creador tiene permisos de administrador del canal
- Envía notificación con @everyone al canal general
- El mensaje se fija automáticamente
- Cuando todos salen, el canal se elimina automáticamente
- La notificación también se elimina

### 5. Estado del Bot
El bot muestra:
- Estado: "No Molestar" (círculo rojo)
- Actividad: "🎮 Valorant 1 / 5"

## 🛠️ Personalización

### Cambiar el Mensaje de Bienvenida
Edita en `index.js`:
```javascript
const welcomeEmbed = new EmbedBuilder()
  .setColor('#0099ff')
  .setTitle('Tu Título Aquí')
  .setDescription('Tu mensaje aquí')
  .setImage('URL_DE_TU_IMAGEN')
```

### Cambiar el Estado del Bot
Edita en `index.js`:
```javascript
client.user.setPresence({
  status: 'dnd', // online, idle, dnd, invisible
  activities: [{
    name: 'Tu actividad aquí',
    type: 0, // 0=Jugando, 1=Streaming, 2=Escuchando, 3=Viendo
  }],
});
```

### Cambiar el Nombre de las Salas Temporales
Edita en `index.js`:
```javascript
const channelName = `Tu Formato Aquí #${roomNumber}`;
```

## 📝 Estructura del Proyecto

```
Yuta/
├── index.js           # Código principal del bot
├── keep_alive.js      # Servidor HTTP para mantener activo
├── package.json       # Dependencias
├── .replit           # Configuración de Replit
├── replit.nix        # Entorno de Replit
├── .env.example      # Plantilla de variables de entorno
└── README.md         # Este archivo
```

## 🐛 Solución de Problemas

### El bot no responde
- Verifica que el token sea correcto en Secrets
- Asegúrate de que los "Privileged Gateway Intents" estén activados
- Revisa los logs en la consola de Replit

### Los canales temporales no se crean
- Verifica que el bot tenga permisos de "Manage Channels"
- Asegúrate de que `CREATE_ROOM_CHANNEL_ID` sea correcto
- El bot debe tener permisos en la categoría donde está "Create Room"

### El contador de miembros no se actualiza
- Verifica que "Server Members Intent" esté activado
- Asegúrate de que `MEMBER_COUNT_CHANNEL_ID` sea un canal de voz
- El bot necesita permisos de "Manage Channels"

### El bot se duerme en Replit
- Verifica que UptimeRobot esté configurado correctamente
- Asegúrate de que la URL sea correcta
- El intervalo debe ser de 5 minutos

## 📚 Recursos

- [Discord.js Documentation](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Replit Documentation](https://docs.replit.com/)
- [UptimeRobot](https://uptimerobot.com/)

## 📄 Licencia

ISC

## 👤 Autor

Creado para el servidor "California Niggas"

---

**¿Necesitas ayuda?** Revisa los logs en la consola de Replit o verifica que todos los IDs y permisos estén configurados correctamente.
