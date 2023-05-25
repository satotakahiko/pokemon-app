import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import MyButton from '../../Components/MyButton'
import MyInp from '../../Components/MyInp'
import MyCheckbox from '../../Components/MyCheckbox'
import MySelect from '../../Components/MySelect'
import { getParams } from '../../Utils/typeList'
import { Stats, PokemonData } from '../../Types/pokemon'
import { dataLengthContext } from '../../Context/DataLengthContext'
import { pokemonListContext } from '../../Context/PokemonListContext'
import axios from 'axios'
import { typeList } from '../../Utils/typeList'

type PokemonDataForInput = {
  no: number | null
  name: string
  form: string
  isMegaEvolution: string[]
  evolutions: string
  type1: string
  type2: string
  abilities: string
  hiddenAbilities: string
  stats: {
    hp: number | null
    attack: number | null
    defence: number | null
    spAttack: number | null
    spDefence: number | null
    speed: number | null
  }
  id?: number
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

const SavePokedex = () => {
  const { pokemonList, setPokemonList } = useContext(pokemonListContext)
  const { dataLength } = useContext(dataLengthContext)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<PokemonDataForInput>({
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      no: null,
      name: '',
      form: '',
      isMegaEvolution: [],
      evolutions: '',
      type1: '',
      type2: '',
      abilities: '',
      hiddenAbilities: '',
      stats: {
        hp: null,
        attack: null,
        defence: null,
        spAttack: null,
        spDefence: null,
        speed: null,
      },
    },
  })

  const onSubmit: SubmitHandler<PokemonDataForInput> = (data) => {
    let modifiedData = {} as PokemonData
    ;(
      [
        'no',
        'name',
        'form',
        'isMegaEvolution',
        'evolutions',
        'types',
        'abilities',
        'hiddenAbilities',
        'stats',
      ] as (keyof typeof modifiedData)[]
    ).forEach((key) => {
      switch (key) {
        case 'no':
          modifiedData = {
            ...modifiedData,
            [key]: Number(data[key]),
          }
          break

        case 'isMegaEvolution':
          modifiedData = {
            ...modifiedData,
            isMegaEvolution: data['isMegaEvolution'][0] === 'on' ? true : false,
          }
          break

        case 'types':
          const types = [data['type1'], data['type2']]
            .map((type) => {
              const t = typeList.find((val) => {
                return val.type === type
              })
              return t !== undefined ? t.typeJa : ''
            })
            .filter((type) => type !== '')

          modifiedData = {
            ...modifiedData,
            types: types,
          }
          break

        case 'evolutions':
        case 'abilities':
        case 'hiddenAbilities':
          const replaceData = data[key].replace(/ /g, '')
          if (replaceData !== '') {
            let filterData: number[] | string[] = replaceData
              .split(',')
              .filter((item) => {
                return item !== ''
              })

            if (key === 'evolutions') {
              filterData = filterData.map((evo) => Number(evo))
            }
            modifiedData = {
              ...modifiedData,
              [key]: filterData,
            }
          } else {
            modifiedData = {
              ...modifiedData,
              [key]: [],
            }
          }
          break

        case 'stats':
          let stats = {} as Stats
          ;(Object.keys(data[key]) as (keyof typeof stats)[]).forEach((k) => {
            stats = {
              ...stats,
              [k]: Number(data[key][k]),
            }
          })
          modifiedData = {
            ...modifiedData,
            [key]: stats,
          }
          break

        default:
          modifiedData = {
            ...modifiedData,
            [key]: data[key],
          }
          break
      }
    })

    if (dataLength !== null) {
      axios
        .post('http://localhost:3100/pokedex?id=' + dataLength, modifiedData)
        .then((response) => {
          console.log('Data saved successfully!', modifiedData)
          setPokemonList([...pokemonList, modifiedData])
          reset()
        })

      // const dbRef = ref(database, String(dataLength))
      // set(dbRef, { ...modifiedData })
      //   .then(() => {
      //     // Data saved successfully!
      //     console.log('Data saved successfully!', data)
      //     pokemonList && setPokemonList([...pokemonList, modifiedData])
      //     reset()
      //   })
      //   .catch((error) => {
      //     // The write failed...
      //     console.log('The write failed...', data)
      //   })
    } else {
      console.log('please retry', dataLength)
    }
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type1 = getValues('type1')
    const { value } = e.target
    if (!type1 && value) {
      setValue('type1', value)
      setValue('type2', '')
      e.target.blur()
    }
  }

  return (
    <section>
      <h2 className="title">登録</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-3 flex gap-10">
          <div className="w-3/12">
            <div className="pb-3 w-1/3">
              <MyInp
                id="inp_no"
                type="number"
                label="図鑑番号"
                {...register('no', { required: true })}
              />
              {errors.no && <div>入力が必須の項目です</div>}
            </div>
            <div className="pb-3">
              <MyInp
                id="inp_name"
                type="text"
                label="名前"
                {...register('name', { required: true })}
              />
              {errors.name && <div>入力が必須の項目です</div>}
            </div>
            <div className="pb-3">
              <MyInp
                id="inp_form"
                type="text"
                label="フォーム名"
                {...register('form')}
              />
            </div>
            <div className="pb-3">
              <MyInp
                id="inp_evolutions"
                type="text"
                label="進化先（図鑑番号）"
                note="複数ある場合はカンマで区切る"
                {...register('evolutions')}
              />
            </div>
            <div className="pb-3">
              <MyCheckbox
                id="inp_is_mega_evolution"
                label="メガシンカの姿"
                {...register('isMegaEvolution')}
              />
            </div>
          </div>
          <div className="pb-2 w-4/12">
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
              {errors.type1 && <div>1つ以上選択してください</div>}
            </div>
            <div className="pb-3 w-full">
              <MyInp
                id="inp_abilities"
                type="text"
                label="特性"
                note="複数ある場合はカンマで区切る"
                {...register('abilities')}
              />
            </div>
            <div className="pb-3 w-full">
              <MyInp
                id="inp_hidden_abilities"
                type="text"
                label="夢特性"
                note="複数ある場合はカンマで区切る"
                {...register('hiddenAbilities')}
              />
            </div>
          </div>
          <div className="pb-2 w-1/12">
            <h3>種族値</h3>
            <div>
              <MyInp
                id="inp_save_hp"
                type="number"
                label="HP"
                {...register('stats.hp', { required: true })}
              />
              {errors.stats?.hp && <div>入力が必須の項目です</div>}
            </div>
            <div>
              <MyInp
                id="inp_save_attack"
                type="number"
                label="こうげき"
                {...register('stats.attack', { required: true })}
              />
              {errors.stats?.attack && <div>入力が必須の項目です</div>}
            </div>
            <div>
              <MyInp
                id="inp_save_defence"
                type="number"
                label="ぼうぎょ"
                {...register('stats.defence', { required: true })}
              />
              {errors.stats?.defence && <div>入力が必須の項目です</div>}
            </div>
            <div>
              <MyInp
                id="inp_save_spAttack"
                type="number"
                label="とくこう"
                {...register('stats.spAttack', { required: true })}
              />
              {errors.stats?.spAttack && <div>入力が必須の項目です</div>}
            </div>
            <div>
              <MyInp
                id="inp_save_spDefence"
                type="number"
                label="とくぼう"
                {...register('stats.spDefence', { required: true })}
              />
              {errors.stats?.spDefence && <div>入力が必須の項目です</div>}
            </div>
            <div>
              <MyInp
                id="inp_save_speed"
                type="number"
                label="すばやさ"
                {...register('stats.speed', { required: true })}
              />
              {errors.stats?.speed && <div>入力が必須の項目です</div>}
            </div>
          </div>
        </div>
        <MyButton>登録</MyButton>
      </form>
    </section>
  )
}

export default SavePokedex
