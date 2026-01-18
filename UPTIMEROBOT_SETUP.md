# 🔄 Configuración de UptimeRobot

## ¿Por qué necesitas UptimeRobot?

Replit pone los proyectos gratuitos en modo "sleep" después de un período de inactividad. UptimeRobot hace "ping" a tu bot cada 5 minutos para mantenerlo despierto 24/7.

## Pasos para Configurar UptimeRobot

### 1. Obtén la URL de tu Replit

Después de ejecutar tu bot en Replit:

1. Busca el panel de "Webview" en Replit
2. Copia la URL que aparece (ejemplo: `https://yuta.tu-usuario.repl.co`)
3. O simplemente abre el bot y copia la URL del navegador

**Nota**: La URL debe mostrar el mensaje "🤖 Yuta Bot is alive and running!" cuando la abras.

### 2. Crea una Cuenta en UptimeRobot

1. Ve a [https://uptimerobot.com](https://uptimerobot.com)
2. Haz clic en "Sign Up" (Registrarse)
3. Usa tu email o regístrate con Google
4. Confirma tu email

### 3. Crea un Nuevo Monitor

1. Una vez dentro, haz clic en **"+ Add New Monitor"**
2. Configura los siguientes campos:

   ```
   Monitor Type: HTTP(s)
   Friendly Name: Yuta Discord Bot
   URL (or IP): https://tu-repl-url.repl.co
   Monitoring Interval: 5 minutes
   ```

3. Deja las demás opciones por defecto
4. Haz clic en **"Create Monitor"**

### 4. Verifica que Funciona

1. Espera unos minutos
2. En el dashboard de UptimeRobot verás:
   - ✅ **Up** (verde) = El bot está funcionando correctamente
   - ❌ **Down** (rojo) = Hay un problema

3. También puedes ver:
   - Uptime percentage (debe ser cercano al 100%)
   - Response time
   - Logs de cada ping

## 📊 Endpoints Disponibles

Tu bot tiene dos endpoints que puedes usar:

### 1. Endpoint Principal
```
https://tu-repl-url.repl.co/
```
Responde: "🤖 Yuta Bot is alive and running!"

### 2. Endpoint de Estado
```
https://tu-repl-url.repl.co/status
```
Responde con JSON:
```json
{
  "status": "online",
  "uptime": 12345.67,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🎯 Configuración Recomendada

Para el plan gratuito de UptimeRobot:

- **Intervalo**: 5 minutos (mínimo permitido)
- **Tipo de Monitor**: HTTP(s)
- **Método**: GET (por defecto)
- **Timeout**: 30 segundos (por defecto)

## ⚠️ Notas Importantes

1. **Plan Gratuito**: UptimeRobot gratis permite hasta 50 monitores con intervalos de 5 minutos
2. **Replit Gratuito**: Tiene límites de uso mensual. Si se excede, el bot se detendrá hasta el próximo mes
3. **Primer Ping**: Puede tardar hasta 5 minutos en hacer el primer ping después de crear el monitor
4. **Notificaciones**: Puedes configurar alertas por email si el bot se cae

## 🔧 Solución de Problemas

### El monitor muestra "Down"

1. Verifica que el bot esté corriendo en Replit
2. Abre la URL en tu navegador para confirmar que responde
3. Revisa los logs en Replit por errores
4. Asegúrate de que el puerto 3000 esté abierto

### El bot sigue durmiéndose

1. Verifica que UptimeRobot esté haciendo ping cada 5 minutos
2. Revisa los logs de UptimeRobot para ver si hay errores
3. Confirma que la URL sea correcta
4. Asegúrate de que `keep_alive.js` esté importado en `index.js`

### Error "Cannot GET /"

Esto es normal si:
- El servidor keep-alive no está iniciado
- Hay un error en `keep_alive.js`
- El puerto está bloqueado

Solución: Revisa los logs de Replit y asegúrate de que veas:
```
[KEEP-ALIVE] Servidor HTTP corriendo en puerto 3000
```

## 📱 Monitoreo desde el Móvil

UptimeRobot tiene apps móviles:
- [iOS App](https://apps.apple.com/app/uptimerobot/id1104878581)
- [Android App](https://play.google.com/store/apps/details?id=com.uptimerobot)

Puedes recibir notificaciones push si el bot se cae.

## 🎉 ¡Listo!

Una vez configurado, tu bot debería mantenerse activo 24/7. Puedes verificar el uptime en el dashboard de UptimeRobot.

---

**¿Necesitas ayuda?** Revisa el README.md principal o los logs de Replit para más información.
