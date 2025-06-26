import React from 'react'
import { Link } from 'react-router'
import { useAuthContext } from '../hooks/useAuthContext.js'

function LogOut() {
  const { logout } = useAuthContext()

  return (
    <Link
      to="/"
      onClick={() => logout()}
      className="text-medium text-gray-700 hover:underline dark:text-gray-300"
    >
      LogOut
    </Link>
  )
}

export default LogOut
