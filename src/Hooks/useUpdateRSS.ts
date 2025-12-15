import { useState } from "react";
import { API_URL } from "./api";
<<<<<<< HEAD
import type { Rssitem } from "../services/rss.service";
=======
import type{ Rssitem } from "../services/rss.service";
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98

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
