import { config } from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';
import { logger } from '../utils/logger';

async function main() {
  // Load environment variables
  config();

  try {
    // Test with Bearer Token (App-only auth)
    logger.info('Testing Bearer Token authentication...');
    const bearerClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

    // This should work with bearer token
    const user = await bearerClient.v2.userByUsername('btb_finance');
    logger.info('Bearer token works! User info:', {
      id: user.data.id,
      name: user.data.name,
      username: user.data.username
    });

    // Test OAuth 1.0a
    logger.info('\nTesting OAuth 1.0a authentication...');
    const userClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });

    try {
      const me = await userClient.v2.me();
      logger.info('OAuth 1.0a works! Authenticated as:', {
        id: me.data.id,
        username: me.data.username
      });
    } catch (error: any) {
      logger.error('OAuth 1.0a failed:', error.message);
      if (error.code === 401) {
        logger.error('Check if your access tokens are valid and not expired');
      }
    }

  } catch (error) {
    logger.error('Error:', error);
  }
}

main().catch(error => {
  logger.error('Fatal error:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});