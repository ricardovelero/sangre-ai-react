import useSWR from "swr";
import axios from "axios";
import { format } from "date-fns";
import { useAuthStore } from "@/store/authStore";
import { DataPoint } from "@/types/analitica.types";
import { useEffect, useState } from "react";

interface UseAnaliticaDataProps {
  endpoint: string;
}

const fetcher = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const parametersConFecha = Object.keys(
    response.data[0]
  ) as (keyof DataPoint)[];
  const parameters = parametersConFecha.filter(
    (item) => item !== "fecha"
  ) as string[];

  const formattedData = response.data.map((entry: any) => ({
    ...entry,
    fecha: format(new Date(entry.fecha), "dd/MM/yyyy"),
  }));

  return {
    data: formattedData,
    parameters,
  };
};

export const useAnaliticaData = ({ endpoint }: UseAnaliticaDataProps) => {
  const { getToken } = useAuthStore();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const newToken = await getToken();
      setToken(newToken);
    };
    fetchToken();
  }, [getToken]);

  const { data, error, isLoading } = useSWR(
    token ? [`${import.meta.env.VITE_APP_API_URL}${endpoint}`, token] : null,
    ([url, token]) => fetcher(url, token),
    {
      errorRetryCount: 3, // Retry 3 times on error
      errorRetryInterval: 5000, // Wait 5 seconds between retries
      shouldRetryOnError: (err) => {
        // Only retry on network errors or 5xx server errors
        return (
          axios.isAxiosError(err) &&
          (!err.response || err.response.status >= 500)
        );
      },
    }
  );

  return {
    data: data?.data ?? [],
    parameters: data?.parameters ?? [],
    loading: isLoading || !token,
    error: error?.message ?? null,
  };
};
