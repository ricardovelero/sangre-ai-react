import { useCallback, useState } from "react";
import useSWR from "swr";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { Analitica } from "@/types/analitica.types";

export function useAnaliticas() {
  const { token, isAuthenticated } = useAuthStore();
  const [analiticaToDelete, setAnaliticaToDelete] = useState<{
    _id: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Create an authenticated fetcher that automatically includes the token
  const authenticatedFetcher = useCallback(
    async (url: string) => {
      if (!token) throw new Error("No authentication token available");

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error cargando analiticas");
      return response.json();
    },
    [token]
  );

  // Only fetch when authenticated and token is available
  const { data, isLoading, error, mutate } = useSWR(
    isAuthenticated && token
      ? `${import.meta.env.VITE_APP_API_URL}/analitica`
      : null,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      onError: (err) => console.error("SWR Error:", err),
    }
  );

  // Add safety check for the returned data
  const analiticas = data ? (data as Analitica[]) : [];

  // Fetch a single analitica by ID
  const fetchAnaliticaById = useCallback(
    async (id: string): Promise<Analitica | null> => {
      if (!token) {
        toast.error("No authentication token available");
        return null;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/analitica/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Analitica not found");
        return await res.json();
      } catch (error) {
        toast.error("Error cargando analítica", {
          description: (error as Error).message,
        });
        return null;
      }
    },
    [token]
  );

  const useAnaliticaById = (id: string) => {
    const { data, error, mutate } = useSWR(
      id ? `${import.meta.env.VITE_APP_API_URL}/analitica/${id}` : null,
      authenticatedFetcher
    );

    return {
      analitica: data,
      isLoading: !error && !data,
      isError: error,
      mutate,
    };
  };

  // Update analitica
  const updateAnalitica = useCallback(
    async (analitica: Analitica) => {
      setIsProcessing(true);
      if (!token) {
        toast.error("No estás identificado para actualizar la analítica");
        return;
      }
      if (!analitica._id) {
        toast.error("ID de analítica no disponible");
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/analitica/${analitica._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(analitica),
          }
        );

        if (!res.ok) throw new Error("Hubo un error actualizando analítica.");
        toast.success("Analítica actualizada correctamente");
        await mutate(
          `${import.meta.env.VITE_APP_API_URL}/analitica/${analitica._id}`
        );
      } catch (error) {
        toast.error("Error al actualizar analítica", {
          description: (error as Error).message,
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [token]
  );
  // Delete analitica
  const handleDeleteAnalitica = async () => {
    if (!analiticaToDelete || !token) return;
    setIsProcessing(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/analitica/${
          analiticaToDelete._id
        }`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Error updating analítica");
      await mutate();
      toast.success("Analítica eliminada correctamente");
      setDeleteDialogOpen(false);
      setAnaliticaToDelete(null);
    } catch (error) {
      toast.error("Error al eliminar analítica", {
        description: (error as Error).message,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteNota = async (nota: string, analiticaId: string) => {
    setIsProcessing(true);
    if (!token) {
      toast.error("No estás identificado para eliminar la nota");
      return;
    }
    if (!analiticaId) {
      toast.error("ID de analítica no disponible");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/analitica/${analiticaId}/notas`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nota }),
        }
      );

      if (!res.ok) throw new Error("Error deleting nota");
      toast.success("Nota eliminada correctamente");
      await mutate(
        `${import.meta.env.VITE_APP_API_URL}/analitica/${analiticaId}`
      );
    } catch (error) {
      toast.error("Error al eliminar nota", {
        description: (error as Error).message,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    analiticas,
    isLoading,
    error,
    mutate,
    handleDeleteAnalitica,
    deleteDialogOpen,
    setDeleteDialogOpen,
    analiticaToDelete,
    setAnaliticaToDelete,
    isProcessing,
    fetchAnaliticaById,
    useAnaliticaById,
    updateAnalitica,
    handleDeleteNota,
  };
}
