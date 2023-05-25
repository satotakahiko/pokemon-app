import { useState, useEffect, useContext } from "react"
import { User, onAuthStateChanged } from 'firebase/auth'
import { get, DatabaseReference, onChildChanged } from "firebase/database"
import { auth } from '../FirebaseConfig'
import { useDatabase } from "./useDatabase"
import { Pokemon } from "../Types/pokemon"
import { dataLengthContext } from "../Context/DataLengthContext"

const useFetchData = (ref: DatabaseReference) => {
  const { setDataLength } = useContext(dataLengthContext)
  const [data, setData] = useState<Pokemon>();
  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        get(ref)
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log('Successfully fetched data', snapshot.val())
              setData(snapshot.val())
              setDataLength(snapshot.size)

              onChildChanged(ref, function (data) {
                console.log(data);
              })
            } else {
              console.log('No data available')
            }
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        console.log('User is signed out')
      }
    })
  }, [ref, setDataLength])
  // データを返却する
  return { data }
}

// 実際に呼び出す際はこちらを使う
export const useFetchAllData = () => {
  const ref = useDatabase()

  return useFetchData(ref)
}