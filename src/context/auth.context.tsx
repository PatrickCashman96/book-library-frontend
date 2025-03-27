import { useState, useEffect, createContext, ReactNode } from "react";
import authService from "../services/auth.service";

interface User{ 
  _id:string;
  email:string;
  username:string;
}

interface AuthContextType{
  isLoggedin: boolean; 
  isLoading: boolean;
  user: User | null;
  storeToken: (token:string) => void;
  authenticateUser: ()=> Promise<void>;
  logOutUser: ()=> void;
}

const AuthContext  = createContext<AuthContextType>({
  isLoggedin: false,
  isLoading: true,
  user: null,
  storeToken: ()=>{},
  authenticateUser: async ()=>{},
  logOutUser: ()=>{},
});

function AuthProviderWrapper({children}: {children: ReactNode}){
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [isLoading,setIsLoading] = useState<boolean>(true);
  const [user, SetUser] = useState<User | null>(null);

  const storeToken = (token: string)=>{
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async ()=>{
    const storedToken = localStorage.getItem("authToken");

    if(storedToken){
      try {
        const response = await authService.verify();
        const decoded = response.data.decoded;

        const user = {
          _id: String(decoded.userId),
          email: "", // Email not in token, leave blank or add to token later
          username: decoded.username,
        };

        setIsLoggedin(true);
        SetUser(user);
      } catch (error) {
        console.error("Invalid Token", error);
        setIsLoggedin(false);
        SetUser(null);
      }
    }else{
      console.log("No stored token found.");
      setIsLoggedin(false);
      SetUser(null);
    }
    setIsLoading(false);
  };

  const removeToken = () =>{
    localStorage.removeItem("authToken");
  };

  const logOutUser = () =>{
    removeToken();
    authenticateUser();
  };

  useEffect(()=>{
    authenticateUser();
  },[]);

  return(
    <AuthContext.Provider 
      value={{
        isLoading,
        isLoggedin,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export{ AuthProviderWrapper, AuthContext};