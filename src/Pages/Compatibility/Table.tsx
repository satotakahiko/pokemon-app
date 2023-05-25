import React from 'react'
import { typeList, getSymbol, getParams } from '../../Utils/typeList'

const TableData = ({
  defense,
  type,
}: {
  defense: {
    effective: string[]
    notEffective: string[]
    notAffect: string[]
  }
  type: string
}) => {
  const timesType = (Object.keys(defense) as (keyof typeof defense)[]).find(
    (timesKey) => {
      return defense[timesKey].some((item) => {
        return item === type
      })
    },
  )

  return (
    <span className={type + '-cell'}>
      {timesType ? getSymbol(timesType) : ''}
    </span>
  )
}

const Table = () => {
  return (
    <section>
      <h2 className="title">早見表</h2>
      <p className="pb-4 text-sm">※縦：技タイプ　横：防御タイプ</p>
      <div className="my-table">
        <div className="column">
          <span></span>
          {getParams('typeKanji').map((typeKanji, i) => {
            return <span key={i}>{typeKanji}</span>
          })}
        </div>
        {typeList.map((items) => {
          const { typeKanji, defense } = items
          return (
            <div key={typeKanji} className="column">
              <span>{typeKanji}</span>
              {getParams('type').map((item, i) => {
                return <TableData key={i} defense={defense} type={item} />
              })}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Table
