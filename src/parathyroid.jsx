import { StrictMode, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/bricolage-grotesque";

function ParathyroidTest() {
  const [currentCase, setCurrentCase] = useState(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const generateRandomCase = useCallback(() => {
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

    return {
      diagnosis,
      patient: {
        age: ages[Math.floor(Math.random() * ages.length)],
        gender: genders[Math.floor(Math.random() * genders.length)],
        clinicalContext,
        medicalHistory,
      },
      labs: {
        calciumDirection,
        pthDirection,
      },
    };
  }, []);

  const handleDiagnosisSelection = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    setShowFeedback(true);

    const isCorrect = diagnosis === currentCase.diagnosis;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const startNewCase = () => {
    setCurrentCase(generateRandomCase());
    setSelectedDiagnosis(null);
    setShowFeedback(false);
  };

  const getArrowForDirection = (direction) => {
    switch (direction) {
      case "elevated":
        return "↑";
      case "decreased":
        return "↓";
      case "normal":
        return "→";
      default:
        return "?";
    }
  };

  const getColorForDirection = (direction) => {
    switch (direction) {
      case "elevated":
        return "text-red-600";
      case "decreased":
        return "text-blue-600";
      case "normal":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getDiagnosisInfo = (diagnosis) => {
    const info = {
      "primary-hyperparathyroidism": {
        title: "Primary Hyperparathyroidism",
        explanation:
          "Elevated calcium with inappropriately elevated PTH indicates autonomous parathyroid hormone production, typically from a parathyroid adenoma (85%) or hyperplasia. Key differentiator: occurs in patients WITHOUT chronic kidney disease history. The parathyroid glands are producing excess PTH despite high calcium levels.",
        pattern: "↑ Calcium, ↑ PTH (no CKD history)",
        color: "red",
        pathophysiology:
          "Parathyroid adenoma or hyperplasia → excessive PTH → increased bone resorption and renal calcium retention → hypercalcemia",
      },
      "secondary-hyperparathyroidism": {
        title: "Secondary Hyperparathyroidism",
        explanation:
          "Low calcium with elevated PTH represents an appropriate physiological response. The parathyroid glands are working correctly to compensate for low calcium due to vitamin D deficiency, malabsorption, or chronic kidney disease.",
        pattern: "↓ Calcium, ↑ PTH",
        color: "blue",
        pathophysiology:
          "Low calcium (from CKD, vitamin D deficiency, malabsorption) → stimulates parathyroid glands → appropriate ↑ PTH response",
      },
      "tertiary-hyperparathyroidism": {
        title: "Tertiary Hyperparathyroidism",
        explanation:
          "Elevated calcium with elevated PTH in a patient WITH chronic kidney disease history. The parathyroid glands became autonomous after years of secondary hyperparathyroidism and continue producing excess PTH despite corrected calcium levels. Critical: requires CKD history to differentiate from primary.",
        pattern: "↑ Calcium, ↑ PTH (with CKD history)",
        color: "purple",
        pathophysiology:
          "Years of secondary hyperparathyroidism in CKD → parathyroid gland autonomy → persistent ↑ PTH despite normalized calcium",
      },
      hypoparathyroidism: {
        title: "Hypoparathyroidism",
        explanation:
          "Low calcium with inappropriately low PTH indicates inadequate parathyroid hormone production. This is commonly seen after thyroid/parathyroid surgery, autoimmune destruction, or genetic causes. The parathyroid glands are not responding appropriately to hypocalcemia.",
        pattern: "↓ Calcium, ↓ PTH",
        color: "orange",
        pathophysiology:
          "Parathyroid gland damage/removal → insufficient PTH → decreased bone resorption and renal calcium retention → hypocalcemia",
      },
    };
    return info[diagnosis];
  };

  if (!currentCase) {
    return (
      <div>
        <p className="text-gray-600 mb-8">
          Each case presents a patient with suspected parathyroid dysfunction.
          Analyze the calcium and PTH patterns using directional arrows to
          determine the underlying pathophysiology and make the correct
          diagnosis.
        </p>
        <button
          onClick={startNewCase}
          className="font-serif bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium transition-colors"
        >
          Generate First Case
        </button>
      </div>
    );
  }

  return (
    <div className="text-left">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Patient Case</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-2">
            <strong>Patient:</strong> {currentCase.patient.age}-year-old{" "}
            {currentCase.patient.gender.toLowerCase()}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Medical History:</strong>{" "}
            {currentCase.patient.medicalHistory}
          </p>
          <p className="text-gray-700">
            <strong>Clinical Context:</strong>{" "}
            {currentCase.patient.clinicalContext}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Laboratory Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-3 text-left">Test</th>
                <th className="border border-gray-300 p-3 text-center">
                  Result
                </th>
                <th className="border border-gray-300 p-3 text-center">
                  Normal Range
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Serum Calcium
                </td>
                <td
                  className={`border border-gray-300 p-3 text-center text-2xl font-bold ${getColorForDirection(
                    currentCase.labs.calciumDirection,
                  )}`}
                >
                  {getArrowForDirection(currentCase.labs.calciumDirection)}
                </td>
                <td className="border border-gray-300 p-3 text-center text-gray-600">
                  8.5-10.5 mg/dL
                  <br />
                  <span className="text-xs">(2.1-2.6 mmol/L)</span>
                </td>
              </tr>
              <tr className="bg-gray-25">
                <td className="border border-gray-300 p-3 font-medium">
                  Parathyroid Hormone (PTH)
                </td>
                <td
                  className={`border border-gray-300 p-3 text-center text-2xl font-bold ${getColorForDirection(
                    currentCase.labs.pthDirection,
                  )}`}
                >
                  {getArrowForDirection(currentCase.labs.pthDirection)}
                </td>
                <td className="border border-gray-300 p-3 text-center text-gray-600">
                  15-65 pg/mL
                  <br />
                  <span className="text-xs">(1.6-6.9 pmol/L)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            <strong>Legend:</strong> ↑ = Elevated, ↓ = Decreased, → = Normal
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Select Your Diagnosis</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <button
            onClick={() =>
              !showFeedback &&
              handleDiagnosisSelection("primary-hyperparathyroidism")
            }
            disabled={showFeedback}
            className={`p-4 text-left border border-gray-300 rounded-lg transition-colors ${
              showFeedback
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="font-medium">Primary Hyperparathyroidism</div>
            <div className="text-sm text-gray-600">
              Parathyroid adenoma/hyperplasia
            </div>
          </button>
          <button
            onClick={() =>
              !showFeedback &&
              handleDiagnosisSelection("secondary-hyperparathyroidism")
            }
            disabled={showFeedback}
            className={`p-4 text-left border border-gray-300 rounded-lg transition-colors ${
              showFeedback
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="font-medium">Secondary Hyperparathyroidism</div>
            <div className="text-sm text-gray-600">
              Appropriate response to hypocalcemia
            </div>
          </button>
          <button
            onClick={() =>
              !showFeedback &&
              handleDiagnosisSelection("tertiary-hyperparathyroidism")
            }
            disabled={showFeedback}
            className={`p-4 text-left border border-gray-300 rounded-lg transition-colors ${
              showFeedback
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="font-medium">Tertiary Hyperparathyroidism</div>
            <div className="text-sm text-gray-600">
              Autonomous PTH after chronic secondary
            </div>
          </button>
          <button
            onClick={() =>
              !showFeedback && handleDiagnosisSelection("hypoparathyroidism")
            }
            disabled={showFeedback}
            className={`p-4 text-left border border-gray-300 rounded-lg transition-colors ${
              showFeedback
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="font-medium">Hypoparathyroidism</div>
            <div className="text-sm text-gray-600">
              Inadequate PTH production
            </div>
          </button>
        </div>
      </div>

      {showFeedback && (
        <div className="mt-8">
          <div
            className={`p-6 rounded-lg border mb-6 ${
              selectedDiagnosis === currentCase.diagnosis
                ? "bg-green-100 border-green-300"
                : "bg-red-100 border-red-300"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-3 ${
                selectedDiagnosis === currentCase.diagnosis
                  ? "text-green-800"
                  : "text-red-800"
              }`}
            >
              {selectedDiagnosis === currentCase.diagnosis
                ? "Correct!"
                : "Incorrect"}
            </h3>

            {selectedDiagnosis !== currentCase.diagnosis && (
              <p className="text-red-700 mb-3">
                Your answer: {getDiagnosisInfo(selectedDiagnosis).title}
              </p>
            )}

            <p
              className={
                selectedDiagnosis === currentCase.diagnosis
                  ? "text-green-700"
                  : "text-red-700"
              }
            >
              <strong>
                Correct answer: {getDiagnosisInfo(currentCase.diagnosis).title}
              </strong>
            </p>

            <p
              className={`mt-3 ${
                selectedDiagnosis === currentCase.diagnosis
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {getDiagnosisInfo(currentCase.diagnosis).explanation}
            </p>

            <div
              className={`mt-4 p-3 rounded ${
                selectedDiagnosis === currentCase.diagnosis
                  ? "bg-green-50"
                  : "bg-red-50"
              }`}
            >
              <p
                className={`text-sm font-medium mb-2 ${
                  selectedDiagnosis === currentCase.diagnosis
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                Expected pattern:{" "}
                {getDiagnosisInfo(currentCase.diagnosis).pattern}
              </p>
              <p
                className={`text-xs ${
                  selectedDiagnosis === currentCase.diagnosis
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                <strong>Pathophysiology:</strong>{" "}
                {getDiagnosisInfo(currentCase.diagnosis).pathophysiology}
              </p>
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-sm text-gray-600 mb-2">
              Score: {score.correct}/{score.total} (
              {score.total > 0
                ? Math.round((score.correct / score.total) * 100)
                : 0}
              %)
            </div>
            <button
              onClick={startNewCase}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Generate New Case
            </button>
          </div>
        </div>
      )}
    </div>
  );
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
  </StrictMode>,
);
