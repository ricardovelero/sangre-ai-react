import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useAuthStore } from "@/store/authStore";
import { DataPoint } from "@/types/analitica.types";

interface UseAnaliticaDataProps {
  endpoint: string;
}

export const useAnaliticaData = ({ endpoint }: UseAnaliticaDataProps) => {
  const { getToken } = useAuthStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parameters, setParameters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const token = await getToken();

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const parametersConFecha = Object.keys(
          response.data[0]
        ) as (keyof DataPoint)[];

        const parametersSinFecha = parametersConFecha.filter(
          (item) => item !== "fecha"
        );

        setParameters(parametersSinFecha);

        const formattedData = response.data.map((entry: any) => ({
          ...entry,
          fecha: format(new Date(entry.fecha), "dd/MM/yyyy"),
        }));

        setData(formattedData);
      } catch (error: any) {
        setError(error.response?.data?.message || "Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error, parameters };
};
