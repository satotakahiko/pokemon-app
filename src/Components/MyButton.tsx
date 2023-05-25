import React from 'react'

interface OwnProps {
  name?: string
  classNames?: string
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}

const MyButton = (props: OwnProps) => {
  const { children, name, classNames, handleClick } = props
  return (
    <button
      name={name}
      className={'my-button ' + classNames}
      onClick={!!handleClick ? (e) => handleClick(e) : undefined}
    >
      {children}
    </button>
  )
}

export default MyButton
