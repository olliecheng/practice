import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/bricolage-grotesque";

import QuizEngine from "./components/QuizEngine.jsx";

const generateHepatitisBCase = () => {
  const scenarios = [
    "susceptible",
    "resolved",
    "vaccinated",
    "acute",
    "chronic",
    "inconclusive",
  ];
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

  let hbsAg, antiHBc, antiHBs, igmAntiHBc, interpretation, clinicalAction;

  switch (scenario) {
    case "susceptible":
      hbsAg = "Negative";
      antiHBc = "Negative";
      antiHBs = "Negative";
      igmAntiHBc = "Negative";
      interpretation =
        "Susceptible to hepatitis B infection. No evidence of prior infection or vaccination.";
      clinicalAction =
        "Recommend hepatitis B vaccination series (3 doses). Consider risk factors and occupational exposure.";
      break;

    case "resolved":
      hbsAg = "Negative";
      antiHBc = "Positive";
      antiHBs = "Positive";
      igmAntiHBc = "Negative";
      interpretation =
        "Resolved hepatitis B infection with immunity. Past infection with recovery and protective antibodies.";
      clinicalAction =
        "No further testing or vaccination needed. Patient has lifelong immunity. Monitor if immunocompromised.";
      break;

    case "vaccinated":
      hbsAg = "Negative";
      antiHBc = "Negative";
      antiHBs = "Positive";
      igmAntiHBc = "Negative";
      interpretation =
        "Immune due to hepatitis B vaccination. Surface antibodies from vaccination, not natural infection.";
      clinicalAction =
        "No further action needed. Consider booster if Anti-HBs levels fall below 10 mIU/mL in high-risk patients.";
      break;

    case "acute":
      hbsAg = "Positive";
      antiHBc = "Positive";
      antiHBs = "Negative";
      igmAntiHBc = "Positive";
      interpretation =
        "Acute hepatitis B infection. Active viral replication with recent infection markers.";
      clinicalAction =
        "Monitor closely for fulminant hepatitis. Supportive care, avoid hepatotoxic drugs. Contact tracing and prevention counseling.";
      break;

    case "chronic":
      hbsAg = "Positive";
      antiHBc = "Positive";
      antiHBs = "Negative";
      igmAntiHBc = "Negative";
      interpretation =
        "Chronic hepatitis B infection. Persistent viral presence without IgM, indicating chronic infection.";
      clinicalAction =
        "Refer to hepatology/gastroenterology. Monitor HBV DNA, ALT. Screen for hepatitis D co-infection. Vaccination contacts.";
      break;

    case "inconclusive":
      hbsAg = "Negative";
      antiHBc = "Positive";
      antiHBs = "Negative";
      igmAntiHBc = "Negative";
      interpretation =
        "Inconclusive pattern. Core antibody positive but no surface antigen or antibody. Multiple interpretations possible.";
      clinicalAction =
        "Repeat testing in 2-4 weeks. Consider HBV DNA testing. May represent waning immunity, window period, or false positive.";
      break;
  }

  const ages = [28, 34, 42, 29, 37, 45, 31, 38, 26, 41];
  const genders = ["male", "female"];
  const presentations = [
    "routine health screening",
    "pre-employment physical",
    "presenting with fatigue and elevated ALT",
    "contact tracing for hepatitis B exposure",
    "pregnancy screening",
    "prior to immunosuppressive therapy",
    "HIV co-infection screening",
    "family history of hepatitis B",
  ];

  return {
    patient: {
      description: `${ages[Math.floor(Math.random() * ages.length)]}-year-old ${
        genders[Math.floor(Math.random() * genders.length)]
      }`,
      mhx: `Patient presents for ${presentations[Math.floor(Math.random() * presentations.length)]}. Hepatitis B serology was ordered as part of evaluation.`,
    },
    labs: [
      {
        test: "HBsAg (Hepatitis B Surface Antigen)",
        result: hbsAg,
        normal: "Negative",
      },
      {
        test: "Anti-HBc (Hepatitis B Core Antibody)",
        result: antiHBc,
        normal: "Negative",
      },
      {
        test: "Anti-HBs (Hepatitis B Surface Antibody)",
        result: antiHBs,
        normal: "Negative (unless vaccinated)",
      },
      {
        test: "IgM Anti-HBc (IgM Core Antibody)",
        result: igmAntiHBc,
        normal: "Negative",
      },
    ],
    labsAnnotation:
      "All tests performed using standard immunoassays with appropriate controls.",
    questions: [
      {
        type: "selectOne",
        text: "Based on this hepatitis B serology pattern, what is the most likely interpretation?",
        options: [
          {
            id: "susceptible",
            text: "Susceptible (consider vaccination)",
            description: "No evidence of infection or immunity",
            correct: scenario === "susceptible",
          },
          {
            id: "resolved",
            text: "Resolved HBV infection",
            description: "Past infection with immunity",
            correct: scenario === "resolved",
          },
          {
            id: "vaccinated",
            text: "Vaccinated",
            description: "Immune due to vaccination",
            correct: scenario === "vaccinated",
          },
          {
            id: "acute",
            text: "Acute HBV infection",
            description: "Active acute infection",
            correct: scenario === "acute",
          },
          {
            id: "chronic",
            text: "Chronic HBV infection",
            description: "Chronic persistent infection",
            correct: scenario === "chronic",
          },
          {
            id: "inconclusive",
            text: "Inconclusive/Various possibilities",
            description: "Unclear pattern requiring further testing",
            correct: scenario === "inconclusive",
          },
        ],
        explanation: (
          <div>
            <p className="mb-3">
              <strong>Interpretation:</strong> {interpretation}
            </p>
            <div className="text-sm">
              <p className="font-semibold mb-2">Serology Pattern Analysis:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>HBsAg {hbsAg}:</strong>{" "}
                  {hbsAg === "Positive"
                    ? "Active infection present"
                    : "No active infection"}
                </li>
                <li>
                  <strong>Anti-HBc {antiHBc}:</strong>{" "}
                  {antiHBc === "Positive"
                    ? "Past or current infection"
                    : "No prior infection"}
                </li>
                <li>
                  <strong>Anti-HBs {antiHBs}:</strong>{" "}
                  {antiHBs === "Positive"
                    ? "Protective immunity present"
                    : "No protective antibodies"}
                </li>
                <li>
                  <strong>IgM Anti-HBc {igmAntiHBc}:</strong>{" "}
                  {igmAntiHBc === "Positive"
                    ? "Recent/acute infection"
                    : "No acute infection"}
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        type: "selectAll",
        text: "What are the most appropriate next steps in management? (Select all that apply)",
        options: [
          {
            id: "vaccinate",
            text: "Recommend hepatitis B vaccination",
            description: "Initiate 3-dose vaccination series",
            correct: scenario === "susceptible",
          },
          {
            id: "monitor",
            text: "Clinical monitoring and supportive care",
            description: "Close follow-up for complications",
            correct: scenario === "acute",
          },
          {
            id: "specialist",
            text: "Refer to hepatology/gastroenterology",
            description: "Specialist evaluation for chronic disease",
            correct: scenario === "chronic",
          },
          {
            id: "repeat",
            text: "Repeat testing in 2-4 weeks",
            description: "Clarify inconclusive results",
            correct: scenario === "inconclusive",
          },
          {
            id: "noAction",
            text: "No further action needed",
            description: "Patient has adequate immunity",
            correct: scenario === "resolved" || scenario === "vaccinated",
          },
          {
            id: "contactTrace",
            text: "Contact tracing and prevention counseling",
            description: "Identify and protect exposed contacts",
            correct: scenario === "acute" || scenario === "chronic",
          },
        ],
        explanation: (
          <div>
            <p className="mb-3">
              <strong>Recommended Management:</strong> {clinicalAction}
            </p>
            <div className="text-sm">
              <p className="font-semibold mb-2">Clinical Considerations:</p>
              <ul className="list-disc list-inside space-y-1">
                {scenario === "susceptible" && (
                  <>
                    <li>Complete 3-dose vaccination series (0, 1, 6 months)</li>
                    <li>Consider accelerated schedule if high risk</li>
                    <li>Post-vaccination testing in high-risk patients</li>
                  </>
                )}
                {scenario === "acute" && (
                  <>
                    <li>Monitor for fulminant hepatitis (rare but serious)</li>
                    <li>Avoid hepatotoxic medications</li>
                    <li>Supportive care, most cases resolve spontaneously</li>
                    <li>Contact tracing for sexual and household contacts</li>
                  </>
                )}
                {scenario === "chronic" && (
                  <>
                    <li>Monitor HBV DNA levels and liver function</li>
                    <li>Screen for hepatitis D co-infection</li>
                    <li>Consider antiviral therapy based on guidelines</li>
                    <li>Hepatocellular carcinoma screening</li>
                  </>
                )}
                {(scenario === "resolved" || scenario === "vaccinated") && (
                  <>
                    <li>Lifelong immunity expected</li>
                    <li>No routine re-vaccination needed</li>
                    <li>Consider booster in immunocompromised patients</li>
                  </>
                )}
                {scenario === "inconclusive" && (
                  <>
                    <li>May represent waning immunity</li>
                    <li>Could be in window period of acute infection</li>
                    <li>HBV DNA testing may help clarify</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        ),
      },
    ],
  };
};

const HEPATITIS_B_CONFIG = {
  title: "Hepatitis B Serology Interpretation",
  description:
    "Each case presents a patient with hepatitis B serology results. Analyze the pattern of HBsAg, Anti-HBc, Anti-HBs, and IgM Anti-HBc to determine the clinical status and appropriate management.",
  startButtonText: "Generate First Case",
  generateCase: generateHepatitisBCase,
};

function HepatitisBTest() {
  return <QuizEngine quizConfig={HEPATITIS_B_CONFIG} />;
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
            {HEPATITIS_B_CONFIG.title}
          </h1>
          <p className="text-gray-600">
            Master hepatitis B serology interpretation using pattern recognition
            of HBsAg, Anti-HBc, and Anti-HBs to differentiate acute, chronic,
            resolved, and vaccine-induced immunity
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-left">
          <HepatitisBTest />
        </div>
      </div>
    </div>
  </StrictMode>,
);
