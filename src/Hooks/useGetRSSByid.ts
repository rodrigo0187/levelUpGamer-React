import {useState} from "react";
import type {RSSitem} from "../Hooks/useRss";
import {API_URL} from "../Hooks/api";

export function useGetRSSById() {
  const [item, setItem] = useState<RSSitem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRSSById = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/rss/${id}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.message);

      setItem(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { item, loading, error, fetchRSSById };
}
