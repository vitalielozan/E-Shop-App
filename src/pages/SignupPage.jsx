import React, { useState } from 'react'
import RegisterForm from '../components/RegisterForm.jsx'

function SignupPage() {
  const [showSignup, setShowSignup] = useState(true)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => setShowSignup(false)}
            className={`rounded px-4 py-2 ${showSignup ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-white'}`}
          >
            Register
          </button>
        </div>
        {showSignup && (
          <RegisterForm onRegisterSuccess={() => setShowSignup(true)} />
        )}
      </div>
    </div>
  )
}

export default SignupPage
