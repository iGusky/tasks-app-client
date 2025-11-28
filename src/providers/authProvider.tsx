import axios from "@/lib/axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { redirect, useNavigate } from "react-router";

type AuthContextType = {
  isAuth: boolean,
  checkingAuth: boolean
  setIsAuth: (newState: boolean) => void,
  checkAuth: () => void
  
}

const AuthContext = createContext<AuthContextType>({isAuth: false, checkingAuth: true, setIsAuth: () => {}, checkAuth: () => {}});

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isAuth, setIsAuth_] = useState(false)
  const [checkingAuth, setCheckinAuth] = useState(true)

  const setIsAuth = (newState: boolean) => {
    setIsAuth_(newState)
  }

  useEffect(() => {
    if(isAuth){
      localStorage.setItem("loggedIn", isAuth.toString())
    } else {
      localStorage.removeItem("loggedIn")
    }
  }, [isAuth])

  const checkAuth = async () => {
    setCheckinAuth(true)
    try {
      const res = await axios.get("/auth/status", {
       withCredentials: true
      })
      setIsAuth(res.data.data)
    } catch {
      setIsAuth(false)
    } finally {
       setCheckinAuth(false)
    }
  }

  const contextValue = useMemo(() => ({
    isAuth, setIsAuth, checkAuth, checkingAuth
  }), [isAuth])

  useEffect(() => {
    console.log("disparando checkAuth")
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider