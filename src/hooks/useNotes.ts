import useSWR from "swr";
import { useAuthStore } from "@/store/authStore";
import { useCallback, useState } from "react";
import { Nota } from "@/types/analitica.types";
import { toast } from "sonner";

export function useNotes(analiticaId: string) {
  const { token, isAuthenticated } = useAuthStore();
  const [noteToDelete, setNoteToDelete] = useState<{
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

      if (!response.ok) throw new Error("Error loading notes");
      return response.json();
    },
    [token]
  );

  const { data, isLoading, error, mutate } = useSWR(
    isAuthenticated && token
      ? `${import.meta.env.VITE_APP_API_URL}/analitica/${analiticaId}/notes`
      : null,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      onError: (err) => console.error("SWR Error:", err),
    }
  );

  const notes = data ? (data as Nota[]) : [];

  const handleAddNote = async (analiticaId: string, content: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/analitica/${analiticaId}/notes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );
      if (!response.ok) throw new Error("Error adding note");
      toast.success("Nota agregada correctamente");
      await mutate();
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Error al agregar nota");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/analitica/${analiticaId}/notes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error deleting note");
      toast.success("Nota eliminada correctamente");
      await mutate();
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error al eliminar nota");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    notes,
    isLoading,
    error,
    mutate,
    handleAddNote,
    handleDeleteNote,
    isProcessing,
    deleteDialogOpen,
    setDeleteDialogOpen,
    noteToDelete,
    setNoteToDelete,
  };
}
