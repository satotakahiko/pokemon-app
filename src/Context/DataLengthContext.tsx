import React, { useState, createContext } from 'react'

type OwnProps = {
  children: React.ReactNode
}

type ContextType = {
  dataLength: number | null
  setDataLength: React.Dispatch<React.SetStateAction<number | null>>
}

export const dataLengthContext = createContext<ContextType>({} as ContextType)

const DataLengthProvider = (props: OwnProps) => {
  const [dataLength, setDataLength] = useState<number | null>(null)

  return (
    <dataLengthContext.Provider value={{ dataLength, setDataLength }}>
      {props.children}
    </dataLengthContext.Provider>
  )
}

export default DataLengthProvider
