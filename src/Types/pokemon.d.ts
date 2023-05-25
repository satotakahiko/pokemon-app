export type Stats = {
  hp: number
  attack: number
  defence: number
  spAttack: number
  spDefence: number
  speed: number
}

export type PokemonData = {
  no: number
  name: string
  form: string
  isMegaEvolution: boolean
  evolutions: number[]
  types: string[]
  abilities: string[]
  hiddenAbilities: string[]
  stats: Stats
  id?: number
}

export type Pokemon = Array<PokemonData>