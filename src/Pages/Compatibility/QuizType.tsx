import { useState } from 'react'
import { pokedex } from '../../Utils/pokedex'
import { getParams } from '../../Utils/typeList'
import { typeList } from '../../Utils/typeList'
import MySelect from '../../Components/MySelect'
import MyButton from '../../Components/MyButton'

const types = getParams('type')

type Answer = keyof typeof types | ''

const getRandomInteger = () => {
  const min = 0
  const max = pokedex.length - 1

  return Math.floor(Math.random() * (max + 1 - min)) + min
}

const OptionElement = () => {
  const typesJp = getParams('typeJa')

  return types.map((type, i) => {
    return (
      <option key={type} value={type}>
        {typesJp[i]}
      </option>
    )
  })
}

const QuizType = () => {
  const [pokemon, setPokemon] = useState(pokedex[getRandomInteger()])
  const [answer1, setAnswer1] = useState<Answer>('')
  const [answer2, setAnswer2] = useState<Answer>('')
  const [result, setResult] = useState(false)
  const [isShow, setIsShow] = useState(false)

  const handleToAnswer = () => {
    const haystack = pokemon.types.map(
      (type) => typeList.find((item) => item.typeJa === type)?.type,
    )
    const needleType = [answer1, answer2].filter((type) => type !== '')

    setResult(
      JSON.stringify(haystack.sort()) === JSON.stringify(needleType.sort()),
    )
    setIsShow(true)
  }

  const handleReload = () => {
    setPokemon(pokedex[getRandomInteger()])
    setIsShow(false)
  }

  return (
    <section>
      <h2 className="title">タイプ当て</h2>
      <p className="text-lg mb-4">
        {pokemon.name}
        {pokemon.form ? `(${pokemon.form})` : ''}
      </p>
      <div className="mb-6 flex gap-4">
        <MySelect onChange={(e) => setAnswer1(e.target.value as Answer)}>
          <option value=""></option>
          {OptionElement()}
        </MySelect>
        <MySelect onChange={(e) => setAnswer2(e.target.value as Answer)}>
          <option value=""></option>
          {OptionElement()}
        </MySelect>
      </div>
      <div className="mb-6 flex gap-8">
        <MyButton classNames="px-6" handleClick={() => handleToAnswer()}>
          解答
        </MyButton>
        <MyButton classNames="px-6" handleClick={() => handleReload()}>
          更新
        </MyButton>
      </div>
      <div className="text-lg border border-solid border-gray-400 rounded-md p-8">
        {isShow ? (
          result ? (
            <p>正解</p>
          ) : (
            <>
              <p className="block">不正解</p>
              <p className="block text-sm pt-2">{pokemon.types.join(', ')}</p>
            </>
          )
        ) : (
          ''
        )}
      </div>
    </section>
  )
}

export default QuizType
