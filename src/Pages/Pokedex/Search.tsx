import React, { forwardRef, ComponentPropsWithoutRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { pokedex } from '../../Utils/pokedex'
import { getParams } from '../../Utils/typeList'
import MyInp from '../../Components/MyInp'
import MyButton from '../../Components/MyButton'
import MySelect from '../../Components/MySelect'
import MyRadio from '../../Components/MyRadio'
import { Pokemon } from '../../Types/pokemon.d'
import { typeList } from '../../Utils/typeList'

type Sign = 'ge' | 'eq' | 'le'

type SearchForm = {
  name: string
  type1: string
  type2: string
  abilitie: string
  hp: string
  hpSign: Sign
  attack: string
  attackSign: Sign
  defence: string
  defenceSign: Sign
  spAttack: string
  spAttackSign: Sign
  spDefence: string
  spDefenceSign: Sign
  speed: string
  speedSign: Sign
}

type RadioGroupProps = ComponentPropsWithoutRef<'input'> & {
  id: string
}

const OptionElement = () => {
  const types = getParams('type')
  const typesJp = getParams('typeJa')

  return types.map((type, i) => {
    return (
      <option key={type} value={type}>
        {typesJp[i]}
      </option>
    )
  })
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ id, ...props }, ref) => {
    return (
      <div className="flex gap-2 items-end">
        <div>
          <MyRadio
            id={`${id}_ge`}
            label="以上"
            value="ge"
            ref={ref}
            {...props}
          />
        </div>
        <div>
          <MyRadio
            id={`${id}_eq`}
            label="等しい"
            value="eq"
            ref={ref}
            {...props}
          />
        </div>
        <div>
          <MyRadio
            id={`${id}_le`}
            label="以下"
            value="le"
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  },
)

