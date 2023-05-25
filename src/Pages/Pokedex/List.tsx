import React, { useState, useContext, useEffect } from 'react'
import { pokemonListContext } from '../../Context/PokemonListContext'
import { pokedex } from '../../Utils/pokedex'
import { dataLengthContext } from '../../Context/DataLengthContext'
import { Pokemon } from '../../Types/pokemon'
import MySelect from '../../Components/MySelect'

type SortOrder =
  | 'no-asc'
  | 'no-desc'
  | 'hp-asc'
  | 'hp-desc'
  | 'attack-asc'
  | 'attack-desc'
  | 'defence-asc'
  | 'defence-desc'
  | 'spAttack-asc'
  | 'spAttack-desc'
  | 'spDefence-asc'
  | 'spDefence-desc'
  | 'speed-asc'
  | 'speed-desc'

const SortOrderSelect = ({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: SortOrder
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>
}) => {
  return (
    <div className="pb-3">
      <MySelect
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as SortOrder)}
      >
        <option value="no-asc">図鑑番号：昇順</option>
        <option value="no-desc">図鑑番号：降順</option>
        <option value="hp-asc">HP：昇順</option>
        <option value="hp-desc">HP：降順</option>
        <option value="attack-asc">こうげき：昇順</option>
        <option value="attack-desc">こうげき：降順</option>
        <option value="defence-asc">ぼうぎょ：昇順</option>
        <option value="defence-desc">ぼうぎょ：降順</option>
        <option value="spAttack-asc">とくこう：昇順</option>
        <option value="spAttack-desc">とくこう：降順</option>
        <option value="spDefence-asc">とくぼう：昇順</option>
        <option value="spDefence-desc">とくぼう：降順</option>
        <option value="speed-asc">すばやさ：昇順</option>
        <option value="speed-desc">すばやさ：降順</option>
      </MySelect>
    </div>
  )
}

const conversionJa = {
  no: '図鑑番号',
  name: '名前',
  form: 'フォーム名',
  isMegaEvolution: 'メガシンカ',
  evolutions: '進化先',
  types: 'タイプ',
  abilities: '特性',
  hiddenAbilities: '夢特性',
  stats: '種族値',
}
const convertToJaForStatus = (target: keyof typeof conversionJa) => {
  return conversionJa[target]
}

const conversionJaForStats = {
  hp: 'HP',
  attack: 'こうげき',
  defence: 'ぼうぎょ',
  spAttack: 'とくこう',
  spDefence: 'とくぼう',
  speed: 'すばやさ',
}
const convertToJaForStats = (target: keyof typeof conversionJaForStats) => {
  return conversionJaForStats[target]
}

