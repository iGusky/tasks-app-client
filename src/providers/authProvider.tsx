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
  token: string | null,
  setToken: (newToken: string) => void
}

const AuthContext = createContext<AuthContextType>({token: "", setToken: () => {}});

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [token, setToken_] = useState(localStorage.getItem("token"))

  const setToken = (newToken: string) => {
    setToken_(newToken)
  }

  useEffect(() => {
    if(token){
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      localStorage.setItem("token", token)
    } else {
      delete axios.defaults.headers.common["Authorization"]
      localStorage.removeItem("token")
    }
  }, [token])

  const contextValue = useMemo(() => ({
    token, setToken
  }), [token])

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