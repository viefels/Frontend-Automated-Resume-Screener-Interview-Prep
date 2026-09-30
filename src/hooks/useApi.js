// hooks/useApi.js
import { useState, useCallback } from "react";

const PORT = import.meta.env.VITE_PORT || 3000;

export default function useApi(port = PORT) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  const request = useCallback(
    async (endpoint, options = {}, extLink = "") => {
      setLoading(true);
      setError(null);


      const host =
        typeof window !== "undefined"
          ? window.location.hostname
          : "localhost";

      const url = extLink || `http://${host}:${port}${endpoint}`;

      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        });

        const statusCode = response.status;
        setStatus(statusCode);

        const responseData = await response.json().catch(() => null);

        if (!response.ok) {
          const message =
            responseData?.error ||
            responseData?.message ||
            `Request failed with status ${statusCode}`;
          setError(message);
          return { data: null, status: statusCode, error: message };
        }

        setData(responseData);
        return { data: responseData, status: statusCode, error: null };

      } catch (err) {
        const networkError = err.message || "Network connection failed";
        setError(networkError);
        setStatus(0);
        return { data: null, status: 0, error: networkError };

      } finally {
        setLoading(false);
      }
    },
    [port]
  );

  return { request, loading, error, data, status };
}