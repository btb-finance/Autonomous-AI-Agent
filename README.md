# BTB Finance Autonomous AI Agent 🤖

An intelligent Twitter bot that monitors mentions of $BTB, provides information about BTB Finance, and engages with the community using AI-powered responses.

**Repository:** [https://github.com/btb-finance/Autonomous-AI-Agent](https://github.com/btb-finance/Autonomous-AI-Agent)

## Features

- 🐦 **Twitter Integration**: Monitors mentions, replies to tweets, and posts updates
- 🤖 **AI-Powered Responses**: Uses any AI model from OpenRouter (Claude, GPT-4, Gemini, etc.)
- 📚 **Knowledge Base**: Maintains information about BTB Finance for accurate responses
- 🔄 **Real-time Processing**: Continuously monitors Twitter for new mentions
- 💰 **Wallet Integration**: Ready for future cryptocurrency features
- 🛡️ **Rate Limit Management**: Handles Twitter API rate limits gracefully
- ⚡ **TypeScript**: Built with TypeScript for type safety and better developer experience

## Prerequisites

- Node.js v18 or higher
- npm, yarn, or bun
- X (Twitter) Developer Account with API access (Basic tier recommended)
- OpenRouter API account
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/btb-finance/autonomous-ai-agent.git
cd autonomous-ai-agent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Twitter API

1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create a new app or use existing one
3. Navigate to "User authentication settings"
4. Ensure OAuth 1.0a is enabled with **"Read and write"** permissions
5. Generate the following credentials:
   - API Key and Secret
   - Access Token and Secret
   - Bearer Token
   - Client ID and Secret (OAuth 2.0)

### 4. Set Up OpenRouter

1. Sign up at [OpenRouter](https://openrouter.ai)
2. Generate an API key
3. Choose your preferred AI model from [available models](https://openrouter.ai/models)
   - Free options: deepseek/deepseek-r1-0528-qwen3-8b:free, nousresearch/hermes-3-llama-3.1-405b:free
   - Premium options: anthropic/claude-3.5-sonnet, openai/gpt-4-turbo, google/gemini-pro
4. Add credits if using premium models

### 5. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Twitter API OAuth 1.0a Credentials
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here
TWITTER_ACCESS_TOKEN=your_access_token_here
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret_here
TWITTER_BEARER_TOKEN=your_bearer_token_here

# Twitter OAuth 2.0 Credentials (optional, for future features)
TWITTER_CLIENT_ID=your_client_id_here
TWITTER_CLIENT_SECRET=your_client_secret_here

# OpenRouter API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here
# Choose any model from https://openrouter.ai/models
OPENROUTER_MODEL=your_preferred_model_here

# Ethereum Wallet Configuration (optional)
WALLET_PRIVATE_KEY=your_wallet_private_key_here
ETH_RPC_URL=your_ethereum_rpc_url_here
ETH_NETWORK=mainnet
```

### 6. Build the Project

```bash
npm run build
```

## Running the Bot

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Run in development mode with hot reload |
| `npm start` | Run the production build |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm test` | Run test suite |
| `npm run test:tweet` | Test tweet posting functionality |
| `npm run test:mentions` | Test mention fetching |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Testing Features

### Test Tweet Posting
```bash
npm run test:tweet
```
This will post a test tweet from your configured account.

### Test Mention Monitoring
```bash
npm run test:mentions
```
This will fetch the latest mentions of your account.

## How It Works

1. **Mention Monitoring**: The bot checks for new mentions every 60 seconds
2. **$BTB Detection**: Filters mentions containing "$BTB"
3. **Question Extraction**: Extracts the actual question from the tweet
4. **Knowledge Base Search**: Searches the local knowledge base for relevant information
5. **AI Response Generation**: Uses your chosen OpenRouter model to generate an appropriate response
6. **Tweet Reply**: Posts the response as a reply to the original tweet

## Project Structure

```
├── src/
│   ├── services/          # Core service implementations
│   │   ├── TwitterService.ts      # Twitter API integration
│   │   ├── OpenRouterService.ts   # AI service integration
│   │   ├── BTBTweetService.ts     # Main bot logic
│   │   ├── KnowledgeBaseService.ts # Knowledge management
│   │   └── WalletService.ts       # Crypto wallet integration
│   ├── config/            # Configuration management
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── index.ts           # Application entry point
├── knowledge_base/        # BTB Finance information
├── .env.example          # Environment variables template
└── package.json          # Project dependencies
```

## X (Twitter) API Limits (2026)

Be aware of X API pricing tiers:

| Tier | Cost | Read Limit | Post Limit |
|------|------|------------|------------|
| **Free** | $0 | Minimal | 1,500 tweets/month |
| **Basic** | $100/mo | 10,000 tweets/month | 3,000 tweets/month |
| **Pro** | $5,000/mo | 1,000,000 tweets/month | Full access |
| **Enterprise** | Custom | Unlimited | Revenue-sharing model |

> **2026 Updates:**
> - Pay-as-you-go beta available (Nov 2025)
> - Enterprise tier moved to revenue-sharing (July 2025)
> - v1.1 API endpoints deprecated

The bot includes automatic rate limit handling and will pause when limits are reached.

## Troubleshooting

### Common Issues

1. **403 Forbidden Error**: Your Twitter app needs "Read and write" permissions
2. **401 Unauthorized**: Check your API credentials are correct
3. **Rate Limit Errors**: The bot will automatically wait and retry
4. **OpenRouter Errors**: Ensure you have credits and valid API key

### Debug Mode

Enable detailed logging by setting the log level in your configuration:
```typescript
monitoring: {
  logLevel: 'debug'
}
```

## Security Notes

- Never commit your `.env` file
- Keep your API keys and tokens secure
- Regularly rotate your access tokens
- Use environment variables for all sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## Support

For issues and questions:
- Open an issue on GitHub
- Tweet at @btb_finance
- Check the [documentation](https://btb.finance/docs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
