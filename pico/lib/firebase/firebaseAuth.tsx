// import React, { ReactNode, useEffect, useState } from "react";
// import { User } from '@firebase/auth';
// import { auth } from "./firebase";
// import { NextComponentType } from "next";

// export const AuthContext = React.createContext<User | null>(null);

// const AuthProvider:React.FC = (children:ReactNode) => {
//     const [user, setUser] = useState<User | null>(null);
  
//     useEffect(() => {
//       const subscribe = auth.onAuthStateChanged(fbUser => {
//         console.log(`구독 실행`, fbUser);
//         setUser(fbUser);
//       });
//       return subscribe;
//     }, []);
  
//     return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
//   };
  
//   export default AuthProvider;
