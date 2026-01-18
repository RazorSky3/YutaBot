# ✅ Checklist de Deployment para Replit

Usa esta lista para asegurarte de que todo esté configurado correctamente.

## 📋 Antes de Subir a Replit

- [ ] Tienes todos los archivos del proyecto
- [ ] Has leído el README.md
- [ ] Tienes tu Discord Bot Token listo

## 🤖 Configuración del Bot de Discord

- [ ] Bot creado en [Discord Developer Portal](https://discord.com/developers/applications)
- [ ] Token del bot copiado (guárdalo en un lugar seguro)
- [ ] **Privileged Gateway Intents** activados:
  - [ ] Presence Intent
  - [ ] Server Members Intent
  - [ ] Message Content Intent
- [ ] Bot invitado al servidor con los permisos correctos
- [ ] IDs de Discord obtenidos (con Modo Desarrollador activado):
  - [ ] MEMBER_ROLE_ID (ID del rol "Miembro")
  - [ ] MEMBER_COUNT_CHANNEL_ID (ID del canal de voz para contador)
  - [ ] WELCOME_CHANNEL_ID (ID del canal de bienvenida)
  - [ ] CREATE_ROOM_CHANNEL_ID (ID del canal "Create Room")
  - [ ] GENERAL_CHANNEL_ID (ID del canal general)

## 🚀 Configuración en Replit

- [ ] Proyecto importado/subido a Replit
- [ ] Token agregado en Secrets (🔒):
  - Key: `DISCORD_TOKEN`
  - Value: (tu token)
- [ ] Archivo `index.js` actualizado con tus IDs en el objeto `CONFIG`
- [ ] Dependencias instaladas (automático o `npm install`)
- [ ] Bot ejecutado con el botón "Run" ▶️
- [ ] Mensaje "Bot listo: Yuta#1234" visible en consola
- [ ] Mensaje "[KEEP-ALIVE] Servidor HTTP corriendo en puerto 3000" visible

## 🌐 Verificación del Servidor Keep-Alive

- [ ] URL de Replit copiada (ej: `https://yuta.tu-usuario.repl.co`)
- [ ] URL abierta en navegador
- [ ] Mensaje "🤖 Yuta Bot is alive and running!" visible
- [ ] Endpoint `/status` funciona correctamente

## 🔄 Configuración de UptimeRobot

- [ ] Cuenta creada en [UptimeRobot](https://uptimerobot.com)
- [ ] Nuevo monitor creado:
  - [ ] Tipo: HTTP(s)
  - [ ] URL: URL de tu Replit
  - [ ] Intervalo: 5 minutos
- [ ] Monitor muestra estado "Up" (verde)
- [ ] Primer ping exitoso recibido

## 🧪 Pruebas del Bot

- [ ] Bot aparece online en Discord
- [ ] Estado personalizado visible ("🎮 Valorant 1 / 5")
- [ ] Contador de miembros actualizado
- [ ] Mensaje de bienvenida funciona (invita a alguien o usa una cuenta de prueba)
- [ ] Auto-role funciona (el nuevo miembro recibe el rol automáticamente)
- [ ] Canales temporales funcionan:
  - [ ] Usuario se une a "Create Room"
  - [ ] Se crea canal temporal automáticamente
  - [ ] Usuario es movido al nuevo canal
  - [ ] Notificación enviada al canal general
  - [ ] Mensaje fijado correctamente
  - [ ] Canal se elimina cuando está vacío
  - [ ] Notificación se elimina cuando el canal se borra

## 📊 Monitoreo Continuo

- [ ] Dashboard de UptimeRobot revisado
- [ ] Uptime cercano al 100%
- [ ] Logs de Replit sin errores críticos
- [ ] Bot respondiendo correctamente en Discord

## 🔧 Opcional pero Recomendado

- [ ] Notificaciones de UptimeRobot configuradas (email/SMS)
- [ ] App móvil de UptimeRobot instalada
- [ ] Backup del código guardado localmente
- [ ] Documentación de IDs guardada en lugar seguro
- [ ] `.env.example` actualizado con tus IDs (sin el token real)

## ⚠️ Seguridad

- [ ] Token NUNCA compartido públicamente
- [ ] Token NUNCA subido a GitHub/repositorios públicos
- [ ] Archivo `.env` en `.gitignore`
- [ ] Secrets de Replit usados en lugar de archivo `.env`

## 🎉 ¡Deployment Completo!

Si todos los items están marcados, ¡tu bot está listo y funcionando 24/7!

---

## 📝 Notas Adicionales

**Fecha de deployment**: _______________

**URL de Replit**: _______________

**UptimeRobot Monitor ID**: _______________

**Problemas encontrados**:
- 
- 
- 

**Soluciones aplicadas**:
- 
- 
- 

---

**Próximos pasos**:
- [ ] Monitorear el bot durante las primeras 24 horas
- [ ] Ajustar configuraciones según sea necesario
- [ ] Agregar nuevas funcionalidades (opcional)
