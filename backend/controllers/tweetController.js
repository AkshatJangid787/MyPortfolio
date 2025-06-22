const axios = require("axios");
const Tweet = require("../models/Tweet");

// ✅ GET all tweets (frontend will call this)
const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ addedAt: -1 }); // latest first
    res.status(200).json({ tweets: tweets.map(t => t.tweetId) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tweets", details: err.message });
  }
};

// ✅ POST add single tweet manually (optional for admin panel)
const addTweet = async (req, res) => {
  const { tweetId } = req.body;
  if (!tweetId) return res.status(400).json({ error: "Tweet ID is required" });

  try {
    const exists = await Tweet.findOne({ tweetId });
    if (!exists) {
      await Tweet.create({ tweetId });

      const total = await Tweet.countDocuments();
      if (total > 6) {
        const oldest = await Tweet.findOne().sort({ addedAt: 1 });
        await Tweet.deleteOne({ _id: oldest._id });
      }
    }

    const updated = await Tweet.find().sort({ addedAt: -1 });
    res.status(200).json({ message: "Tweet added", tweets: updated.map(t => t.tweetId) });
  } catch (err) {
    res.status(500).json({ error: "Failed to add tweet", details: err.message });
  }
};

// ✅ GET from Twitter API & update DB (called only 2 times a day)
const fetchLatestFromTwitter = async (req, res) => {
  try {
    const { TWITTER_BEARER_TOKEN, TWITTER_USERNAME } = process.env;

    // Step 1: Get user ID from username
    const userRes = await axios.get(
      `https://api.twitter.com/2/users/by/username/${TWITTER_USERNAME}`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
        }
      }
    );

    const userId = userRes.data.data.id;

    // Step 2: Get latest tweets
    const tweetsRes = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=2&exclude=replies,retweets`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
        }
      }
    );

    const fetchedIds = tweetsRes.data.data.map(t => t.id);
    let added = 0;

    for (const tweetId of fetchedIds) {
      const exists = await Tweet.findOne({ tweetId });
      if (!exists) {
        await Tweet.create({ tweetId });
        added++;
      }
    }

    // Keep only latest 6 tweets
    const total = await Tweet.countDocuments();
    if (total > 6) {
      const extra = await Tweet.find().sort({ addedAt: 1 }).limit(total - 6);
      for (const t of extra) {
        await Tweet.deleteOne({ _id: t._id });
      }
    }

    const updated = await Tweet.find().sort({ addedAt: -1 });
    res.status(200).json({
      message: `${added} new tweet(s) added from Twitter`,
      tweets: updated.map(t => t.tweetId)
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch from Twitter", details: err.message });
  }
};

module.exports = {
  getTweets,
  addTweet,
  fetchLatestFromTwitter
};