const PokemonList = ({
  pokemonList,
  sortOrder,
}: {
  pokemonList: Pokemon
  sortOrder: SortOrder
}) => {
  if (pokemonList.length) {
    type AfterName =
      | keyof typeof conversionJa
      | keyof typeof conversionJaForStats
    const [name, order] = sortOrder.split('-')
    const afterName: AfterName = name as AfterName

    if (
      afterName === 'hp' ||
      afterName === 'attack' ||
      afterName === 'defence' ||
      afterName === 'spAttack' ||
      afterName === 'spDefence' ||
      afterName === 'speed'
    ) {
      if (order === 'asc') {
        pokemonList.sort((a, b) => {
          if (a.stats[afterName] > b.stats[afterName]) {
            return 1
          }
          if (a.stats[afterName] < b.stats[afterName]) {
            return -1
          }
          return 0
        })
      } else if (order === 'desc') {
        pokemonList.sort((a, b) => {
          if (a.stats[afterName] > b.stats[afterName]) {
            return -1
          }
          if (a.stats[afterName] < b.stats[afterName]) {
            return 1
          }
          return 0
        })
      }
    } else {
      if (order === 'asc') {
        pokemonList.sort((a, b) => {
          if (a[afterName] > b[afterName]) {
            return 1
          }
          if (a[afterName] < b[afterName]) {
            return -1
          }
          return 0
        })
      } else if (order === 'desc') {
        pokemonList.sort((a, b) => {
          if (a[afterName] > b[afterName]) {
            return -1
          }
          if (a[afterName] < b[afterName]) {
            return 1
          }
          return 0
        })
      }
    }
  }

  return (
    <div className="mb-6 p-6 border border-solid border-gray-300 rounded bg-red-300">
      <div className="grid grid-cols-3 gap-4 dot-gothic">
        {pokemonList ? (
          pokemonList.map((items, i) => {
            // 図鑑内容の表示順序
            const status = {
              no: items.no,
              name: items.name,
              form: items.form,
              isMegaEvolution: items.isMegaEvolution,
              evolutions: items.evolutions,
              types: items.types,
              abilities: items.abilities,
              hiddenAbilities: items.hiddenAbilities,
              stats: items.stats,
            }

            return (
              <dl className="result-list" key={i}>
                {Object.entries(status).map(([key, value]) => {
                  let element: React.ReactElement | null = <></>

                  switch (key) {
                    case 'no':
                    case 'name':
                    case 'form':
                      element =
                        value &&
                        (typeof value === 'number' ||
                          typeof value === 'string') ? (
                          <>
                            <dt className="font-bold">
                              {convertToJaForStatus(key)}
                            </dt>
                            <dd>{value}</dd>
                          </>
                        ) : null
                      break

                    case 'isMegaEvolution':
                      element = value ? <dd>※メガシンカの姿</dd> : null
                      break

                    case 'types':
                    case 'abilities':
                    case 'hiddenAbilities':
                      element =
                        Array.isArray(value) && value.length ? (
                          <>
                            <dt className="font-bold">{conversionJa[key]}</dt>
                            <dd>{value.join(', ')}</dd>
                          </>
                        ) : null
                      break

                    case 'evolutions':
                      element =
                        value && Array.isArray(value) && value.length ? (
                          <>
                            <dt className="font-bold">{conversionJa[key]}</dt>
                            <dd>
                              {value
                                .map((key) => {
                                  if (items.name === 'ダクマ')
                                    return 'ウーラオス'
                                  if (items.name === 'グルトン')
                                    return 'パフュートン'

                                  const destination = pokemonList.filter(
                                    (d) => {
                                      return d.no === Number(key)
                                    },
                                  )

                                  if (destination.length === 0) return ''

                                  let ret: string | undefined =
                                    destination[0].name
                                  if (destination.length > 1) {
                                    ret = destination.find((data) => {
                                      return data.form === items.form
                                    })?.name

                                    if (items.form !== '') {
                                      ret = ret + '(' + items.form + ')'
                                    }
                                  }

                                  return ret
                                })
                                .join(', ')}
                            </dd>
                          </>
                        ) : null
                      break

                    case 'stats':
                      // 種族値の表示順序
                      const stats = {
                        hp: status.stats.hp,
                        attack: status.stats.attack,
                        defence: status.stats.defence,
                        spAttack: status.stats.spAttack,
                        spDefence: status.stats.spDefence,
                        speed: status.stats.speed,
                      }

                      let totalStats = 0

                      element =
                        typeof value === 'object' && !Array.isArray(value) ? (
                          <>
                            <dt className="font-bold">{conversionJa[key]}</dt>
                            <dd>
                              <dl>
                                {Object.entries(stats).map(([k, v]) => {
                                  totalStats += v
                                  return (
                                    <React.Fragment key={k}>
                                      <dt className="text-lg">
                                        {convertToJaForStats(
                                          k as keyof typeof stats,
                                        )}
                                      </dt>
                                      <dd>{v}</dd>
                                    </React.Fragment>
                                  )
                                })}
                                <dt className="text-lg">合計種族値</dt>
                                <dd>{totalStats}</dd>
                              </dl>
                            </dd>
                          </>
                        ) : null
                      break
                  }

                  return (
                    <React.Fragment key={key}>
                      {element ? element : <></>}
                    </React.Fragment>
                  )
                })}
              </dl>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

const List = () => {
  const { pokemonList, setPokemonList } = useContext(pokemonListContext)
  const { setDataLength } = useContext(dataLengthContext)
  const [sortOrder, setSortOrder] = useState<SortOrder>('no-asc')

  useEffect(() => {
    setPokemonList(pokedex)
    setDataLength(pokedex.length)
  }, [setPokemonList, setDataLength])

  return (
    <section>
      <h2 className="title">図鑑</h2>
      <SortOrderSelect sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <PokemonList pokemonList={pokemonList} sortOrder={sortOrder} />
    </section>
  )
}

export default List
