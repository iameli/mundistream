import { BskyAgent } from "@atproto/api";
import * as process from "process";

// dotenv.config();

// Create a Bluesky Agent
const agent = new BskyAgent({
  service: "https://iame.li",
});

const PREFIX = `🔴 LIVE `;
const URL = "iame.li";

export default async function bluesky(message: string, time: number) {
  const url = `https://iame.li/#${time}`;
  const content = `${PREFIX}${URL} ${message}`.slice(0, 300);
  await agent.login({
    identifier: process.env.MUNDISTREAM_BLUESKY_USER!,
    password: process.env.MUNDISTREAM_BLUESKY_PASSWORD!,
  });
  await agent.post({
    text: content,
    facets: [
      {
        index: {
          // idk why it's off by two but it's static so let's just rock it
          byteStart: PREFIX.length + 2,
          byteEnd: PREFIX.length + URL.length + 2,
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#link",
            uri: url,
          },
        ],
      },
    ],
  });
}

// main();

// // Run this on a cron job
// const scheduleExpressionMinute = "* * * * *"; // Run once every minute for testing
// const scheduleExpression = "0 */3 * * *"; // Run once every three hours in prod

// const job = new CronJob(scheduleExpression, main); // change to scheduleExpressionMinute for testing

// job.start();