const Search = () => {
  const [searchResult, setSearchResult] = useState<Pokemon>()
  const [searchResultLength, setSearchResultLength] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const { register, setValue, getValues, reset } = useForm<SearchForm>({
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      type1: '',
      type2: '',
      abilitie: '',
      hp: '',
      hpSign: 'ge',
      attack: '',
      attackSign: 'ge',
      defence: '',
      defenceSign: 'ge',
      spAttack: '',
      spAttackSign: 'ge',
      spDefence: '',
      spDefenceSign: 'ge',
      speed: '',
      speedSign: 'ge',
    },
  })

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type1 = getValues('type1')
    const { value } = e.target
    if (!type1 && value) {
      setValue('type1', value)
      setValue('type2', '')
      e.target.blur()
    }
  }

  const handleSearchClick = () => {
    let result = pokedex

    Object.entries(getValues())
      .filter(([key, value]) => {
        return value !== ''
      })
      .forEach(([key, value]) => {
        switch (key) {
          case 'name':
            result = result.filter((data) => {
              return ~data.name.indexOf(value)
            })
            break

          case 'type1':
            result = result.filter((data) => {
              const haystack = data.types.map(
                (type) => typeList.find((item) => item.typeJa === type)?.type,
              )
              const needleType = getValues(['type1', 'type2']).filter(
                (type) => type !== '',
              )

              if (needleType.length === 2) {
                return (
                  JSON.stringify(haystack.sort()) ===
                  JSON.stringify(needleType.sort())
                )
              } else {
                return haystack.some((val) => val === needleType[0])
              }
            })
            break

          case 'abilitie':
            result = result.filter((data) => {
              return ~data.abilities.indexOf(value)
            })
            break

          case 'hp':
          case 'attack':
          case 'defence':
          case 'spAttack':
          case 'spDefence':
          case 'speed':
            result = result.filter((data) => {
              let ret = false
              const targetPokemonStats = data.stats[key]
              const sign = getValues(`${key}Sign`)
              if (sign === 'ge') {
                ret = Number(value) <= targetPokemonStats
              } else if (sign === 'le') {
                ret = Number(value) >= targetPokemonStats
              } else {
                ret = Number(value) === targetPokemonStats
              }

              return ret
            })
            break
        }
      })

    setIsShow(true)
    setSearchResult(result)
    setSearchResultLength(result.length)
  }

  return (
    <section>
      <h2 className="title">検索</h2>
      <div className="pb-3 flex gap-10 mb-8">
        <div className="w-3/12">
          <div className="pb-3">
            <MyInp id="name_search_inp" label="名前" {...register('name')} />
          </div>
          <div className="pb-3">
            <label className="block pb-2">タイプ</label>
            <div className="flex gap-4">
              <MySelect {...register('type1', { required: true })}>
                <option value=""></option>
                {OptionElement()}
              </MySelect>
              <MySelect
                {...register('type2', {
                  onChange: (e) => handleTypeChange(e),
                })}
              >
                <option value=""></option>
                {OptionElement()}
              </MySelect>
            </div>
          </div>
          <div className="pb-3">
            <MyInp
              id="abilitie_search_inp"
              label="とくせい"
              {...register('abilitie')}
            />
          </div>
        </div>
        <div className="pb-2 w-1/3">
          <h3>種族値</h3>
          <div className="flex gap-10 pb-2">
            <div className="w-1/4">
              <MyInp id="inp_hp" type="number" label="HP" {...register('hp')} />
            </div>
            <RadioGroup id="radio_hp" {...register('hpSign')} />
          </div>
          <div className="flex gap-10 pb-2">
            <div className="w-1/4">
              <MyInp
                id="inp_attack"
                type="number"
                label="こうげき"
                {...register('attack')}
              />
            </div>
            <RadioGroup id="radio_attack" {...register('attackSign')} />
          </div>
          <div className="flex gap-10 pb-2">
            <div className="w-1/4">
              <MyInp
                id="inp_defence"
                type="number"
                label="ぼうぎょ"
                {...register('defence')}
              />
            </div>
            <RadioGroup id="radio_defence" {...register('defenceSign')} />
          </div>
          <div className="flex gap-10 pb-2">
            <div className="w-1/4">
              <MyInp
                id="inp_spAttack"
                type="number"
                label="とくこう"
                {...register('spAttack')}
              />
            </div>
            <RadioGroup id="radio_spAttack" {...register('spAttackSign')} />
          </div>
          <div className="flex gap-10 pb-2">
            <div className="w-1/4">
              <MyInp
                id="inp_spDefence"
                type="number"
                label="とくぼう"
                {...register('spDefence')}
              />
            </div>
            <RadioGroup id="radio_spDefence" {...register('spDefenceSign')} />
          </div>
          <div className="flex gap-10">
            <div className="w-1/4">
              <MyInp
                id="inp_speed"
                type="number"
                label="すばやさ"
                {...register('speed')}
              />
            </div>
            <RadioGroup id="radio_speed" {...register('speedSign')} />
          </div>
        </div>
      </div>
      <div className="flex gap-6 pb-6">
        <MyButton
          handleClick={() => {
            reset()
            setIsShow(false)
          }}
        >
          リセット
        </MyButton>
        <MyButton handleClick={handleSearchClick}>検索</MyButton>
      </div>
      <div className="mb-6 p-6 border border-solid border-gray-300 rounded bg-red-300">
        {isShow ? (
          <>
            <p className="pb-4 text-lg">
              {pokedex.length} 件中 {searchResultLength} 件見つかりました
            </p>
            <div className="grid grid-cols-3 gap-6">
              {searchResult?.length ? (
                searchResult.map((data) => {
                  return (
                    <dl
                      key={data.no + data.name + data.form}
                      className="result-list"
                    >
                      <dt>図鑑番号</dt>
                      <dd>{data.no}</dd>
                      <dt>名前</dt>
                      <dd>{data.name}</dd>
                      <dt>タイプ</dt>
                      <dd>{data.types.join(', ')}</dd>
                      <dt>特性</dt>
                      <dd>{data.abilities.join(', ')}</dd>
                      {data.hiddenAbilities.length ? (
                        <>
                          <dt>夢特性</dt>
                          <dd>{data.hiddenAbilities.join(', ')}</dd>
                        </>
                      ) : (
                        ''
                      )}
                      <dt>種族値</dt>
                      <dd>
                        <dl>
                          <dt>HP</dt>
                          <dd>{data.stats.hp}</dd>
                          <dt>こうげき</dt>
                          <dd>{data.stats.attack}</dd>
                          <dt>ぼうぎょ</dt>
                          <dd>{data.stats.defence}</dd>
                          <dt>とくこう</dt>
                          <dd>{data.stats.spAttack}</dd>
                          <dt>とくぼう</dt>
                          <dd>{data.stats.spDefence}</dd>
                          <dt>すばやさ</dt>
                          <dd>{data.stats.speed}</dd>
                        </dl>
                      </dd>
                    </dl>
                  )
                })
              ) : (
                <p className="font-bold">該当ポケモンなし</p>
              )}
            </div>
          </>
        ) : (
          <p className="font-bold">
            ☆★☆☆★☆ ここに検索結果が表示されます ☆★☆☆★☆
          </p>
        )}
      </div>
    </section>
  )
}

export default Search
