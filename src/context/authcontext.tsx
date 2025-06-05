'use client';
import React, { createContext, useEffect, useState,} from 'react'
import axios from 'axios';
import $axios from '../lib/axios.instance';
import { updateSessionToken } from '@/utils/sessionHandler';


interface UserInfo {
  isPandit: boolean;
  name: string;
  email: string;
  avatar:string;
  coverPhoto:string;
  firstName:string;
  lastName:string;
  _id:string;
  bio?: string | undefined;

}
type AuthContextType = {

  token: string | null;
  userInfo?: UserInfo | null;  
  loginfo: () => Promise<UserInfo | null>;  // Added loginfo function in context
  
};
 export const AuthContext=createContext<AuthContextType | null>(null);
//  type AuthProviderProps = {
//   children: ReactNode;
// };

function AuthProvider({children}: { children: React.ReactNode }) {

  //   const [auth, setAuth]= useState<boolean>(false);
  // const [loginfo,setLoginfo]=useState<{ name: string; usertype: string; email: string }>({
  //                                 name:"",
  //                                 usertype:"",
  //                                 email:"",
  //                               //   uid:"",    
  //                               //   imagepath:"" ,                       
  // })
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // Fix typing

  useEffect(() => {
    updateSessionToken();
    const storedToken = localStorage.getItem('token_id');
    if (storedToken) {
      setToken(storedToken);
    }
    loginfo();
  }, []);

  const loginfo = async () => {
    console.log("after context loginfo function is hit");
    const token = localStorage.getItem("token_id");
    console.log("Token is:", token);
  
    try {
      const res = await $axios.get("/api/v1/users/getCurrentUser");

      console.log("data returned from the context", res.data.data);
       setUserInfo(res.data.data)
      console.log("userinfo is",userInfo)
      return res.data.data; // Ensure this data is returned

    } catch (error) {
      console.log("Error occurred in the getUser Context", error);
      return null; // Return null or an appropriate fallback value
    }
  };


// const token=localStorage.getItem("token_id");
const context={token,loginfo,userInfo}//login,setLoginfo,loginfo,

  return (
     
      <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider