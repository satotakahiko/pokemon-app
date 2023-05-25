import React, { useEffect, useState } from 'react'
import MyButton from '../../Components/MyButton'
import MySelect from '../../Components/MySelect'
import {
  getParams,
  getTimesResult,
  convertToTypeJa,
} from '../../Utils/typeList'

const typeJaAll = getParams('typeJa')
const typeAll = getParams('type')

type Times = 0 | 0.25 | 0.5 | 1 | 2 | 4
type TimesForSelectVal = '0' | '11' | '12' | '14' | '05' | '025'

type Answer = {
  normal: TimesForSelectVal
  fire: TimesForSelectVal
  water: TimesForSelectVal
  grass: TimesForSelectVal
  electric: TimesForSelectVal
  ice: TimesForSelectVal
  fighting: TimesForSelectVal
  poison: TimesForSelectVal
  ground: TimesForSelectVal
  flying: TimesForSelectVal
  psychic: TimesForSelectVal
  bug: TimesForSelectVal
  rock: TimesForSelectVal
  ghost: TimesForSelectVal
  dragon: TimesForSelectVal
  dark: TimesForSelectVal
  steel: TimesForSelectVal
  fairy: TimesForSelectVal
}

type CorrectItems = {
  type: keyof Answer
  times: Times
}

type Correct = Array<CorrectItems>

// 0 ~ 17 のランダムな整数を生成
const getRandomInteger = (min = 0, max = 17) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

// 異なる２つの整数を配列で取得
const getNumber = () => {
  const number1 = getRandomInteger()
  const number2 = () => {
    const ret = getRandomInteger(0, 18)
    return ret === number1 ? 18 : ret
  }
  return [number1, number2()]
}

// selectのvalを倍数に変換
const convertToTimes = (val: TimesForSelectVal) => {
  let ret: Times = 1

  switch (val) {
    case '0':
      ret = 0
      break

    case '025':
      ret = 0.25
      break

    case '05':
      ret = 0.5
      break

    case '12':
      ret = 2
      break

    case '14':
      ret = 4
      break
  }

  return ret
}

const TypesSelect = ({
  answer,
  setAnswer,
}: {
  answer: Answer
  setAnswer: React.Dispatch<React.SetStateAction<Answer>>
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: keyof Answer,
  ) => {
    setAnswer({
      ...answer,
      [type]: e.target.value,
    })
  }
  return (
    <dl className="grid grid-cols-6 gap-3 mb-6">
      {typeAll.map((type, i) => {
        return (
          <div key={type}>
            <dt className="pb-1 text-sm">{typeJaAll[i]}</dt>
            <dd>
              <MySelect
                value={answer[type as keyof typeof answer]}
                onChange={(e) => handleChange(e, type)}
              >
                <option value="11">等倍</option>
                <option value="14">4倍</option>
                <option value="12">2倍</option>
                <option value="05">0.5倍</option>
                <option value="025">0.25倍</option>
                <option value="0">無効</option>
              </MySelect>
            </dd>
          </div>
        )
      })}
    </dl>
  )
}

const QuizCompatibility = () => {
  const number = getNumber()
  const defaultValues: Answer = {
    normal: '11',
    fire: '11',
    water: '11',
    grass: '11',
    electric: '11',
    ice: '11',
    fighting: '11',
    poison: '11',
    ground: '11',
    flying: '11',
    psychic: '11',
    bug: '11',
    rock: '11',
    ghost: '11',
    dragon: '11',
    dark: '11',
    steel: '11',
    fairy: '11',
  }

  const [questionType1, setQuestionType1] = useState(typeAll[number[0]]) // 出題タイプ
  const [questionType2, setQuestionType2] = useState(
    typeAll.concat([''])[number[1]],
  )
  const [answer, setAnswer] = useState<Answer>(defaultValues) // ユーザの解答
  const [isCorrect, setIsCorrect] = useState(false) // 解答結果
  const [isShow, setIsShow] = useState(false) // 解答結果の表示
  const [correct, setCorrect] = useState<Correct>([] as Correct) // 答え
  const [isShowCorrect, setIsShowCorrect] = useState(false) // 答えの表示

  const handleClick = () => {
    // 正解したtypeの配列
    const correctAnswerList = typeAll.filter((type) => {
      const userAnswer = convertToTimes(answer[type as keyof typeof answer])
      const correctAnswer = getTimesResult(type, questionType1, questionType2)

      return userAnswer === correctAnswer
    })

    setIsCorrect(correctAnswerList.length === typeAll.length)
    setIsShow(true)
  }

  const handleReset = () => {
    const number = getNumber()
    setQuestionType1(typeAll[number[0]])
    setQuestionType2(typeAll.concat([''])[number[1]])
    setIsCorrect(false)
    setIsShowCorrect(false)
    setIsShow(false)
    setAnswer(defaultValues)
  }

  const handleShowCorrect = () => {
    setCorrect(
      typeAll.map((type) => {
        return {
          type: type as keyof Answer,
          times: getTimesResult(type, questionType1, questionType2) as Times,
        }
      }),
    )
    setIsShowCorrect(true)
  }

  return (
    <section>
      <h2 className="title">タイプ相性当て</h2>
      <p className="mb-4">
        <span className="text-lg pr-4">{convertToTypeJa(questionType1)}</span>
        {questionType2 && (
          <span className="text-lg pr-2">{convertToTypeJa(questionType2)}</span>
        )}
        のタイプ相性
      </p>
      <TypesSelect answer={answer} setAnswer={setAnswer} />
      <div className="flex gap-8">
        <MyButton classNames="px-6" handleClick={handleClick}>
          解答
        </MyButton>
        <MyButton classNames="px-6" handleClick={handleReset}>
          更新
        </MyButton>
        <MyButton classNames="px-6" handleClick={handleShowCorrect}>
          答え
        </MyButton>
      </div>
      <div className="text-lg mt-6 border border-solid border-gray-400 rounded-md p-8">
        <p>{isShow && (isCorrect ? '正解' : '不正解')}</p>
        <div className="flex flex-wrap gap-5">
          {isShowCorrect &&
            correct.map((items) => {
              return (
                <p key={items.type}>
                  {convertToTypeJa(items.type)}：{items.times}倍
                </p>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default QuizCompatibility
