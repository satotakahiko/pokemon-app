import React, { useState, useEffect } from 'react'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../FirebaseConfig'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
    })
  }, [])

  const navigate = useNavigate()

  const logout = async () => {
    await signOut(auth)
    navigate('/login/')
  }

  return (
    <header className="h-14 bg-green-200 flex items-center">
      <div className="flex-1 px-3 flex gap-x-5 justify-between items-center">
        <Link to={`/`}>
          <p className="text-xl">Header</p>
        </Link>
        {user && (
          <div className="flex gap-x-3 items-center">
            <p className="text-sm">User：{user.email}</p>
            <button className="underline" onClick={logout}>
              Signout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
