import List from './List'
import SavePokedex from './SavePokedex'
import DataLengthProvider from '../../Context/DataLengthContext'
import PokemonListProvider from '../../Context/PokemonListContext'
import Search from './Search'
import './Pokedex.css'

const Pokedex = () => {
  return (
    <PokemonListProvider>
      <DataLengthProvider>
        <Search />
        <h1 className="title pt-4">図鑑</h1>
        <SavePokedex />
        <List />
      </DataLengthProvider>
    </PokemonListProvider>
  )
}

export default Pokedex
