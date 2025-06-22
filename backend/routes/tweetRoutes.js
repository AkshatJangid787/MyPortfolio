const express = require("express");
const router = express.Router();
const {
  getTweets,
  addTweet,
  fetchLatestFromTwitter
} = require("../controllers/tweetController");

router.get("/all", getTweets);                     // Frontend will call this anytime
router.post("/add", addTweet);                     // Optional - admin panel add
router.get("/fetchFromTwitter", fetchLatestFromTwitter); // Cron or manual sync

module.exports = router;
