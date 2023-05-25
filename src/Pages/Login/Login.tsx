import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../FirebaseConfig'
import { Navigate, Link } from 'react-router-dom'
import MyButton from '../../Components/MyButton'

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    } catch (error) {
      alert('メールアドレスまたはパスワードが間違っています')
    }
  }

  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
    })
  })

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <div className="my-14 grid gap-y-7">
          <h1 className="justify-self-center text-xl font-bold">
            ログインページ
          </h1>
          <form className="grid gap-y-7" onSubmit={handleSubmit}>
            <div>
              <label className="block pb-2">メールアドレス</label>
              <input
                className="my-input"
                name="email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block pb-2">パスワード</label>
              <input
                className="my-input"
                name="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <MyButton>ログイン</MyButton>
            <p className="justify-self-center">
              新規登録は
              <Link to={`/register/`} className="underline">
                こちら
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  )
}

export default Login
