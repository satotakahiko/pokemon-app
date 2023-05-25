import React, { useState, useEffect } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../FirebaseConfig'
import { Navigate, Link } from 'react-router-dom'

const TopMenu = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <h1 className="text-2xl font-medium py-4">HOME</h1>
              <div className="flex flex-col gap-2 items-baseline">
                <Link to={`/Compatibility/`}>タイプ相性チェッカー</Link>
                <Link className="mt-2" to={`/pokedex/`}>
                  ポケモン図鑑
                </Link>
                <Link className="mt-2" to={`/abilities/`}>
                  とくせい一覧
                </Link>
                <Link className="mt-2" to={`/party/`}>
                  パーティ構成
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default TopMenu
