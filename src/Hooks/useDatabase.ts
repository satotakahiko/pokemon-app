import { useMemo } from "react"
import { ref } from 'firebase/database'
import { database } from '../FirebaseConfig'

export const useDatabase = () => {
  return useMemo(() => ref(database), [])
}