import axios from "@/lib/axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthContextType = {
  isAuth: boolean,
  setIsAuth: (newState: boolean) => void,
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType>({isAuth: false, setIsAuth: () => {}, checkAuth: () => {}});

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isAuth, setIsAuth_] = useState(false)

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
    try {
      const res = await axios.get("/auth/status", {
        withCredentials: true
      })
      console.log(res.data.data)
      setIsAuth(res.data.data)
    } catch {
      setIsAuth(false)
    }
  }

  const contextValue = useMemo(() => ({
    isAuth, setIsAuth, checkAuth
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