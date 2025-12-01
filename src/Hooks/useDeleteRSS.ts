import { useState } from "react";
import { API_URL } from "./api";

export function useDeleteRSS() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRSS = async (id: number) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/rss/${id}`, {
        method: "DELETE",
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

  return { deleteRSS, loading, error };
}
