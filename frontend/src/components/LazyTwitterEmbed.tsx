// components/LazyTwitterEmbed.tsx
import React from "react";

const LazyTwitterTweetEmbed = React.lazy(() =>
  import("react-twitter-embed").then((mod) => ({
    default: mod.TwitterTweetEmbed,
  }))
);

export default LazyTwitterTweetEmbed;
