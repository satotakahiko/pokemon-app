import React from 'react'
import './Compatibility.css'
import Checker from './Checker'
import Table from './Table'
import PartyComposition from './PartyComposition'
import QuizCompatibility from './QuizCompatibility'
import QuizType from './QuizType'

const Compatibility = () => {
  return (
    <>
      <Checker />
      <Table />
      <PartyComposition />
      <QuizCompatibility />
      <QuizType />
    </>
  )
}

export default Compatibility
