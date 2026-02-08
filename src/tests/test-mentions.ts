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
    logger.info('Testing mention fetching...');

    // Try to fetch mentions
    const response = await twitterService.getMentionsWithRateLimit();

    logger.info(`Successfully fetched mentions:`, {
      count: response.mentions.length,
      rateLimit: response.rateLimit
    });

    if (response.mentions.length > 0) {
      logger.info('First mention:', response.mentions[0]);
    } else {
      logger.info('No mentions found');
    }
  } catch (error) {
    logger.error('Failed to fetch mentions:', error);
    if (error instanceof Error) {
      logger.error('Error details:', error.message);
    }
  }
}

main().catch(error => {
  logger.error('Fatal error:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});