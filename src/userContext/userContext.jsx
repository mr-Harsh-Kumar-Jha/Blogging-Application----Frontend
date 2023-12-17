import React, { useReducer, createContext } from "react";

export const UserContext = createContext({});

const reducer = (state, action) => {

   switch (action.type) {
      case 'signin':
         localStorage.removeItem('recentBrowse');
         return action.payload ;
      case 'signout':
         localStorage.removeItem('userDetails');
         return {user:null};
   }
}

const Provider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, {user:null});

   // const data = localStorage.getItem("userDetails");
   // state.user = JSON.parse(data);
   return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

export default Provider;