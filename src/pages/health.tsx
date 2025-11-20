import { useEffect, useState } from "react";
import { bestatus } from "../api";

export default function Health() {
  const [healthData, setHealthData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchHealth() {
      try {
        const resp = await bestatus();
        if (mounted) setHealthData(resp);
      } catch (err) {
        if (mounted)
          setError(
            err instanceof Error
              ? err.message
              : "Failed to fetch health status",
          );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchHealth();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Health Status</h1>
      <pre>{JSON.stringify(healthData, null, 2)}</pre>
    </div>
  );
}
