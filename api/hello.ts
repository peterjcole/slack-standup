import {VercelRequest, VercelResponse} from '@vercel/node';
import {WebClient} from '@slack/web-api'

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

const blocks = [
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": `<@${process.env.SLACK_TEMP_USER_MENTION}>, you're up for running standup tomorrow!`
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": `Is <@${process.env.SLACK_TEMP_USER_MENTION}> not around? Snooze them until:`
    },
    "accessory": {
      "type": "datepicker",
      "placeholder": {
        "type": "plain_text",
        "text": "Select the date they're back"
      },
      "action_id": "datepicker-action"
    }
  }
]



export default async (request: VercelRequest, response: VercelResponse) => {
  const result = await web.chat.postMessage({
    channel: process.env.SLACK_CHANNEL,
    blocks
  });
  const {name = 'World'} = request.query;
  response.status(200).send(`Hello ${name}!`);
};
