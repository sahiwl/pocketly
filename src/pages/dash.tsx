import { useEffect, useState } from "react";
import type { LinkResponseDTO } from "../types/dtos";
import { getAllLinks } from "../api";

export default function Dash() {
  const [links, setLinks] = useState<LinkResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true; //memory flag
    // if user walks away before links load, react will set load links causing memory leak - so we use a memory flag to prevent this
    async function fetchLinks() {
      try {
        setLoading(true);
        const resp = await getAllLinks();
        if (mounted) setLinks(resp);
      } catch (err) {
        if (mounted)
          setError(
            err instanceof Error ? err.message : "An unknown error occurred",
          );
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchLinks();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {links.map((link) => (
            <li key={link.id}>{link.url}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
