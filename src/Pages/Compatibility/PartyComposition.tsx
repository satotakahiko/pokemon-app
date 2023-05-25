import React, { ChangeEvent, useMemo, useState } from 'react'
import MyButton from '../../Components/MyButton'
import MySelect from '../../Components/MySelect'
import {
  Type,
  Pokemon,
  typeList,
  getParams,
  convertToTypeKanji,
  getSymbolForDefense,
  getTimesResult,
} from '../../Utils/typeList'

const PartyComposition = () => {
  const [pokemonType, setPokemonType] = useState<Pokemon>({
    pokemon1: {
      type1: '',
      type2: '',
    },
    pokemon2: {
      type1: '',
      type2: '',
    },
    pokemon3: {
      type1: '',
      type2: '',
    },
    pokemon4: {
      type1: '',
      type2: '',
    },
    pokemon5: {
      type1: '',
      type2: '',
    },
    pokemon6: {
      type1: '',
      type2: '',
    },
  })
  // const [weakness, setWeakness] = useState<(string | undefined)[]>([])
  const [isShow, setIsShow] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()

    let key1: keyof Pokemon = 'pokemon1'
    let key2: keyof Type = 'type1'
    const { name, value } = e.target

    switch (name) {
      case 'pokemon2-type1':
      case 'pokemon2-type2':
        key1 = 'pokemon2'
        break

      case 'pokemon3-type1':
      case 'pokemon3-type2':
        key1 = 'pokemon3'
        break

      case 'pokemon4-type1':
      case 'pokemon4-type2':
        key1 = 'pokemon4'
        break

      case 'pokemon5-type1':
      case 'pokemon5-type2':
        key1 = 'pokemon5'
        break

      case 'pokemon6-type1':
      case 'pokemon6-type2':
        key1 = 'pokemon6'
        break
    }

    if (name.endsWith('-type2')) {
      key2 = 'type2'
    }

    setPokemonType({
      ...pokemonType,
      [key1]: {
        ...pokemonType[key1],
        [key2]: value,
      },
    })
  }

  const handleClick = () => {
    // setWeakness(getTimesResultForParty(pokemonType))
    setIsShow(true)
  }

  const PokemonRow = ({
    label,
    name,
    value,
  }: {
    label: string
    name: Array<string>
    value: Array<string>
  }) => {
    const optionElement = useMemo(
      () => (
        <>
          {typeList.map((items) => {
            const { type, typeJa, color } = items
            return (
              <option key={type} value={type} data-color={color}>
                {typeJa}
              </option>
            )
          })}
        </>
      ),
      [],
    )

    return (
      <div className="flex gap-x-4">
        <p className="flex items-center text-lg">{label}</p>
        <MySelect
          name={name[0]}
          value={value[0]}
          onChange={(e) => handleChange(e)}
        >
          {optionElement}
          <option value=""></option>
        </MySelect>
        <MySelect
          name={name[1]}
          value={value[1]}
          onChange={(e) => handleChange(e)}
        >
          {optionElement}
          <option value=""></option>
        </MySelect>
      </div>
    )
  }

  return (
    <section>
      <h2 className="title">構成</h2>
      <div className="grid grid-cols-1 gap-y-5 mb-6">
        <PokemonRow
          label={'1：'}
          name={['pokemon1-type1', 'pokemon1-type2']}
          value={[pokemonType.pokemon1.type1, pokemonType.pokemon1.type2]}
        />
        <PokemonRow
          label={'2：'}
          name={['pokemon2-type1', 'pokemon2-type2']}
          value={[pokemonType.pokemon2.type1, pokemonType.pokemon2.type2]}
        />
        <PokemonRow
          label={'3：'}
          name={['pokemon3-type1', 'pokemon3-type2']}
          value={[pokemonType.pokemon3.type1, pokemonType.pokemon3.type2]}
        />
        <PokemonRow
          label={'4：'}
          name={['pokemon4-type1', 'pokemon4-type2']}
          value={[pokemonType.pokemon4.type1, pokemonType.pokemon4.type2]}
        />
        <PokemonRow
          label={'5：'}
          name={['pokemon5-type1', 'pokemon5-type2']}
          value={[pokemonType.pokemon5.type1, pokemonType.pokemon5.type2]}
        />
        <PokemonRow
          label={'6：'}
          name={['pokemon6-type1', 'pokemon6-type2']}
          value={[pokemonType.pokemon6.type1, pokemonType.pokemon6.type2]}
        />
      </div>
      <MyButton classNames="px-6 mb-6" handleClick={handleClick}>
        診断
      </MyButton>
      <div className="border border-solid border-gray-400 rounded-md p-8 text-lg">
        <p>
          {isShow && (
            <>
              <p className="py-2">【防御側】</p>
              <div className="my-table">
                <div className="column">
                  <span></span>
                  {getParams('typeKanji').map((typeKanji, i) => {
                    return <span key={i}>{typeKanji}</span>
                  })}
                </div>
                {Object.entries(pokemonType).map(([key, val]) => {
                  const { type1, type2 } = val
                  return (
                    <div key={key} className="column">
                      <span>
                        {convertToTypeKanji(type1)}&nbsp;
                        {convertToTypeKanji(type2)}
                      </span>
                      {getParams('type').map((type) => {
                        const timesResult = getTimesResult(type, type1, type2)
                        return (
                          <span key={type} className={type + '-cell'}>
                            {getSymbolForDefense(timesResult)}
                          </span>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
              <p className="py-2">【攻撃側 タイプ一致】</p>
              <div></div>
            </>
          )}
        </p>
      </div>
    </section>
  )
}

export default PartyComposition
