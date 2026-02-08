import { config } from 'dotenv';
import { TwitterService } from '../services/TwitterService';
import { OpenRouterService } from '../services/OpenRouterService';
import { KnowledgeBaseService } from '../services/KnowledgeBaseService';
import { loadConfig } from '../config/config';
import { logger } from '../utils/logger';
import * as path from 'path';

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForRateLimit(resetTime: number): Promise<void> {
  const now = Date.now();
  const resetDate = new Date(resetTime * 1000);
  const waitTime = Math.max(0, resetDate.getTime() - now);

  if (waitTime > 0 && waitTime < 900000) { // Only wait if less than 15 minutes
    logger.info(`Waiting for rate limit reset: ${Math.ceil(waitTime / 1000)} seconds until ${resetDate}`);
    await sleep(waitTime);
  } else {
    throw new Error('Rate limit wait time too long');
  }
}

async function main() {
  // Load environment variables
  config();
  const appConfig = loadConfig();

  // Initialize services
  const twitterService = new TwitterService(
    appConfig.twitter.apiKey,
    appConfig.twitter.apiSecret,
    appConfig.twitter.accessToken,
    appConfig.twitter.accessTokenSecret,
    appConfig.twitter.bearerToken,
  );

  const openRouterService = new OpenRouterService(appConfig.llm.apiKey, appConfig.llm.model);
  const knowledgeBaseService = new KnowledgeBaseService(
    path.join(__dirname, '../knowledge_base/btb_info.txt')
  );

  try {
    // Fetch the specific tweet
    const tweetId = '1876120727234937208';
    let tweet = null;
    let retries = 3;

    while (retries > 0 && !tweet) {
      try {
        tweet = await twitterService.getTweetById(tweetId);
      } catch (error: any) {
        if (error?.rateLimit?.reset) {
          try {
            await waitForRateLimit(error.rateLimit.reset);
            continue;
          } catch (waitError) {
            logger.error('Rate limit wait time too long, retrying later');
            retries--;
          }
        } else if (typeof error.message === 'string' && error.message.includes('Rate limit')) {
          logger.info('Rate limited without reset time, waiting 15 seconds before retry...');
          await sleep(15000);
          retries--;
        } else {
          throw error;
        }
      }
    }

    if (!tweet) {
      logger.error('Failed to fetch tweet after retries');
      return;
    }

    logger.info('Tweet content:', { text: tweet.text });

    // Extract question and get knowledge base context
    const question = tweet.text.replace(/\$BTB/gi, '').replace(/@\w+/g, '').trim();
    const context = await knowledgeBaseService.searchKnowledge(question);

    // Prepare prompt for Claude
    const prompt = `Please help me answer this question about BTB Finance: "${question}"

Here is some relevant context from the knowledge base:
${context}

Please provide a clear, concise, and accurate response that directly addresses the question. 
Keep the response under 280 characters to fit in a tweet.`;

    // Get Claude's response with retries
    let response = null;
    retries = 3;

    while (retries > 0 && !response) {
      try {
        response = await openRouterService.getResponse(prompt);
        // Ensure response fits in a tweet
        if (response.length > 280) {
          response = response.substring(0, 277) + '...';
        }
      } catch (error) {
        logger.error('Error getting Claude response:', error instanceof Error ? error.message : 'Unknown error');
        await sleep(5000);
        retries--;
      }
    }

    if (!response) {
      logger.error('Failed to get Claude response after retries');
      return;
    }

    logger.info('Claude response:', { response, length: response.length });

    // Reply to the tweet with retries
    retries = 3;
    while (retries > 0) {
      try {
        await twitterService.replyToTweet(response, tweet.id);
        logger.info('Successfully replied to tweet');
        break;
      } catch (error: any) {
        if (error?.rateLimit?.reset) {
          try {
            await waitForRateLimit(error.rateLimit.reset);
            continue;
          } catch (waitError) {
            logger.error('Rate limit wait time too long, retrying later');
            retries--;
          }
        } else if (typeof error.message === 'string' && error.message.includes('Rate limit')) {
          logger.info('Rate limited without reset time, waiting 15 seconds before retry...');
          await sleep(15000);
          retries--;
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    logger.error('Error in main process:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}

main().catch(error => {
  logger.error('Fatal error:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});
