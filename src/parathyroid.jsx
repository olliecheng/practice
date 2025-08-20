import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/bricolage-grotesque";

import QuizEngine from "./components/QuizEngine.jsx";

const getArrowForDirection = (direction) => {
  switch (direction) {
    case "elevated":
      return <span className="text-2xl font-bold text-red-600">↑</span>;
    case "decreased":
      return <span className="text-2xl font-bold text-blue-600">↓</span>;
    case "normal":
      return <span className="text-2xl font-bold text-green-600">→</span>;
    default:
      return <span className="text-2xl font-bold text-gray-600">?</span>;
  }
};

const getDiagnosisInfo = (diagnosis) => {
  const info = {
    "primary-hyperparathyroidism": {
      title: "Primary Hyperparathyroidism",
      explanation:
        "Elevated calcium with inappropriately elevated PTH indicates autonomous parathyroid hormone production, typically from a parathyroid adenoma (85%) or hyperplasia. Key differentiator: occurs in patients WITHOUT chronic kidney disease history. The parathyroid glands are producing excess PTH despite high calcium levels.",
      pattern: "↑ Calcium, ↑ PTH (no CKD history)",
      pathophysiology:
        "Parathyroid adenoma or hyperplasia → excessive PTH → increased bone resorption and renal calcium retention → hypercalcemia",
    },
    "secondary-hyperparathyroidism": {
      title: "Secondary Hyperparathyroidism",
      explanation:
        "Low calcium with elevated PTH represents an appropriate physiological response. The parathyroid glands are working correctly to compensate for low calcium due to vitamin D deficiency, malabsorption, or chronic kidney disease.",
      pattern: "↓ Calcium, ↑ PTH",
      pathophysiology:
        "Low calcium (from CKD, vitamin D deficiency, malabsorption) → stimulates parathyroid glands → appropriate ↑ PTH response",
    },
    "tertiary-hyperparathyroidism": {
      title: "Tertiary Hyperparathyroidism",
      explanation:
        "Elevated calcium with elevated PTH in a patient WITH chronic kidney disease history. The parathyroid glands became autonomous after years of secondary hyperparathyroidism and continue producing excess PTH despite corrected calcium levels. Critical: requires CKD history to differentiate from primary.",
      pattern: "↑ Calcium, ↑ PTH (with CKD history)",
      pathophysiology:
        "Years of secondary hyperparathyroidism in CKD → parathyroid gland autonomy → persistent ↑ PTH despite normalized calcium",
    },
    hypoparathyroidism: {
      title: "Hypoparathyroidism",
      explanation:
        "Low calcium with inappropriately low PTH indicates inadequate parathyroid hormone production. This is commonly seen after thyroid/parathyroid surgery, autoimmune destruction, or genetic causes. The parathyroid glands are not responding appropriately to hypocalcemia.",
      pattern: "↓ Calcium, ↓ PTH",
      pathophysiology:
        "Parathyroid gland damage/removal → insufficient PTH → decreased bone resorption and renal calcium retention → hypocalcemia",
    },
  };
  return info[diagnosis];
};

