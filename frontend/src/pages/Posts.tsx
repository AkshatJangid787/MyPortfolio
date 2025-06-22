import React, { useEffect, useState } from "react";
import { Twitter } from "lucide-react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"; // Make sure this path is correct

const Skeleton = () => (
  <div className="w-full h-full bg-neutral-800 rounded-xl animate-pulse min-h-[400px]" />
);

const Posts = () => {
  const [tweetIds, setTweetIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  window.scrollTo(0, 0);

  fetch(`${import.meta.env.VITE_API_URL}/tweets/all`)
    .then((res) => res.json())
    .then((data) => setTweetIds(data.tweets))
    .catch((err) => console.error("Failed to load tweets", err))
    .finally(() => setLoading(false));
}, []);


  return (
    <div className="pt-20 bg-[#121212] min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#FF8C42] mb-4">My Posts</h1>
          <p className="text-lg text-gray-400">Latest updates from my social media</p>
        </div>
      </section>

      {/* Tweets Grid Section */}
      <section className="py-10 px-4 md:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto bg-[#050505] rounded-xl p-4 md:p-6 shadow-lg backdrop-blur">
          <div className="flex items-center gap-3 mb-6">
            <Twitter className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Recent Tweets</h3>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          ) : tweetIds.length === 0 ? (
            <div className="text-center text-gray-400 py-10">No tweets available.</div>
          ) : (
            <BentoGrid className="max-w-6xl">
              {[...tweetIds].reverse().map((id, index) => (
                <BentoGridItem
                  key={id}
                  title={`Tweet #${index + 1}`}
                  description="Latest post on Twitter"
                  icon={<Twitter className="w-4 h-4 text-blue-500" />}
                  header={
                    <div className="w-full h-full overflow-auto max-h-[400px] rounded-xl">
                      <TwitterTweetEmbed tweetId={id} options={{ theme: "dark" }} />
                    </div>
                  }
                />
              ))}
            </BentoGrid>
          )}
        </div>
      </section>
    </div>
  );
};

export default Posts;
