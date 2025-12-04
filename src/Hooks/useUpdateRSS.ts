import { useState } from "react";
import { API_URL } from "./api";
import type{ Rssitem } from "../services/rss.service";

export function useUpdateRSS() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateRSS = async (id: number, data: Partial<Rssitem>) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/rss/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
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

  return { updateRSS, loading, error };
}
