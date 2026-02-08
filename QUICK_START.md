# Quick Start Guide 🚀

Get the BTB Finance AI Bot running in 5 minutes!

## 1. Prerequisites Checklist ✅

- [ ] Node.js v18+ installed
- [ ] X (Twitter) Developer account (Basic tier $100/mo recommended)
- [ ] OpenRouter account with API key
- [ ] Git installed

## 2. Clone & Install 📦

```bash
git clone https://github.com/btb-finance/autonomous-ai-agent.git
cd autonomous-ai-agent
npm install
```

## 3. Twitter Setup 🐦

1. Visit https://developer.twitter.com
2. Go to your app settings
3. Enable **"Read and write"** permissions in OAuth 1.0a settings
4. Copy your credentials

## 4. Create .env File 🔐

```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TWITTER_ACCESS_TOKEN=your_token
TWITTER_ACCESS_TOKEN_SECRET=your_token_secret
TWITTER_BEARER_TOKEN=your_bearer_token

OPENROUTER_API_KEY=your_openrouter_key
```

## 5. Test & Run 🎯

### Test posting:
```bash
npm run test:tweet
```

### Run the bot:
```bash
npm run dev
```

## What Happens Next? 🤖

The bot will:
1. Monitor Twitter for mentions containing "$BTB"
2. Extract questions from tweets
3. Search its knowledge base
4. Generate AI responses using Claude 3.5 Sonnet
5. Reply automatically to tweets

## Troubleshooting 🔧

### "403 Forbidden" Error
→ Your Twitter app needs "Read and write" permissions

### "401 Unauthorized" Error  
→ Check your API credentials in `.env`

### Rate Limit Error
→ Bot will automatically wait and retry

## Need Help? 💬

- Open an issue on GitHub
- Tweet @btb_finance
- Join our Telegram: https://t.me/BTBFinance

---

Happy botting! 🎉