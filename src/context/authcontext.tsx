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

function authcontext({children}: { children: React.ReactNode }) {

  //   const [auth, setAuth]= useState<boolean>(false);
  // const [loginfo,setLoginfo]=useState<{ name: string; usertype: string; email: string }>({
  //                                 name:"",
  //                                 usertype:"",
  //                                 email:"",
  //                               //   uid:"",    
  //                               //   imagepath:"" ,                       
  // })


  const getpooja=async ()=>{

    console.log("after context getpooja function is hit");
    const token=localStorage.getItem("token_id");
    console.log(token);
    try {
      const res = await axios.get(
        "https://purohit-backend.onrender.com/api/v1/users/getPujas",
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      .then((res)=>{
        console.log("data returned from the context",res.data.data);
        return res.data.data
  
      })    
    } catch (error) {
      console.log("error occured in the getPooja Context",error)
      return 0;
    }
}


const token=localStorage.getItem("token_id");
const context={token,getpooja}//login,setLoginfo,loginfo,

  



//   const login= async ()=>{

//     console.log("after contextfunction is hit");
//     const token=localStorage.getItem("token_id");
//     console.log(token);
//     const res = await axios.get(
//       "https://purohit-backend.onrender.com/api/v1/users/getCurrentUser",
//       {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       }
//     )
//     .then((res)=>{
//       console.log(res.data);
//       const na=res.data.imagepath;
//       console.log(na);
//       setLoginfo({
//         name:res.data.username,
//         usertype:res.data.usertype,
//         email:res.data.email,
//         // uid:res.data.uid,
//         // imagepath:na,
//       }
//       )
//       console.log(loginfo);
//     })    
// }

  return (
     
      <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default authcontext