import { Command } from "commander"
import { postTweet } from "../utils/post.js";

const tweet = new Command("tweet");

tweet.description("posts a tweet")
    .argument("<message>", "tweet content")
    .action(postTweet)

export {tweet}