import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Theme/globals.css'
import './Theme/variables.css'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Register from './Pages/Login/Register'
import Login from './Pages/Login/Login'
import TopMenu from './Pages/TopMenu/TopMenu'
import Compatibility from './Pages/Compatibility/Compatibility'
import Pokedex from './Pages/Pokedex/Pokedex'
import Abilities from './Pages/Abilities/Abilities'
import Party from './Pages/Party/Party'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="content">
          <Routes>
            <Route path={`/register/`} element={<Register />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/`} element={<TopMenu />} />
            <Route path={`/compatibility/`} element={<Compatibility />} />
            <Route path={`/pokedex/`} element={<Pokedex />} />
            <Route path={`/abilities/`} element={<Abilities />} />
            <Route path={`/party/`} element={<Party />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
