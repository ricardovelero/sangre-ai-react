import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Para tablas y listas

const response = `**Análisis Integral de la Analítica**

Esta analítica sanguínea proporciona una visión general del estado de salud de Ricardo Antonio Rodríguez Vinces. Analizaremos cada sección, considerando tanto los valores dentro del rango normal como aquellos fuera de él, y cómo influyen en su salud general.

**1. Hemograma (Contaje y Fórmula Electrónico)**

*   **Hematocrito (46.5%):** Dentro del rango normal. Indica un volumen adecuado de glóbulos rojos en la sangre.
*   **Hemoglobina (15.7 g/dL):** Dentro del rango normal. Es la proteína que transporta el oxígeno en los glóbulos rojos.
*   **Hematíes (5.000.000 /μL):** Dentro del rango normal. Cantidad adecuada de glóbulos rojos.
*   **IDH (15.2):** Dentro del rango normal. Indica la variación en el tamaño de los glóbulos rojos.
*   **VCM (93.0 fL):** Dentro del rango normal. Tamaño promedio de los glóbulos rojos.
*   **HCM (31.4 pg):** Dentro del rango normal. Cantidad promedio de hemoglobina en cada glóbulo rojo.
*   **CHCM (33.76 g/dL):** Dentro del rango normal. Concentración promedio de hemoglobina en los glóbulos rojos.
*   **Plaquetas (159.000 /μL):** Dentro del rango normal. Importantes para la coagulación sanguínea.
*   **VPM (10.9 fL):** Dentro del rango normal. Tamaño promedio de las plaquetas.
*   **IDP (21.0):** Dentro del rango normal. Indica la variación en el tamaño de las plaquetas.

**Fórmula Leucocitaria (Glóbulos Blancos)**

*   **Leucocitos (4.640,00 /μL):** Dentro del rango normal. Cantidad total de glóbulos blancos, que son importantes para la defensa del organismo.
*   **Eosinófilos (2.5%):** Dentro del rango normal. Relacionados con alergias y parásitos.
*   **Basófilos (1.2%):** Dentro del rango normal. Participan en reacciones inflamatorias.
*   **Linfocitos (37.0%):** Dentro del rango normal. Importantes para la inmunidad.
*   **Monocitos (8.6%):** Dentro del rango normal. Participan en la respuesta inmune.
*   **Neutrófilos Totales (50.7%):** Dentro del rango normal. Principal defensa contra infecciones bacterianas.

**Interpretación del Hemograma:** En general, el hemograma indica un estado de salud hematológico normal. No hay signos de anemia, infección aguda o problemas de coagulación.

**2. Velocidad de Sedimentación Globular (VSG)**

*   **VSG Primera Hora (2.00 mm):** Dentro del rango normal. La VSG es un indicador de inflamación en el cuerpo. Un valor normal sugiere que no hay una inflamación sistémica significativa.

**3. Hemoglobina A1c (HbA1c)**

*   **HbA1c (5.3%):** Dentro del rango normal. Indica un buen control del azúcar en sangre en los últimos 2-3 meses.
* **HbA1c (34 mmol/mol):** Dentro del rango normal.

**4. Protrombina**
* **Tiempo protrombina (85%):** Dentro del rango normal
* **INR (1,12):** Dentro del rango normal
* **Ratio (1,11):** Dentro del rango normal.

**5. Ferritina**

*   **Ferritina (101.70 ng/mL):** Dentro del rango normal. Indica las reservas de hierro en el cuerpo. Un valor adecuado sugiere que no hay deficiencia de hierro.

**6. Glucosa**

*   **Glucosa (97 mg/dL):** Dentro del rango normal. Indica un nivel de azúcar en sangre normal en el momento de la prueba.

**7. Lipoproteína a (LPa)**

*   **LPa (48.94 mg/dL):** Dentro del rango normal. Es un factor de riesgo cardiovascular independiente.

**8. Creatinina**

*   **Creatinina (1.01 mg/dL):** Dentro del rango normal. Indica una función renal normal.

**9. Ácido Úrico**

*   **Ácido Úrico (6.7 mg/dL):** Dentro del rango normal.

**10. Colesterol Total**

*   **Colesterol Total (241 mg/dL):** **Fuera del rango normal (alto).** Este valor indica hipercolesterolemia, lo cual es un factor de riesgo para enfermedades cardiovasculares.

**11. Triglicéridos**

*   **Triglicéridos (172 mg/dL):** **Fuera del rango normal (alto).** Este valor indica hipertrigliceridemia, lo cual también es un factor de riesgo cardiovascular y puede estar relacionado con la resistencia a la insulina.

**12. HDL-Colesterol**

*   **HDL-Colesterol (37 mg/dL):** **Fuera del rango normal (bajo).** El HDL es el "colesterol bueno" y un valor bajo aumenta el riesgo cardiovascular.

**13. LDL-Colesterol (Calculado)**

*   **LDL-Colesterol (170 mg/dL):** Este valor se calcula a partir de los otros lípidos y también es un factor de riesgo cardiovascular importante.

**14. Apolipoproteína B**

*   **Apolipoproteína B (133 mg/dL):** **Fuera del rango normal (alto).** La ApoB es una proteína que transporta el colesterol LDL. Un valor elevado está asociado con un mayor riesgo cardiovascular.

**15. Proteínas Totales**

*   **Proteínas Totales (68.0 g/L):** Dentro del rango normal.

**16. Calcio**

*   **Calcio (102.3 mg/L):** Dentro del rango normal.

**17. Sodio**

*   **Sodio (141.3 mEq/L):** Dentro del rango normal.

**18. Potasio**

*   **Potasio (4.70 mEq/L):** Dentro del rango normal.

**19. Vitamina D**

*   **Vitamina D (14.23 ng/mL):** **Fuera del rango normal (bajo).** Indica una deficiencia de vitamina D, lo cual puede afectar la salud ósea, inmunidad y otros procesos metabólicos.

**20. Bilirrubina Total**

*   **Bilirrubina Total (1.11 mg/dL):** Dentro del rango normal.
* **Bilirrubina Indirecta (0,87 mg/dL):** **Fuera del rango normal (alto).**

**21. Función Hepática (AST, ALT, Gamma-GT, Fosfatasa Alcalina)**

*   Todos estos valores están dentro del rango normal, lo que sugiere una función hepática adecuada.
* LDH (139 U/L): Dentro del rango normal.

**22. Proteína C Reactiva (PCR)**

*   **PCR (1.50 mg/L):** Dentro del rango normal. Un valor normal indica que no hay inflamación aguda.

**23. Cortisol**

*   **Cortisol (10.63 µg/dL):** Dentro del rango normal.

**24. Hormonas Tiroideas (T4 Libre, TSH)**

*   **T4 Libre (1.24 ng/dL):** Dentro del rango normal.
*   **TSH (3.46 μUI/mL):** Dentro del rango normal. Estos valores indican una función tiroidea normal.

**25. PSA (Antígeno Prostático Específico)**

*   **PSA (1.254 ng/mL):** Dentro del rango normal.

**Recomendaciones:**

1.  **Salud Cardiovascular:**

    *   **Dieta:** Priorizar una dieta baja en grasas saturadas y colesterol. Aumentar el consumo de fibra, frutas, verduras y grasas saludables (aguacate, aceite de oliva, frutos secos).
    *   **Ejercicio:** Realizar actividad física regularmente (al menos 150 minutos de ejercicio moderado a la semana).
    *   **Suplementación:** Considerar la suplementación con omega-3 (bajo supervisión médica) para ayudar a reducir los triglicéridos.
2.  **Vitamina D:**

    *   **Suplementación:** Tomar un suplemento de vitamina D3 según las recomendaciones de un médico (generalmente entre 2000-5000 UI al día).
    *   **Exposición Solar:** Exponerse al sol de forma segura (15-20 minutos al día) para ayudar a sintetizar vitamina D.
3.  **Estilo de Vida:**

    *   **Control del Estrés:** Implementar técnicas de manejo del estrés (meditación, yoga, mindfulness).
    *   **Sueño:** Asegurar un sueño de calidad (7-8 horas por noche).
    *   **Revisiones Médicas:** Realizar controles médicos regulares para monitorear los niveles de colesterol, triglicéridos y vitamina D.

**Consideraciones Adicionales:**

*   Es importante discutir estos resultados con un médico para una evaluación completa y un plan de tratamiento personalizado.
*   Esta información no debe utilizarse como un sustituto del consejo médico profesional.

^^^json
{
  "datos_analitica": {
    "hemograma": {
      "hematocrito": {
        "valor": 46.5,
        "unidad": "%",
        "rango_referencia": "40.00-55.00",
        "fuera_de_rango": false
      },
      "hemoglobina": {
        "valor": 15.7,
        "unidad": "g/dL",
        "rango_referencia": "13.00-17.50",
        "fuera_de_rango": false
      },
      "hematies": {
        "valor": 5000000,
        "unidad": "/μL",
        "rango_referencia": "4200000-5800000",
        "fuera_de_rango": false
      },
      "idH": {
        "valor": 15.2,
        "unidad": null,
        "rango_referencia": "<22.0",
        "fuera_de_rango": false
      },
      "vcm": {
        "valor": 93.0,
        "unidad": "fL",
        "rango_referencia": "80.00-101.00",
        "fuera_de_rango": false
      },
      "hcm": {
        "valor": 31.4,
        "unidad": "Pg",
        "rango_referencia": "25.00-35.00",
        "fuera_de_rango": false
      },
      "chcm": {
        "valor": 33.76,
        "unidad": "g/dL",
        "rango_referencia": "28.00-37.00",
        "fuera_de_rango": false
      },
      "plaquetas": {
        "valor": 159000,
        "unidad": "/μL",
        "rango_referencia": "130000-450000",
        "fuera_de_rango": false
      },
      "vpm": {
        "valor": 10.9,
        "unidad": "fL",
        "rango_referencia": "6.0-11.0",
        "fuera_de_rango": false
      },
      "idp": {
        "valor": 21.0,
        "unidad": null,
        "rango_referencia": "<25.0",
        "fuera_de_rango": false
      },
      "leucocitos": {
        "valor": 4640.00,
        "unidad": "/μL",
        "rango_referencia": "4200.00-11500.00",
        "fuera_de_rango": false
      },
      "eosinofilos_percent": {
        "valor": 2.5,
        "unidad": "%",
        "rango_referencia": "<5.00",
        "fuera_de_rango": false
      },
      "basofilos_percent": {
        "valor": 1.2,
        "unidad": "%",
        "rango_referencia": "<1.50",
        "fuera_de_rango": false
      },
      "linfocitos_percent": {
        "valor": 37.0,
        "unidad": "%",
        "rango_referencia": "20.00-45.00",
        "fuera_de_rango": false
      },
      "monocitos_percent": {
        "valor": 8.6,
        "unidad": "%",
        "rango_referencia": "0.20-10.00",
        "fuera_de_rango": false
      },
      "neutrofilos_totales_percent": {
        "valor": 50.7,
        "unidad": "%",
        "rango_referencia": "45.00-75.00",
        "fuera_de_rango": false
      },
        "eosinofilos": {
          "valor": 116.00,
          "unidad": "/μL",
          "rango_referencia": "<575.00",
          "fuera_de_rango": false
        },
        "basofilos": {
          "valor": 55.68,
          "unidad": "/μL",
          "rango_referencia": "<175.00",
          "fuera_de_rango": false
        },
        "linfocitos": {
          "valor": 1716.80,
          "unidad": "/μL",
          "rango_referencia": "840.00-5175.00",
          "fuera_de_rango": false
        },
        "monocitos": {
          "valor": 399.04,
          "unidad": "/μL",
          "rango_referencia": "42.00-950.00",
          "fuera_de_rango": false
        },
        "neutrofilos_totales": {
          "valor": 2352.48,
          "unidad": "/μL",
          "rango_referencia": "1890.00-8575.00",
          "fuera_de_rango": false
        }
    },
    "vsg": {
      "vsg_primera_hora": {
        "valor": 2.00,
        "unidad": "mm",
        "rango_referencia": "0.60-18.00",
        "fuera_de_rango": false
      }
    },
    "hba1c": {
      "hba1c_percent": {
        "valor": 5.3,
        "unidad": "%",
        "rango_referencia": "4.3-6.1",
        "fuera_de_rango": false
      },
       "hba1c_mmol": {
        "valor": 34,
        "unidad": "mmol/mol",
        "rango_referencia": "23-43",
        "fuera_de_rango": false
      }
    },
    "protrombina": {
      "tiempo_protrombina": {
        "valor": 85.0,
        "unidad": "%",
        "rango_referencia": "70.0-100.0",
        "fuera_de_rango": false
      },
      "inr": {
        "valor": 1.12,
        "unidad": "índice",
        "rango_referencia": "0.90-1.20",
        "fuera_de_rango": false
      },
      "ratio": {
        "valor": 1.11,
        "unidad": "índice",
        "rango_referencia": null,
        "fuera_de_rango": false
      }
    },
    "hierro": {
      "ferritina": {
        "valor": 101.70,
        "unidad": "ng/mL",
        "rango_referencia": "22.00-322.00",
        "fuera_de_rango": false
      }
    },
    "glucosa": {
      "glucosa": {
        "valor": 97,
        "unidad": "mg/dL",
        "rango_referencia": "74-106",
        "fuera_de_rango": false
      }
    },
    "lipoproteina_a": {
      "lipoproteina_a": {
        "valor": 48.94,
        "unidad": "mg/dL",
        "rango_referencia": "<50.00",
        "fuera_de_rango": false
      }
    },
    "creatinina": {
      "creatinina": {
        "valor": 1.01,
        "unidad": "mg/dL",
        "rango_referencia": "0.70-1.30",
        "fuera_de_rango": false
      }
    },
    "acido_urico": {
      "acido_urico": {
        "valor": 6.7,
        "unidad": "mg/dL",
        "rango_referencia": "3.7-9.2",
        "fuera_de_rango": false
      }
    },
    "colesterol": {
      "colesterol_total": {
        "valor": 241,
        "unidad": "mg/dL",
        "rango_referencia": "<200",
        "fuera_de_rango": true
      },
      "trigliceridos": {
        "valor": 172,
        "unidad": "mg/dL",
        "rango_referencia": "<150",
        "fuera_de_rango": true
      },
      "hdl_colesterol": {
        "valor": 37,
        "unidad": "mg/dL",
        "rango_referencia": ">40",
        "fuera_de_rango": true
      },
      "ldl_colesterol": {
        "valor": 170,
        "unidad": "mg/dL",
        "rango_referencia": null,
        "fuera_de_rango": null
      }
    },
    "apolipoproteina_b": {
      "apolipoproteina_b": {
        "valor": 133,
        "unidad": "mg/dL",
        "rango_referencia": "46-174",
        "fuera_de_rango": null
      }
    },
    "proteinas_totales": {
      "proteinas_totales": {
        "valor": 68.0,
        "unidad": "g/L",
        "rango_referencia": "57.0-82.0",
        "fuera_de_rango": false
      }
    },
    "calcio": {
      "calcio": {
        "valor": 102.3,
        "unidad": "mg/L",
        "rango_referencia": "83.0-106.0",
        "fuera_de_rango": false
      }
    },
    "sodio": {
      "sodio": {
        "valor": 141.3,
        "unidad": "mEq/L",
        "rango_referencia": "136.0-145.0",
        "fuera_de_rango": false
      }
    },
    "potasio": {
      "potasio": {
        "valor": 4.70,
        "unidad": "mEq/L",
        "rango_referencia": "3.50-5.10",
        "fuera_de_rango": false
      }
    },
    "vitamina_d": {
      "vitamina_d_25oh": {
        "valor": 14.23,
        "unidad": "ng/mL",
        "rango_referencia": "30.00-100.00",
        "fuera_de_rango": true
      }
    },
    "bilirrubina": {
      "bilirrubina_total": {
        "valor": 1.11,
        "unidad": "mg/dL",
        "rango_referencia": "0.30-1.20",
        "fuera_de_rango": false
      },
       "bilirrubina_indirecta": {
        "valor": 0.87,
        "unidad": "mg/dL",
        "rango_referencia": "0.30-0.85",
        "fuera_de_rango": true
      }
    },
    "funcion_hepatica": {
      "ast_got": {
        "valor": 27,
        "unidad": "U/L",
        "rango_referencia": "<34",
        "fuera_de_rango": false
      },
      "alt_gpt": {
        "valor": 22,
        "unidad": "U/L",
        "rango_referencia": "10-49",
        "fuera_de_rango": false
      },
      "gamma_gt": {
        "valor": 24,
        "unidad": "U/L",
        "rango_referencia": "<73",
        "fuera_de_rango": false
      },
      "fosfatasa_alcalina": {
        "valor": 61,
        "unidad": "U/L",
        "rango_referencia": "40-129",
        "fuera_de_rango": false
      },
      "ldh": {
        "valor": 139,
        "unidad": "U/L",
        "rango_referencia": "120-246",
        "fuera_de_rango": false
      }
    },
    "proteina_c_reactiva": {
      "proteina_c_reactiva": {
        "valor": 1.50,
        "unidad": "mg/L",
        "rango_referencia": "<10.00",
        "fuera_de_rango": false
      }
    },
    "cortisol": {
      "cortisol": {
        "valor": 10.63,
        "unidad": "µg/dL",
        "rango_referencia": "5.70-22.45",
        "fuera_de_rango": false
      }
    },
    "hormonas_tiroideas": {
      "t4_libre": {
        "valor": 1.24,
        "unidad": "ng/dL",
        "rango_referencia": "0.89-1.76",
        "fuera_de_rango": false
      },
      "tsh": {
        "valor": 3.46,
        "unidad": "μUI/mL",
        "rango_referencia": "0.55-4.78",
        "fuera_de_rango": false
      }
    },
    "psa": {
      "psa": {
        "valor": 1.254,
        "unidad": "ng/mL",
        "rango_referencia": "<4.000",
        "fuera_de_rango": false
      }
    },
    "urianalisis": {
        "densidad": {
            "valor": 1.024,
            "unidad": "g/L",
            "rango_referencia": "1.010-1.030",
            "fuera_de_rango": false
        },
        "ph": {
            "valor": 7.50,
            "unidad": null,
            "rango_referencia": "4.50-8.50",
            "fuera_de_rango": false
        },
        "acetona": {
            "valor": "Negativo",
            "unidad": null,
            "rango_referencia": null,
            "fuera_de_rango": false
        },
        "sangre": {
            "valor": "Negativo",
            "unidad": null,
            "rango_referencia": null,
            "fuera_de_rango": false
        },
        "proteinas": {
            "valor": "Negativo",
            "unidad": null,
            "rango_referencia": null,
            "fuera_de_rango": false
        },
        "glucosa": {
            "valor": "Negativo",
            "unidad": null,
            "rango_referencia": null,
            "fuera_de_rango": false
        },
        "nitritos": {
            "valor": "Negativo",
            "unidad": null,
            "rango_referencia": null,
            "fuera_de_rango": false
        },
        "urobilinogeno": {
            "valor": "<2.00",
            "unidad": "mg/dL",
            "rango_referencia": "<2.00",
            "fuera_de_rango": false
        },
        "urobilina": {
            "valor": "Normal",
            "unidad": null,
            "rango_referencia": null,
            "fuera_de_rango": false
        },
        "leucocitos": {
            "valor": "Negativo",
            "unidad": null,
            "rango_referencia": null,
            "fuera_de_rango": false
        }
    }
  }
}
^^^
`;

const AnalisisComponent = () => {
  const [markdown, setMarkdown] = useState("");
  const [analiticaData, setAnaliticaData] = useState<any>(null);

  useEffect(() => {
    // Extraer Markdown
    const markdownOnly = response
      .replace(/\^\^\^json\n[\s\S]*?\n\^\^\^/, "")
      .trim()
      .replace(/\n/g, "\n\n");
    setMarkdown(markdownOnly);

    // Extraer JSON
    const jsonMatch = response.match(/\^\^\^json\n([\s\S]*?)\n\^\^\^/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        setAnaliticaData(JSON.parse(jsonMatch[1]));
      } catch (error) {
        console.error("Error al parsear el JSON:", error);
      }
    }
  }, [response]);

  return (
    <div>
      <h2>Análisis de la Analítica</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>

      {analiticaData && (
        <div>
          <h3>Datos en JSON</h3>
          <pre>{JSON.stringify(analiticaData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AnalisisComponent;
