import useSWR from "swr";
import axios from "axios";
import { format } from "date-fns";
import { useAuthStore } from "@/store/authStore";
import { AnaliticaResponse } from "@/types/analitica.types";

interface UseAnaliticaDataProps {
  endpoint: string;
}

const fetcher = async (url: string, token: string) => {
  const response = await axios.get<AnaliticaResponse[]>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data.length === 0) {
    return {
      data: [],
      parameters: [],
    };
  }

  const parameters = response.data[0].resultados.map(
    (resultado: { nombre: string }) => resultado.nombre
  );

  const formattedData = response.data.map((entry: any) => ({
    ...entry,
    fecha: format(new Date(entry.fecha_toma_muestra), "dd/MM/yyyy"),
  }));

  return {
    data: formattedData,
    parameters: parameters.filter(
      (param): param is string => param !== undefined
    ),
  };
};

export const useAnaliticaData = ({ endpoint }: UseAnaliticaDataProps) => {
  const { token } = useAuthStore();

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
