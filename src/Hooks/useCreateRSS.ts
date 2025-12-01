import { useState } from "react";
import { API_URL } from "./api";

export function useCreateRSS() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRSS = async (title: string, content: string, image?: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/rss`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, image })
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      return json;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createRSS, loading, error };
}
