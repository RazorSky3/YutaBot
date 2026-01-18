# 🛠️ Comandos Útiles para Replit

Comandos que puedes ejecutar en la consola de Replit para gestionar tu bot.

## 📦 Gestión de Dependencias

### Instalar todas las dependencias
```bash
npm install
```

### Instalar una dependencia específica
```bash
npm install nombre-del-paquete
```

### Actualizar dependencias
```bash
npm update
```

### Ver dependencias instaladas
```bash
npm list --depth=0
```

## 🚀 Ejecutar el Bot

### Iniciar el bot
```bash
npm start
```
o
```bash
node index.js
```

### Reiniciar el bot
Presiona `Ctrl + C` para detener, luego ejecuta de nuevo:
```bash
npm start
```

## 🔍 Debugging y Logs

### Ver logs en tiempo real
Los logs aparecen automáticamente en la consola de Replit cuando ejecutas el bot.

### Limpiar la consola
```bash
clear
```

### Ver versión de Node.js
```bash
node --version
```

### Ver versión de npm
```bash
npm --version
```

## 📁 Gestión de Archivos

### Listar archivos en el directorio actual
```bash
ls -la
```

### Ver contenido de un archivo
```bash
cat index.js
```

### Buscar texto en archivos
```bash
grep -r "texto_a_buscar" .
```

## 🧪 Testing

### Verificar sintaxis de JavaScript
```bash
node --check index.js
```

### Probar el servidor keep-alive
```bash
curl http://localhost:3000
```

### Probar el endpoint de status
```bash
curl http://localhost:3000/status
```

## 🔧 Solución de Problemas

### Si el bot no inicia - Verificar errores de sintaxis
```bash
node --check index.js
node --check keep_alive.js
```

### Si faltan dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

### Ver procesos en ejecución
```bash
ps aux
```

### Matar un proceso (si el bot se quedó colgado)
```bash
pkill -f node
```

## 🌐 Network y Conectividad

### Verificar que el puerto 3000 esté escuchando
```bash
netstat -tuln | grep 3000
```

### Hacer ping al servidor keep-alive
```bash
curl http://localhost:3000
```

### Obtener la URL pública de Replit
La URL aparece automáticamente en el panel de Webview, o puedes verla en:
```bash
echo $REPL_SLUG.$REPL_OWNER.repl.co
```

## 📊 Monitoreo

### Ver uso de memoria
```bash
free -h
```

### Ver uso de CPU
```bash
top
```
(Presiona `q` para salir)

### Ver espacio en disco
```bash
df -h
```

## 🔐 Variables de Entorno

### Ver variables de entorno (sin valores sensibles)
```bash
env | grep -v TOKEN
```

### Verificar que DISCORD_TOKEN esté configurado
```bash
echo ${DISCORD_TOKEN:0:10}...
```
(Esto solo muestra los primeros 10 caracteres)

## 🎨 Personalización

### Editar el archivo de configuración
```bash
nano index.js
```
(Presiona `Ctrl + X` para salir, `Y` para guardar)

### Hacer backup de un archivo
```bash
cp index.js index.js.backup
```

### Restaurar desde backup
```bash
cp index.js.backup index.js
```

## 📝 Git (si usas control de versiones)

### Inicializar repositorio
```bash
git init
```

### Ver estado
```bash
git status
```

### Agregar archivos
```bash
git add .
```

### Hacer commit
```bash
git commit -m "Mensaje del commit"
```

### Ver historial
```bash
git log --oneline
```

## 🚨 Comandos de Emergencia

### Detener el bot inmediatamente
```bash
Ctrl + C
```

### Reiniciar Replit completamente
Usa el botón "Stop" en la interfaz de Replit, luego "Run" de nuevo.

### Limpiar caché de npm
```bash
npm cache clean --force
```

### Reinstalar todo desde cero
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

## 💡 Tips Útiles

### Ejecutar comandos en segundo plano
```bash
npm start &
```

### Ver logs del bot en tiempo real
```bash
tail -f /tmp/bot.log
```
(Si configuras logging a archivo)

### Buscar errores en logs
```bash
grep -i "error" /tmp/bot.log
```

## 🔄 Actualización del Bot

### Después de hacer cambios en el código
1. Detén el bot: `Ctrl + C`
2. Guarda los cambios en Replit
3. Reinicia: `npm start`

### Si actualizas package.json
```bash
npm install
npm start
```

## 📞 Obtener Ayuda

### Ver ayuda de npm
```bash
npm help
```

### Ver ayuda de node
```bash
node --help
```

### Ver documentación de un paquete
```bash
npm docs discord.js
```

---

## ⚡ Atajos de Teclado en Replit

- `Ctrl + C` - Detener proceso
- `Ctrl + L` - Limpiar consola
- `Ctrl + D` - Salir de la shell
- `Ctrl + Z` - Suspender proceso
- `Tab` - Autocompletar comandos

---

**Nota**: Algunos comandos pueden no estar disponibles en el entorno de Replit debido a restricciones de seguridad.
