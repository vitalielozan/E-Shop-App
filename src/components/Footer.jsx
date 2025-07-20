import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useAuthContext } from '../hooks/useAuthContext.js'
import LogOut from './LogOut.jsx'

function Footer() {
  const { users, isLoggedIn } = useAuthContext()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-100 px-4 py-3 dark:bg-gray-900">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-2 pb-3 text-center text-sm md:grid-cols-4 md:text-left">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            TV-Maxx
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your source for premium TVs.
          </p>
        </div>

        <div className="space-y-3 text-center text-base">
          <Link
            to="/"
            onClick={scrollToTop}
            className="block text-large text-gray-500 hover:underline dark:text-gray-400"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            onClick={scrollToTop}
            className="block text-large text-gray-500 hover:underline dark:text-gray-400"
          >
            Favorites
          </Link>
          <Link
            to="/cart"
            onClick={scrollToTop}
            className="block text-large text-gray-500 hover:underline dark:text-gray-400"
          >
            Cart
          </Link>

          {users.length > 0 && !isLoggedIn && (
            <Link
              to="/login"
              onClick={scrollToTop}
              className="block text-large text-gray-500 hover:underline dark:text-gray-400"
            >
              LogIn
            </Link>
          )}
          {isLoggedIn && <LogOut />}
        </div>

        <div className="space-y-5">
          <p className="font-semibold text-gray-500 dark:text-gray-400">
            Follow Us
          </p>
          <div className="flex justify-center space-x-4 md:justify-start">
            <a
              href="https://www.facebook.com/"
              target="-blank"
              className="hover:text-blue-600"
              aria-label="Facebook"
            >
              <FaFacebook className="h-8 w-8" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="hover:text-pink-500"
              aria-label="Instagram"
            >
              <FaInstagram className="h-8 w-8" />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              className="hover:text-red-800"
              aria-label="Tiktok"
            >
              <FaTiktok className="h-8 w-8" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <LanguageSwitcher className="mx-auto w-full max-w-[160px] text-gray-900 dark:text-white md:mx-0" />
        </div>
      </div>
      <hr className="mx-10 my-4 border-t border-gray-700 dark:border-gray-500" />

      <p className="py-2 text-center text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} All rights reserved by Vitalie Lozan.
      </p>
    </footer>
  )
}

export default Footer
