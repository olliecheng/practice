import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Medical Practice Tests</h1>
        <p className="text-lg text-gray-600 font-light">
          Practice medical diagnostic tests and clinical decision-making
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link 
          to="/dexamethasone" 
          className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Dexamethasone Suppression Test
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Practice the diagnostic pathway for Cushing's syndrome using low and high dose 
            dexamethasone suppression tests, including cortisol and ACTH interpretation.
          </p>
          <div className="mt-4 text-blue-600 font-medium">
            Start Test →
          </div>
        </Link>

        <div className="block bg-gray-100 rounded-lg p-6 border border-gray-200 opacity-50">
          <h2 className="text-xl font-semibold text-gray-500 mb-3">
            More Tests Coming Soon
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Additional medical practice tests will be added to help you master 
            clinical diagnostic skills.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home