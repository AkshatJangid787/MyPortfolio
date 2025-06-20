
import { useState, useEffect } from 'react';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  loading: boolean;
  error: string | null;
}

export const useLeetCode = (username: string) => {
  const [stats, setStats] = useState<LeetCodeStats>({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true, error: null }));
        
        // Using a public LeetCode API proxy
        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch LeetCode data');
        }
        
        const data = await response.json();
        
        setStats({
          totalSolved: data.totalSolved || 0,
          easySolved: data.easySolved || 0,
          mediumSolved: data.mediumSolved || 0,
          hardSolved: data.hardSolved || 0,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching LeetCode data:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load LeetCode data',
        }));
      }
    };

    if (username) {
      fetchLeetCodeData();
    }
  }, [username]);

  return stats;
};
