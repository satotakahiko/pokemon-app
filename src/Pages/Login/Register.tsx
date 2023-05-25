import React, { useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../../FirebaseConfig'
import { Navigate, Link } from 'react-router-dom'
import MyButton from '../../Components/MyButton'

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      )
    } catch (error) {
      alert('正しく入力してください')
      console.log('error', error)
    }
  }

  const [user, setUser] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
    })
  }, [])

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <div className="my-14 grid gap-y-7">
          <h1 className="justify-self-center text-xl font-bold">新規登録</h1>
          <form className="grid gap-y-7" onSubmit={handleSubmit}>
            <div>
              <label className="block pb-2">メールアドレス</label>
              <input
                className="my-input"
                name="email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block pb-2">パスワード</label>
              <input
                className="my-input"
                name="password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <MyButton>登録する</MyButton>
            <p className="justify-self-center">
              ログインは
              <Link to={`/login/`} className="underline">
                こちら
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  )
}

export default Register
