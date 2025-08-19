import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-left mb-12">
        <h1 className="font-serif text-4xl font-bold text-gray-800 mb-4">Practical test interpretation</h1>
        <p className="text-lg text-gray-600 font-light">
          Practice interactive medical diagnostic tests and clinical decision-making
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link 
          to="/dexamethasone" 
          className="block bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-300 p-6 border border-gray-200/50"
        >
          <h2 className="font-serif text-xl font-semibold text-gray-800 mb-3">
            Dexamethasone Suppression
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Practice the diagnostic pathway for Cushing's syndrome using low and high dose 
            dexamethasone suppression tests, including cortisol and ACTH interpretation.
          </p>
          <div className="font-serif mt-4 text-blue-600 font-medium">
            Start Test →
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Home