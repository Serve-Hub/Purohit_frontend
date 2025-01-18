'use client';
import React, { createContext, useEffect, useState,} from 'react'
import axios from 'axios';

type AuthContextType = {
  // auth: boolean;
  // setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  // login: () => Promise<void>;
  // setLoginfo: React.Dispatch<React.SetStateAction<{ name: string; usertype: string; email: string }>>;
  // loginfo: { name: string; usertype: string; email: string };
  token: string | null;
  
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
const [userInfo,setUserInfo]=useState({});

  useEffect(() => {
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
      const res = await axios.get(
        "https://purohit-backend.onrender.com/api/v1/users/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data returned from the context", res.data.data);
       setUserInfo(res.data.data)
      console.log("userinfo is",userInfo)
      return res.data.data; // Ensure this data is returned

    } catch (error) {
      console.error("Error occurred in the getUser Context", error);
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