import React, { useState } from 'react'
import { abilities } from '../../Utils/abilities'
import MyInp from '../../Components/MyInp'
import { pokedex } from '../../Utils/pokedex'
import './Abilities.css'

const Abilities = () => {
  const [searchKey, setSearchKey] = useState('all')

  return (
    <section>
      <h2 className="title">とくせい一覧</h2>
      <div className="mb-6">
        <MyInp
          id="search_inp"
          label="とくせい検索"
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <dl className="ability-list">
        {abilities
          .filter((items) => {
            const { name, info } = items
            if (searchKey !== 'all') {
              return (
                ~name.indexOf(searchKey) | ~info.join('').indexOf(searchKey)
              )
            }
            return true
          })
          .map((items, i) => {
            return (
              <React.Fragment key={i}>
                <div className="ability">
                  <dt className="text-lg ">{items.name}</dt>
                  <dd className="pl-2">
                    {items.info.map((item, index) => {
                      return <p key={index}>{item}</p>
                    })}
                  </dd>
                  <div className="pt-1 flex flex-wrap gap-1">
                    {pokedex
                      .filter((pokemon) => {
                        return (
                          pokemon.abilities.some((abi) => items.name === abi) ||
                          pokemon.hiddenAbilities.some(
                            (hiddenabi) => items.name === hiddenabi,
                          )
                        )
                      })
                      .map((pokemon, idx) => {
                        return (
                          <p
                            key={idx}
                            className="have-poke text-sm text-gray-500"
                          >
                            {pokemon.name}
                            {pokemon.form ? `(${pokemon.form})` : ''}
                          </p>
                        )
                      })}
                  </div>
                </div>
              </React.Fragment>
            )
          })}
      </dl>
    </section>
  )
}

export default Abilities
