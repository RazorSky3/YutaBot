# 🚀 Replit Deployment Guide

## ✅ Pre-Deployment Checklist

Your bot is now **ready for Replit deployment**! Here's what has been configured:

### Files Ready for Replit:
- ✅ `.replit` - Replit configuration (run command, port mapping)
- ✅ `package.json` - Dependencies and scripts
- ✅ `index.js` - Main bot file
- ✅ `keep_alive.js` - HTTP server with automatic port retry
- ✅ `.gitignore` - Excludes node_modules and sensitive files

### New Features Added:
- ✅ **Automatic Port Retry**: If port 3000 is busy, automatically tries 3001-3009
- ✅ **Better Error Handling**: Won't crash if port is in use
- ✅ **Helpful Scripts**: `npm run kill-port` to clear port conflicts

## 📦 How to Import to Replit

### Method 1: Upload ZIP File (Recommended)

1. **Create a ZIP file** of the Yuta folder:
   - Right-click the `Yuta` folder
   - Select "Send to" → "Compressed (zipped) folder"
   - Or use: `Compress-Archive -Path "../Downloads/Yuta" -DestinationPath "../Downloads/Yuta.zip"`

2. **Go to Replit**:
   - Visit https://replit.com
   - Click "Create Repl"
   - Select "Import from Upload"
   - Upload the `Yuta.zip` file

3. **Configure Environment Variables**:
   - In Replit, go to the "Secrets" tab (🔒 icon)
   - Add your Discord bot token:
     - Key: `DISCORD_TOKEN`
     - Value: `your_discord_bot_token_here`

4. **Run the Bot**:
   - Click the "Run" button
   - The bot will start automatically
   - You'll see: `[KEEP-ALIVE] ✅ Servidor HTTP corriendo en puerto 3000`

### Method 2: Import from GitHub

1. **Push to GitHub** (if you have a repository)
2. **In Replit**:
   - Click "Create Repl"
   - Select "Import from GitHub"
   - Enter your repository URL

## 🔧 Replit-Specific Configuration

### Port Configuration
The `.replit` file is already configured:
```
[[ports]]
localPort = 3000
externalPort = 80
```

This means:
- Your bot listens on port 3000 internally
- Replit exposes it on port 80 externally
- The automatic retry will use 3001-3009 if needed

### Environment Variables Needed
Create these in Replit's Secrets tab:
- `DISCORD_TOKEN` - Your Discord bot token (REQUIRED)
- `PORT` - Custom port (OPTIONAL, defaults to 3000)

## 📊 UptimeRobot Setup

After deploying to Replit:

1. **Get your Replit URL**:
   - After running, Replit will show a URL like: `https://yuta.username.repl.co`

2. **Configure UptimeRobot**:
   - Go to https://uptimerobot.com
   - Create a new monitor
   - Monitor Type: HTTP(s)
   - URL: `https://yuta.username.repl.co` (or `/status` endpoint)
   - Monitoring Interval: 5 minutes

3. **Verify it works**:
   - Visit your Replit URL in a browser
   - You should see: "🤖 Yuta Bot is alive and running!"

## 🧪 Testing Before Deployment

### Test 1: HTTP Endpoints ✅
```bash
curl http://localhost:3000
# Response: 🤖 Yuta Bot is alive and running!

curl http://localhost:3000/status
# Response: {"status":"online","uptime":84.45,"timestamp":"..."}
```

### Test 2: Port Retry (Optional)
To test the automatic port retry:
1. Keep the current bot running on port 3000
2. Try starting another instance
3. It should automatically use port 3001

## 🐛 Troubleshooting on Replit

### Issue: "Port already in use"
**Solution**: The automatic retry will handle this! You'll see:
```
[KEEP-ALIVE] ⚠️  Puerto 3000 está en uso (intento 1/10)
[KEEP-ALIVE] 🔄 Intentando puerto 3001...
[KEEP-ALIVE] ✅ Servidor HTTP corriendo en puerto 3001
```

### Issue: "Cannot find module 'express'"
**Solution**: Replit will auto-install dependencies from `package.json`
- If not, run: `npm install` in the Shell tab

### Issue: Bot not responding to Discord commands
**Solution**: 
- Check that `DISCORD_TOKEN` is set in Secrets
- Verify the token is correct
- Check bot permissions in Discord Developer Portal

## 📝 Files to Exclude from ZIP

The `.gitignore` already excludes:
- `node_modules/` (Replit will reinstall)
- `.env` (use Replit Secrets instead)
- `nssm-2.24/` (Windows-specific, not needed)
- `.vscode/`, `.idea/` (IDE files)

## ✨ What Happens on Replit

1. **Upload ZIP** → Replit extracts files
2. **Auto-detect** → Recognizes Node.js project
3. **Install deps** → Runs `npm install` automatically
4. **Run** → Executes `node index.js` (from `.replit`)
5. **Keep alive** → HTTP server starts on port 3000
6. **Bot online** → Discord bot connects and runs

## 🎯 Expected Output on Replit

```
[KEEP-ALIVE] 🚀 Iniciando servidor HTTP...
[KEEP-ALIVE] ✅ Servidor HTTP corriendo en puerto 3000
[KEEP-ALIVE] 🌐 URL: http://localhost:3000
[KEEP-ALIVE] 📊 Configura UptimeRobot para hacer ping a esta URL cada 5 minutos
Bot listo: Yuta#9857
```

## 🔒 Security Notes

- ✅ Never commit `.env` file with tokens
- ✅ Use Replit Secrets for `DISCORD_TOKEN`
- ✅ `.gitignore` is configured to exclude sensitive files
- ✅ Keep your Discord token private

## 📞 Support

If you encounter issues:
1. Check the Replit console for error messages
2. Verify environment variables in Secrets tab
3. Review `PORT_TROUBLESHOOTING.md` for port issues
4. Check Discord bot permissions and intents

---

**Your bot is ready to deploy! 🚀**
