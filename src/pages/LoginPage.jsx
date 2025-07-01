import React, { useState } from 'react'
import RegisterForm from '../components/RegisterForm.jsx'
import LoginForm from '../components/LoginForm.jsx'

function LoginPage() {
  const [showLLogin, setShowLogin] = useState(true)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => setShowLogin(true)}
            className={`rounded px-4 py-2 ${showLLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-white'}`}
          >
            Login
          </button>
          <button
            onClick={() => setShowLogin(false)}
            className={`rounded px-4 py-2 ${showLLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-white'}`}
          >
            Register
          </button>
        </div>
        {showLLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm onRegisterSuccess={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  )
}

export default LoginPage
