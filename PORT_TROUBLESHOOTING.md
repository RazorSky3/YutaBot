# 🔧 Port Troubleshooting Guide

## Error: EADDRINUSE - Port Already in Use

If you see this error:
```
Error: listen EADDRINUSE: address already in use :::3000
```

This means port 3000 is already being used by another process.

## 🚀 Quick Solutions

### Solution 1: Kill the Process Using Port 3000 (Recommended)
```bash
npm run kill-port
```

This will terminate any process using port 3000.

### Solution 2: Kill Multiple Ports
If you've tried multiple ports:
```bash
npm run kill-all
```

This kills processes on ports 3000-3005.

### Solution 3: Manual Port Kill (Windows)
```bash
# Find the process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with the actual process ID)
taskkill /PID <PID> /F
```

### Solution 4: Manual Port Kill (Linux/Mac)
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

### Solution 5: Use a Different Port
Create a `.env` file in the project root:
```env
PORT=3001
```

The bot will now use port 3001 instead.

## 🎯 Automatic Port Retry Feature

The bot now includes automatic port retry! If port 3000 is busy, it will automatically try:
- Port 3001
- Port 3002
- Port 3003
- ... up to port 3009

You'll see messages like:
```
[KEEP-ALIVE] ⚠️  Puerto 3000 está en uso (intento 1/10)
[KEEP-ALIVE] 🔄 Intentando puerto 3001...
[KEEP-ALIVE] ✅ Servidor HTTP corriendo en puerto 3001
```

## 🔍 Checking What's Using the Port

### Windows
```bash
netstat -ano | findstr :3000
```

### Linux/Mac
```bash
lsof -i :3000
```

## 📝 Best Practices

1. **Always stop the bot properly** - Use Ctrl+C to stop the bot gracefully
2. **Check for running instances** - Before starting, make sure no other instance is running
3. **Use the kill-port script** - If you encounter the error, run `npm run kill-port` first
4. **Monitor the logs** - The bot will tell you which port it's using

## 🆘 Still Having Issues?

If the automatic retry fails after 10 attempts:
1. Restart your computer (this will clear all ports)
2. Check if another application is using ports 3000-3009
3. Set a custom port in `.env` file (e.g., `PORT=8080`)

## 📊 UptimeRobot Configuration

After the bot starts, note which port it's using from the logs:
```
[KEEP-ALIVE] ✅ Servidor HTTP corriendo en puerto 3001
[KEEP-ALIVE] 🌐 URL: http://localhost:3001
```

Update your UptimeRobot monitor URL accordingly.
