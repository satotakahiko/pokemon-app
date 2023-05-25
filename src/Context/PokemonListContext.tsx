import React, { useState, createContext } from 'react'
import { Pokemon } from '../Types/pokemon.d'

type OwnProps = {
  children: React.ReactNode
}

type ContextType = {
  pokemonList: Pokemon
  setPokemonList: React.Dispatch<React.SetStateAction<Pokemon>>
}

export const pokemonListContext = createContext<ContextType>({} as ContextType)

const PokemonListProvider = (props: OwnProps) => {
  const [pokemonList, setPokemonList] = useState<Pokemon>([] as Pokemon)

  return (
    <pokemonListContext.Provider value={{ pokemonList, setPokemonList }}>
      {props.children}
    </pokemonListContext.Provider>
  )
}

export default PokemonListProvider
