import { Analitica } from "@/types/analitica.types";
import { create } from "zustand";

type AnaliticaStore = {
  analitica: Analitica | null;
  setAnalitica: (analitica: Analitica) => void;
};

export const useAnaliticaStore = create<AnaliticaStore>((set) => ({
  analitica: null,
  setAnalitica: (analitica) => set({ analitica }),
}));