const parathyroidQuizConfig = {
  description:
    "Each case presents a patient with suspected parathyroid dysfunction. Analyze the calcium and PTH patterns using directional arrows to determine the underlying pathophysiology and make the correct diagnosis.",
  startButtonText: "Generate First Case",
  generateCase: () => {
    const diagnoses = [
      "primary-hyperparathyroidism",
      "secondary-hyperparathyroidism",
      "tertiary-hyperparathyroidism",
      "hypoparathyroidism",
    ];
    const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];

    const ages = [25, 32, 28, 45, 38, 52, 41, 29, 36, 48, 65, 72];
    const genders = ["Male", "Female"];

    let clinicalContext = "";
    let medicalHistory = "";
    let calciumDirection = "";
    let pthDirection = "";

    switch (diagnosis) {
      case "primary-hyperparathyroidism":
        calciumDirection = "elevated";
        pthDirection = "elevated";
        const primaryContexts = [
          "Routine blood work for fatigue and recurrent kidney stones",
          "Evaluation for osteoporosis after fragility fracture (normal kidney function)",
          "Workup for depression and confusion in previously healthy patient",
          "Investigation of recurrent nephrolithiasis (no known CKD)",
          "Screening labs showing hypercalcemia in healthy individual",
        ];
        const primaryHistories = [
          "No significant past medical history, normal kidney function",
          "No chronic kidney disease or metabolic bone disease",
          "Previously healthy with normal renal function",
          "No history of kidney disease or vitamin D deficiency",
        ];
        clinicalContext =
          primaryContexts[Math.floor(Math.random() * primaryContexts.length)];
        medicalHistory =
          primaryHistories[Math.floor(Math.random() * primaryHistories.length)];
        break;

      case "secondary-hyperparathyroidism":
        calciumDirection = "decreased";
        pthDirection = "elevated";
        const secondaryContexts = [
          "Chronic kidney disease patient with bone pain and muscle weakness",
          "Severe vitamin D deficiency with tetany episodes",
          "Malabsorption syndrome with hypocalcemic symptoms",
          "CKD stage 4 patient with elevated phosphate and low calcium",
          "Patient with intestinal malabsorption and vitamin D deficiency",
        ];
        const secondaryHistories = [
          "Chronic kidney disease stage 4, declining renal function",
          "Severe vitamin D deficiency, poor dietary intake",
          "Inflammatory bowel disease with malabsorption",
          "Progressive chronic kidney disease over 5 years",
        ];
        clinicalContext =
          secondaryContexts[
            Math.floor(Math.random() * secondaryContexts.length)
          ];
        medicalHistory =
          secondaryHistories[
            Math.floor(Math.random() * secondaryHistories.length)
          ];
        break;

      case "tertiary-hyperparathyroidism":
        calciumDirection = "elevated";
        pthDirection = "elevated";
        const tertiaryContexts = [
          "Post-kidney transplant patient with persistent hypercalcemia",
          "Long-term dialysis patient with autonomous parathyroid function",
          "CKD patient with hypercalcemia after years of secondary hyperparathyroidism",
          "Post-renal transplant with continued inappropriate PTH elevation",
          "Former dialysis patient with persistent hyperparathyroidism",
        ];
        const tertiaryHistories = [
          "15-year history of chronic kidney disease, previously on dialysis",
          "Long-standing CKD with 8 years of secondary hyperparathyroidism",
          "Chronic kidney disease stage 5, post-transplant 2 years ago",
          "10+ year history of CKD and prolonged secondary hyperparathyroidism",
          "End-stage renal disease, kidney transplant 18 months ago",
        ];
        clinicalContext =
          tertiaryContexts[Math.floor(Math.random() * tertiaryContexts.length)];
        medicalHistory =
          tertiaryHistories[
            Math.floor(Math.random() * tertiaryHistories.length)
          ];
        break;

      case "hypoparathyroidism":
        calciumDirection = "decreased";
        pthDirection = "decreased";
        const hypoContexts = [
          "Post-thyroidectomy patient with perioral numbness and tetany",
          "Patient with positive Chvostek's and Trousseau's signs",
          "Autoimmune polyglandular syndrome with hypocalcemic symptoms",
          "Post-surgical neck exploration with carpopedal spasms",
          "Patient with paresthesias and muscle cramps after parathyroid surgery",
        ];
        const hypoHistories = [
          "Recent total thyroidectomy for thyroid cancer",
          "Autoimmune polyglandular syndrome type 1",
          "Post-surgical parathyroid gland removal",
          "History of neck surgery with inadvertent parathyroid damage",
        ];
        clinicalContext =
          hypoContexts[Math.floor(Math.random() * hypoContexts.length)];
        medicalHistory =
          hypoHistories[Math.floor(Math.random() * hypoHistories.length)];
        break;

      default:
        calciumDirection = "normal";
        pthDirection = "normal";
        clinicalContext = "Routine metabolic panel";
        medicalHistory = "No significant past medical history";
    }

    const age = ages[Math.floor(Math.random() * ages.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];

    return {
      patient: {
        description: `${age}-year-old ${gender.toLowerCase()}`,
        mhx: medicalHistory,
        clinicalContext,
      },
      labs: [
        {
          test: "Serum Calcium",
          result: getArrowForDirection(calciumDirection),
          normal: (
            <>
              8.5-10.5 mg/dL
              <br />
              <span className="text-xs">(2.1-2.6 mmol/L)</span>
            </>
          ),
        },
        {
          test: "Parathyroid Hormone (PTH)",
          result: getArrowForDirection(pthDirection),
          normal: (
            <>
              15-65 pg/mL
              <br />
              <span className="text-xs">(1.6-6.9 pmol/L)</span>
            </>
          ),
        },
      ],
      labsAnnotation: (
        <>
          <strong>Legend:</strong> ↑ = Elevated, ↓ = Decreased, → = Normal
        </>
      ),
      questions: [
        {
          text: "Select the most likely diagnosis:",
          type: "selectOne",
          options: [
            {
              id: "primary-hyperparathyroidism",
              text: "Primary Hyperparathyroidism",
              description: "Parathyroid adenoma/hyperplasia",
              correct: diagnosis === "primary-hyperparathyroidism",
            },
            {
              id: "secondary-hyperparathyroidism",
              text: "Secondary Hyperparathyroidism",
              description: "Appropriate response to hypocalcemia",
              correct: diagnosis === "secondary-hyperparathyroidism",
            },
            {
              id: "tertiary-hyperparathyroidism",
              text: "Tertiary Hyperparathyroidism",
              description: "Autonomous PTH after chronic secondary",
              correct: diagnosis === "tertiary-hyperparathyroidism",
            },
            {
              id: "hypoparathyroidism",
              text: "Hypoparathyroidism",
              description: "Inadequate PTH production",
              correct: diagnosis === "hypoparathyroidism",
            },
          ],
          explanation: (
            <div>
              <p className="mb-3">
                <strong>Correct answer:</strong>{" "}
                {getDiagnosisInfo(diagnosis).title}
              </p>
              <p className="mb-3">{getDiagnosisInfo(diagnosis).explanation}</p>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm font-medium mb-2 text-blue-800">
                  Expected pattern: {getDiagnosisInfo(diagnosis).pattern}
                </p>
                <p className="text-xs text-blue-700">
                  <strong>Pathophysiology:</strong>{" "}
                  {getDiagnosisInfo(diagnosis).pathophysiology}
                </p>
              </div>
            </div>
          ),
        },
      ],
    };
  },
};

function ParathyroidTest() {
  return <QuizEngine quizConfig={parathyroidQuizConfig} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="min-h-screen text-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-left mb-8">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Tests
          </a>
          <h1 className="font-serif text-3xl font-bold text-gray-800 mb-4">
            Parathyroid Function Test
          </h1>
          <p className="text-gray-600">
            Practice interpreting calcium and PTH levels to diagnose parathyroid
            disorders
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-left">
          <ParathyroidTest />
        </div>
      </div>
    </div>
  </StrictMode>
);
