import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

function DexamethasoneTest() {
  const [currentCase, setCurrentCase] = useState(null)
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const generateRandomCase = useCallback(() => {
    const diagnoses = ['normal', 'cushing-disease', 'adrenal-cushing', 'ectopic-acth']
    const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)]
    
    let baselineCortisol, baselineACTH, lowDoseCortisol, highDoseCortisol, followUpACTH
    
    switch (diagnosis) {
      case 'normal':
        baselineCortisol = Math.round((Math.random() * 15 + 8) * 10) / 10  // 8.0-23.0 μg/dL
        baselineACTH = Math.round(Math.random() * 40 + 15)                 // 15-55 pg/mL
        lowDoseCortisol = Math.round((Math.random() * 3 + 1) * 10) / 10    // 1.0-4.0 μg/dL
        highDoseCortisol = Math.round((Math.random() * 2 + 0.5) * 10) / 10 // 0.5-2.5 μg/dL
        followUpACTH = null
        break
        
      case 'cushing-disease':
        baselineCortisol = Math.round((Math.random() * 55 + 25) * 10) / 10 // 25.0-80.0 μg/dL
        baselineACTH = Math.round(Math.random() * 140 + 60)                // 60-200 pg/mL
        lowDoseCortisol = Math.round((baselineCortisol * (0.7 + Math.random() * 0.25)) * 10) / 10  // 70-95% of baseline
        highDoseCortisol = Math.round((baselineCortisol * (0.2 + Math.random() * 0.3)) * 10) / 10  // 20-50% of baseline (suppresses)
        followUpACTH = Math.round(Math.random() * 60 + 40)                 // 40-100 pg/mL
        break
        
      case 'adrenal-cushing':
        baselineCortisol = Math.round((Math.random() * 70 + 30) * 10) / 10 // 30.0-100.0 μg/dL
        baselineACTH = Math.round(Math.random() * 8 + 2)                   // 2-10 pg/mL (suppressed)
        lowDoseCortisol = Math.round((baselineCortisol * (0.85 + Math.random() * 0.1)) * 10) / 10  // 85-95% of baseline
        highDoseCortisol = Math.round((baselineCortisol * (0.8 + Math.random() * 0.15)) * 10) / 10 // 80-95% of baseline
        followUpACTH = Math.round(Math.random() * 6 + 2)                   // 2-8 pg/mL
        break
        
      case 'ectopic-acth':
        baselineCortisol = Math.round((Math.random() * 110 + 40) * 10) / 10 // 40.0-150.0 μg/dL
        baselineACTH = Math.round(Math.random() * 400 + 100)               // 100-500 pg/mL
        lowDoseCortisol = Math.round((baselineCortisol * (0.9 + Math.random() * 0.08)) * 10) / 10  // 90-98% of baseline
        highDoseCortisol = Math.round((baselineCortisol * (0.85 + Math.random() * 0.1)) * 10) / 10 // 85-95% of baseline
        followUpACTH = Math.round(Math.random() * 300 + 150)               // 150-450 pg/mL
        break
        
      default:
        baselineCortisol = 15.0
        baselineACTH = 30
        lowDoseCortisol = 2.0
        highDoseCortisol = 1.0
        followUpACTH = null
    }
    
    const ages = [25, 32, 28, 45, 38, 52, 41, 29, 36, 48]
    const genders = ['Male', 'Female']
    
    return {
      diagnosis,
      patient: {
        age: ages[Math.floor(Math.random() * ages.length)],
        gender: genders[Math.floor(Math.random() * genders.length)]
      },
      labs: {
        baselineCortisol,
        baselineACTH,
        lowDoseCortisol,
        highDoseCortisol,
        followUpACTH
      }
    }
  }, [])

  const handleDiagnosisSelection = (diagnosis) => {
    setSelectedDiagnosis(diagnosis)
    setShowFeedback(true)
    
    const isCorrect = diagnosis === currentCase.diagnosis
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
  }

  const startNewCase = () => {
    setCurrentCase(generateRandomCase())
    setSelectedDiagnosis(null)
    setShowFeedback(false)
  }

  const getDiagnosisInfo = (diagnosis) => {
    const info = {
      'normal': {
        title: 'Normal HPA Axis',
        explanation: 'Normal suppression with low dose dexamethasone indicates intact hypothalamic-pituitary-adrenal axis function. This patient may have pseudo-Cushing syndrome or subclinical hypercortisolism.',
        color: 'green'
      },
      'cushing-disease': {
        title: 'Cushing Disease (Pituitary Adenoma)',
        explanation: 'Elevated baseline cortisol/ACTH with lack of suppression to low dose but >50% suppression with high dose dexamethasone indicates pituitary adenoma secreting ACTH.',
        color: 'purple'
      },
      'adrenal-cushing': {
        title: 'Primary Adrenal Disease',
        explanation: 'Very high cortisol with suppressed ACTH and no suppression with either dexamethasone dose indicates autonomous cortisol production from adrenal adenoma or carcinoma.',
        color: 'red'
      },
      'ectopic-acth': {
        title: 'Ectopic ACTH Syndrome',
        explanation: 'Markedly elevated cortisol and ACTH with no suppression to either dexamethasone dose indicates ACTH secretion from a non-pituitary tumor (lung, pancreas, etc.).',
        color: 'yellow'
      }
    }
    return info[diagnosis]
  }

  if (!currentCase) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Tests
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Dexamethasone Suppression Test
          </h1>
          <p className="text-gray-600">
            Practice interpreting dexamethasone suppression test results to determine the source of hypercortisolism
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
          <h2 className="text-2xl font-semibold mb-6">Ready to Start?</h2>
          <p className="text-gray-600 mb-8">
            Each case presents a patient with confirmed hypercortisolism and results from low and high dose 
            dexamethasone suppression testing. Analyze the lab patterns to determine the source of excess cortisol.
          </p>
          <button
            onClick={startNewCase}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            Generate First Case
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Tests
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Dexamethasone Suppression Test
        </h1>
        <p className="text-gray-600">
          Practice interpreting dexamethasone suppression test results to diagnose Cushing syndrome
        </p>
        {score.total > 0 && (
          <div className="text-sm text-gray-500 mt-2">
            Score: {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)
          </div>
        )}
      </header>

      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        {/* Patient Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Patient Case</h2>
          <p className="text-gray-700">
            {currentCase.patient.age}-year-old {currentCase.patient.gender.toLowerCase()} patient with biochemically confirmed hypercortisolism. 
            Dexamethasone suppression testing performed to determine the source of excess cortisol production.
          </p>
        </div>

        {/* Lab Results Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Laboratory Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left">Test</th>
                  <th className="border border-gray-300 p-3 text-center">Result</th>
                  <th className="border border-gray-300 p-3 text-center">Normal Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">Baseline Cortisol</td>
                  <td className="border border-gray-300 p-3 text-center">{currentCase.labs.baselineCortisol} μg/dL</td>
                  <td className="border border-gray-300 p-3 text-center text-gray-600">5-25 μg/dL</td>
                </tr>
                <tr className="bg-gray-25">
                  <td className="border border-gray-300 p-3 font-medium">Baseline ACTH</td>
                  <td className="border border-gray-300 p-3 text-center">{currentCase.labs.baselineACTH} pg/mL</td>
                  <td className="border border-gray-300 p-3 text-center text-gray-600">10-60 pg/mL</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">Low Dose Dex Cortisol</td>
                  <td className="border border-gray-300 p-3 text-center">{currentCase.labs.lowDoseCortisol} μg/dL</td>
                  <td className="border border-gray-300 p-3 text-center text-gray-600">&lt;5 μg/dL (normal suppression)</td>
                </tr>
                <tr className="bg-gray-25">
                  <td className="border border-gray-300 p-3 font-medium">High Dose Dex Cortisol</td>
                  <td className="border border-gray-300 p-3 text-center">{currentCase.labs.highDoseCortisol} μg/dL</td>
                  <td className="border border-gray-300 p-3 text-center text-gray-600">&lt;5 μg/dL (normal suppression)</td>
                </tr>
                {currentCase.labs.followUpACTH && (
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Follow-up ACTH</td>
                    <td className="border border-gray-300 p-3 text-center">{currentCase.labs.followUpACTH} pg/mL</td>
                    <td className="border border-gray-300 p-3 text-center text-gray-600">10-60 pg/mL</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Diagnosis Selection */}
        {!showFeedback && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Your Diagnosis</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <button
                onClick={() => handleDiagnosisSelection('normal')}
                className="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Normal HPA Axis</div>
                <div className="text-sm text-gray-600">Normal suppression response</div>
              </button>
              <button
                onClick={() => handleDiagnosisSelection('cushing-disease')}
                className="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Cushing Disease</div>
                <div className="text-sm text-gray-600">Pituitary adenoma</div>
              </button>
              <button
                onClick={() => handleDiagnosisSelection('adrenal-cushing')}
                className="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Primary Adrenal Disease</div>
                <div className="text-sm text-gray-600">Adrenal adenoma/carcinoma</div>
              </button>
              <button
                onClick={() => handleDiagnosisSelection('ectopic-acth')}
                className="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Ectopic ACTH Syndrome</div>
                <div className="text-sm text-gray-600">Non-pituitary ACTH source</div>
              </button>
            </div>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div>
            <div className={`p-6 rounded-lg border mb-6 ${
              selectedDiagnosis === currentCase.diagnosis 
                ? 'bg-green-100 border-green-300' 
                : 'bg-red-100 border-red-300'
            }`}>
              <h3 className={`text-xl font-semibold mb-3 ${
                selectedDiagnosis === currentCase.diagnosis 
                  ? 'text-green-800' 
                  : 'text-red-800'
              }`}>
                {selectedDiagnosis === currentCase.diagnosis ? 'Correct!' : 'Incorrect'}
              </h3>
              
              {selectedDiagnosis !== currentCase.diagnosis && (
                <p className="text-red-700 mb-3">
                  Your answer: {getDiagnosisInfo(selectedDiagnosis).title}
                </p>
              )}
              
              <p className={selectedDiagnosis === currentCase.diagnosis ? 'text-green-700' : 'text-red-700'}>
                <strong>Correct answer: {getDiagnosisInfo(currentCase.diagnosis).title}</strong>
              </p>
              
              <p className={`mt-3 ${selectedDiagnosis === currentCase.diagnosis ? 'text-green-700' : 'text-red-700'}`}>
                {getDiagnosisInfo(currentCase.diagnosis).explanation}
              </p>
            </div>
            
            <div className="text-center">
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
    </div>
  )
}

export default DexamethasoneTest