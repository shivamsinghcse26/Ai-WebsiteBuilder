import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import axios from 'axios'

const useGetCurrentUser = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/me`,
          { withCredentials: true }
        )
        if (response.data) {
          dispatch(setUserData(response.data))
        }
      } catch (error) {
        console.log('Failed to fetch current user:', error)
        dispatch(setUserData(null))
      }
    }

    getCurrentUser()
  }, [dispatch])
}

export default useGetCurrentUser
