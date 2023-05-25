import React, { useState } from 'react'
import MySelect from '../../Components/MySelect'
import { typeList, getParams, getTimesResult } from '../../Utils/typeList'

// 0 ~ 17 のランダムな整数を生成
const getRandomInteger = () => {
  const min = 0
  const max = 17

  return Math.floor(Math.random() * (max + 1 - min)) + min
}

// ランダムなtypeを取得
const getRandomType = () => {
  const types = getParams('type')
  return types[getRandomInteger()]
}

const Checker = () => {
  const [attackType, setAttackType] = useState(getRandomType())
  const [defenseType1, setDefenseType1] = useState(getRandomType())
  const [defenseType2, setDefenseType2] = useState('')
  const [timesResult, setTimesResult] = useState(
    getTimesResult(attackType, defenseType1, defenseType2),
  )

  const handleChangeAttackType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setAttackType(value)
    setTimesResult(getTimesResult(value, defenseType1, defenseType2))
  }

  const handleChangeDefenseType1 = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e.target
    setDefenseType1(value)
    if (value === defenseType2) {
      setDefenseType2('')
      setTimesResult(getTimesResult(attackType, value, ''))
    } else {
      setTimesResult(getTimesResult(attackType, value, defenseType2))
    }
  }

  const handleChangeDefenseType2 = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e.target
    setDefenseType2(value)

    if (value === defenseType1) {
      setDefenseType1('')
      setTimesResult(getTimesResult(attackType, '', value))
    } else {
      setTimesResult(getTimesResult(attackType, defenseType1, value))
    }
  }

  const OptionElement = () => (
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
  )

  const CheckerResult = () => {
    const className = ['text-xl', 'pb-8', 'flex', 'gap-10']
    let text = ''
    switch (timesResult) {
      case 0:
        className.push('')
        text = 'こうかが　ない　みたいだ･･････'
        break

      case 0.25:
      case 0.5:
        className.push()
        text = 'こうかは　いまひとつの　ようだ'
        break

      case 1:
        className.push()
        break

      case 2:
      case 4:
        className.push()
        text = 'こうかは　ばつぐんだ！'
        break
    }

    return (
      <p className={className.join(' ')}>
        <span>× {timesResult}</span>
        {text && <span className="retro-text frame">{text}</span>}
      </p>
    )
  }

  return (
    <section>
      <h2 className="title">チェッカー</h2>
      <div className="flex gap-20 pb-6">
        <div>
          <p>攻撃</p>
          <MySelect
            name="attack-type"
            value={attackType}
            onChange={(e) => handleChangeAttackType(e)}
          >
            <OptionElement />
          </MySelect>
        </div>
        <div>
          <p>防御</p>
          <div className="flex gap-2">
            <MySelect
              name="defense-type1"
              value={defenseType1}
              onChange={(e) => handleChangeDefenseType1(e)}
            >
              <OptionElement />
              <option value=""></option>
            </MySelect>
            <MySelect
              name="defense-type2"
              value={defenseType2}
              onChange={(e) => handleChangeDefenseType2(e)}
            >
              <OptionElement />
              <option value=""></option>
            </MySelect>
          </div>
        </div>
      </div>
      <CheckerResult />
    </section>
  )
}

export default Checker
