// components/TwitterEmbed.tsx
import { useEffect, useRef } from "react";

interface Props {
  tweetId: string;
}

const TwitterEmbed = ({ tweetId }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadScript = () => {
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          window.twttr?.widgets.load(ref.current);
        };
      } else {
        window.twttr.widgets.load(ref.current);
      }
    };

    loadScript();
  }, [tweetId]);

  return (
    <div ref={ref}>
      <blockquote
        className="twitter-tweet"
        data-theme="dark"
        data-width="100%"
        data-align="center"
      >
        <a href={`https://twitter.com/i/status/${tweetId}`}></a>
      </blockquote>
    </div>
  );
};

export default TwitterEmbed;
