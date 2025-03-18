import { useState, useEffect } from "react";

interface BloodTestResult {
  fecha: string;
  valores: {
    [key: string]: number | null;
  };
}

// Sample data structure - replace with your actual API call
const sampleData: BloodTestResult[] = [
  {
    fecha: "2023-01-15",
    valores: {
      colesterol_total: 210,
      HDL: 45,
      LDL: 130,
      trigliceridos: 150,
      glucosa: 92,
      hemoglobina: 14.5,
      leucocitos: 6.2,
      plaquetas: 250000,
    },
  },
  {
    fecha: "2023-03-10",
    valores: {
      colesterol_total: 195,
      HDL: 48,
      LDL: 120,
      trigliceridos: 135,
      glucosa: 90,
      hemoglobina: 14.8,
      leucocitos: 6.0,
      plaquetas: 260000,
    },
  },
  {
    fecha: "2023-06-22",
    valores: {
      colesterol_total: 185,
      HDL: 50,
      LDL: 115,
      trigliceridos: 120,
      glucosa: 88,
      hemoglobina: 15.0,
      leucocitos: 5.8,
      plaquetas: 265000,
    },
  },
  {
    fecha: "2023-09-30",
    valores: {
      colesterol_total: 180,
      HDL: 52,
      LDL: 110,
      trigliceridos: 115,
      glucosa: 85,
      hemoglobina: 15.2,
      leucocitos: 5.5,
      neutrofilos: 3.2,
      linfocitos: 2.0,
      monocitos: 0.3,
      plaquetas: 270000,
    },
  },
  {
    fecha: "2024-01-05",
    valores: {
      colesterol_total: 175,
      HDL: 55,
      LDL: 105,
      trigliceridos: 105,
      glucosa: 84,
      hemoglobina: 15.4,
      leucocitos: 5.4,
      neutrofilos: 3.0,
      linfocitos: 2.1,
      monocitos: 0.3,
      plaquetas: 275000,
      TGO_AST: 22,
      TGP_ALT: 25,
    },
  },
];

interface UseBloodTestsResult {
  data: BloodTestResult[];
  loading: boolean;
  error: string | null;
}

export const useBloodTests = (): UseBloodTestsResult => {
  const [data, setData] = useState<BloodTestResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchData = async () => {
      try {
        setLoading(true);

        // Simulate fetch delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // In a real app, replace this with your actual API call
        // const response = await fetch('/api/bloodtests');
        // const data = await response.json();

        setData(sampleData);
        setError(null);
      } catch (err) {
        setError("Error fetching blood test data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
