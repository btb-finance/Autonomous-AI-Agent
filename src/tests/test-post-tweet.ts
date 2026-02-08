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
    // Test tweet - add timestamp to avoid duplicates
    const timestamp = new Date().toISOString();
    const testTweet = `Test tweet from BTB AI Agent - ${timestamp} #BTB`;

    logger.info('Attempting to post tweet...');
    const tweetId = await twitterService.postTweet(testTweet);

    logger.info(`Successfully posted tweet! Tweet ID: ${tweetId}`);
    logger.info(`View tweet at: https://twitter.com/i/web/status/${tweetId}`);
  } catch (error) {
    logger.error('Failed to post tweet:', error);
    if (error instanceof Error) {
      logger.error('Error details:', error.message);
    }
  }
}

main().catch(error => {
  logger.error('Fatal error:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});