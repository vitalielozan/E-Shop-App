import React from 'react'
import { Link } from 'react-router'
import { Avatar } from '@heroui/react'
import { Disclosure, DisclosureButton } from '@headlessui/react'
import { AnimatePresence } from 'framer-motion'
import AnimatedMobileMenu from './AnimatedMobileMenu.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import SearchBar from './SearchBar.jsx'
import LogOut from './LogOut.jsx'
import { useAuthContext } from '../hooks/useAuthContext.js'

function Header() {
  const { users, isLoggedIn } = useAuthContext()
  return (
    <Disclosure as="nav" className="bg-white py-3 shadow dark:bg-gray-900">
      {({ open }) => (
        <>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-4 px-4 py-3">
            <Avatar size="lg" radius="md" src="/avatar.png" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              <Link to="/">TV-Maxx</Link>
            </h1>

            <div className="hidden space-x-6 md:flex">
              <Link
                to="/"
                className="text-large text-gray-700 hover:underline dark:text-gray-300"
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className="text-large text-gray-700 hover:underline dark:text-gray-300"
              >
                Favorites
              </Link>
              <Link
                to="/cart"
                className="text-large text-gray-700 hover:underline dark:text-gray-300"
              >
                Cart
              </Link>
              {users.length === 0 && (
                <Link
                  to="/signup"
                  className="text-large text-gray-700 hover:underline dark:text-gray-300"
                >
                  SignUp
                </Link>
              )}
              {users.length > 0 && !isLoggedIn && (
                <Link
                  to="/login"
                  className="text-large text-gray-700 hover:underline dark:text-gray-300"
                >
                  LogIn
                </Link>
              )}
              {isLoggedIn && <LogOut />}
              <SearchBar />
              <ThemeToggle />
            </div>

            <DisclosureButton className="text-2xl text-gray-800 dark:text-gray-300 md:hidden">
              ☰
            </DisclosureButton>
          </div>

          <AnimatePresence initial={false}>
            {open && <AnimatedMobileMenu />}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  )
}

export default Header
