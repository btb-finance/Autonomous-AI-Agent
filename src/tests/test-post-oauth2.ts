import { config } from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';
import { logger } from '../utils/logger';

async function main() {
  // Load environment variables
  config();

  try {
    // Initialize with OAuth 2.0 User Context
    const client = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    });

    // For OAuth 2.0, you need to generate a link for user authorization
    // This is a simplified example - in production, you'd handle the callback
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
      'http://localhost:3000/callback',
      { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
    );

    logger.info('OAuth 2.0 Authorization needed.');
    logger.info('Please visit this URL to authorize the app:');
    logger.info(url);
    logger.info('\nNote: OAuth 2.0 requires a web server to handle the callback.');
    logger.info('For immediate testing, you need to:');
    logger.info('1. Update your app permissions in Twitter Developer Portal to "Read and write"');
    logger.info('2. Use the existing OAuth 1.0a setup which is already configured');

    // Alternative: Try with app-only authentication (limited functionality)
    const appOnlyClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

    logger.info('\nTrying to get user info with app-only auth...');
    const user = await appOnlyClient.v2.userByUsername('btb_finance');
    logger.info('User info retrieved:', {
      id: user.data.id,
      name: user.data.name,
      username: user.data.username
    });

  } catch (error) {
    logger.error('Error:', error);
  }
}

main().catch(error => {
  logger.error('Fatal error:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});