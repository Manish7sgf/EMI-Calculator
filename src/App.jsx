import { useState, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Calculator from './components/Calculator'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <main className="main-content">
        <Calculator />
      </main>
      <Footer />
    </div>
  )
}

export default App
