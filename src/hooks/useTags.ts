import useSWR from "swr";
import { useAuthStore } from "@/store/authStore";
import { useCallback, useState } from "react";
import { Tag } from "@/types/tag.types";
import { toast } from "sonner";

export function useTags(analiticaId: string) {
  const { token, isAuthenticated } = useAuthStore();
  const [tagToDelete, setTagToDelete] = useState<{
    _id: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const authenticatedFetcher = useCallback(
    async (url: string) => {
      if (!token) throw new Error("No authentication token available");

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error loading tags");
      return response.json();
    },
    [token]
  );

  const { data, isLoading, error, mutate } = useSWR(
    isAuthenticated && token
      ? `${import.meta.env.VITE_APP_API_URL}/tags`
      : null,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      onError: (err) => console.error("SWR Error:", err),
    }
  );

  const tags = data ? (data as Tag[]) : [];

  const handleAddTag = async (analiticaId: string, name: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/tags`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("Error adding tag");
      toast.success("Etiqueta agregada correctamente");
      await mutate();
    } catch (error) {
      console.error("Error adding tage:", error);
      toast.error("Error al agregar etiqueta");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/tags/${tagId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error deleting tag");
      toast.success("Etiqueta eliminada correctamente");
      await mutate();
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error("Error al eliminar etiqueta");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    tags,
    isLoading,
    error,
    mutate,
    handleAddTag,
    handleDeleteTag,
    isProcessing,
    deleteDialogOpen,
    setDeleteDialogOpen,
    tagToDelete,
    setTagToDelete,
  };
}
