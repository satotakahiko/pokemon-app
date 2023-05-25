import typeListJson from './typeList.json'

export type Type = {
  type1: string
  type2: string
}

export type Pokemon = {
  pokemon1: Type
  pokemon2: Type
  pokemon3: Type
  pokemon4: Type
  pokemon5: Type
  pokemon6: Type
}

// type Types =
//   "normal"
//   | "fire"
//   | "water"
//   | "grass"
//   | "electric"
//   | "ice"
//   | "fighting"
//   | "poison"
//   | "ground"
//   | "flying"
//   | "psychic"
//   | "bug"
//   | "rock"
//   | "ghost"
//   | "dragon"
//   | "dark"
//   | "steel"
//   | "fairy"

export const times = typeListJson.times
export const typeList = typeListJson.types

export const getParams = (name: string) => {
  return typeList.map((items) => {
    return items[name as keyof typeof items] as any
  })
}

// タイプ名称取得 英語 → 日本語
export const convertToTypeJa = (needle: string) => {
  return typeList.find(items => {
    return items.type === needle
  })?.typeJa
}

// タイプ名称取得 日本語 → 英語
export const convertToTypeEn = (needle: string) => {
  return typeList.find(items => {
    return items.typeJa === needle
  })?.type
}

// タイプ名称取得 英語 → 漢字
export const convertToTypeKanji = (needle: string) => {
  return typeList.find(items => {
    return items.type === needle
  })?.typeKanji
}

export const getSymbol = (name: keyof typeof times) => {
  let symbol = ''

  switch (name) {
    case 'effective':
      symbol = '○'
      break

    case 'notEffective':
      symbol = '△'
      break

    case 'notAffect':
      symbol = '×'
      break
  }

  return symbol
}

// 防御側 倍率に応じた記号の取得
export const getSymbolForDefense = (times: number) => {
  let symbol = ""
  switch (times) {
    case 4:
      symbol = "✕"
      break

    case 2:
      symbol = "△"
      break

    case 0.5:
      symbol = "○"
      break

    case 0.25:
      symbol = "◎"
      break

    case 0:
      symbol = "☆"
      break
  }

  return symbol
}

// const convertTimes = (effectName: keyof typeof times) => {
//   return times[effectName]
// }

// const getTimesForDefense = (typeName: Types) => {
//   const targetType = typeList.find(items => {
//     return items.type === typeName
//   })

//   if(targetType === undefined) {
//     throw new Error()
//   }

//   return getParams("type").map((type: Types) => {
//     const { defense } = targetType
//     let timesRet: 0 | 0.5 | 1 | 2 = 1

//     if(type in defense.effective) {
//       timesRet = 2
//     } else
//     if(type in defense.notEffective) {
//       timesRet = 0.5
//     } else
//     if(type in defense.notAffect) {
//       timesRet = 0
//     }

//     return {
//       type,
//       times: timesRet
//     }
//   })
// }

// type GetTimesListReturn = {
//   type: Types,
//   times: number
// }

// export const getTimesListForDefense = (
//   defenseType1: Types,
//   defenseType2: Types | "" = ""
// ): Array<GetTimesListReturn> | null => {
//   // // 倍率を調べるタイプ
//   // const defenseTypes = [defenseType1]
//   // defenseType2 !== "" && defenseTypes.push(defenseType2)

//   // // 倍率を調べるタイプの配列を取得
//   // // 単タイプの倍率を取得
//   // const typeListItems = typeList.filter((items) => {
//   //   return items.type in defenseTypes
//   // }).map(filterItems => {
//   //   return getTimesForDefense(filterItems.type as Types)
//   // })

//   // let timesRet = typeListItems[0]
//   // if(typeListItems.length === 2) {
//   //   timesRet.forEach(items => {

//   //   })
//   // }

//   return getParams("type").map((type: Types) => {
//     return {
//       type,
//       times: getTimesResult(type, defenseType1, defenseType2)
//     }
//   })
// }

// 倍率の取得
export const getTimesResult = (
  attackType: string,
  defenseType1: string,
  defenseType2: string,
) => {
  // 防御側タイプの配列を取得
  const filterType = typeList.filter((items) => {
    const { type } = items
    return type === defenseType1 || type === defenseType2
  })

  return filterType.reduce((acc, items) => {
    const { defense } = items
    const timesKey = (Object.keys(defense) as (keyof typeof defense)[]).find(
      (key) => {
        return defense[key].some((typeName: string) => {
          return typeName === attackType
        })
      },
    )

    return acc * (timesKey === undefined ? 1 : times[timesKey])
  }, 1)
}

export const getTimesResultForParty = (pokemonType: Pokemon): (string | undefined)[] => {
  const defense = typeList.map(items => {
    return { type: items.type, defense: items.defense }
  });

  // 耐性
  let beforeResistance: Array<string> = [];
  // 弱点
  let beforeWeakness: Array<string> = [];
  (Object.keys(pokemonType) as (keyof Pokemon)[]).forEach(key => {
    const { type1, type2 } = pokemonType[key]
    defense.filter(data => {
      return data.type === type1 || data.type === type2
    }).forEach(filterData => {
      console.log("filterData", filterData)
      const { effective, notEffective, notAffect } = filterData.defense
      // 耐性の追加
      beforeResistance = beforeResistance.concat(notEffective.concat(notAffect))

      // 弱点の追加
      beforeWeakness = beforeWeakness.concat(effective)
    })
  })

  // 耐性の重複削除
  const afterResistance = [...new Set(beforeResistance)]
  // 弱点の重複削除
  const afterWeakness = [...new Set(beforeWeakness)]

  // 等倍以上でしか耐えられないタイプ
  const result = afterWeakness.filter(weaknessType => {
    return !afterResistance.includes(weaknessType)
  })

  // typeJa を返す
  return result.map(type => {
    return typeList.find(items => items.type === type)?.typeJa
  })
}
