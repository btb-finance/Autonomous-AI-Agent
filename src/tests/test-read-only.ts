import { config } from 'dotenv';
import { TwitterService } from '../services/TwitterService';
import { loadConfig } from '../config/config';
import { logger } from '../utils/logger';

async function main() {
  // Load environment variables
  config();
  const appConfig = loadConfig();

  // Initialize Twitter service
  const twitterService = new TwitterService(
    appConfig.twitter.apiKey,
    appConfig.twitter.apiSecret,
    appConfig.twitter.accessToken,
    appConfig.twitter.accessTokenSecret,
    appConfig.twitter.bearerToken,
  );

  try {
    logger.info('Testing read-only operations...');

    // Get user info (read operation)
    const userInfo = await twitterService.getUserInfo('1584835166400282624');
    logger.info('Successfully retrieved user info:', {
      username: userInfo.username,
      name: userInfo.name,
      followers: userInfo.metrics?.followersCount
    });

    // Try to get a specific tweet (read operation)
    const tweet = await twitterService.getTweetById('1876120727234937208');
    if (tweet) {
      logger.info('Successfully retrieved tweet:', {
        id: tweet.id,
        text: tweet.text.substring(0, 50) + '...'
      });
    }

    logger.info('\nRead operations work fine!');
    logger.info('To enable posting, please update your app permissions to "Read and write" in the Twitter Developer Portal.');

  } catch (error) {
    logger.error('Failed:', error);
  }
}

main().catch(error => {
  logger.error('Fatal error:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});