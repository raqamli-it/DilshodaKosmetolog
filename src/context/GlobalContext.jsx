// import { createContext, useState } from "react";
// export const GlobalContext = createContext();

// export function GlobalContextProvider({ children }) {
//   const [theme, setTheme] = useState("lgiht")
//   const toggleTheme = (e) => {
//     setTheme((prevTheme) => (prevTheme == "light" ? "dark" : "light"));
//     console.log(e);

//   }



//   return (
//     <GlobalContext.Provider value={{ theme, toggleTheme }} >{children}</GlobalContext.Provider>
//   )
// }

import React, { createContext, useState } from "react";





export const GlobalContext = createContext();
import { useReducer } from "react";
const changeState = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "READY_ST":
      return {
        ...state,
        alReady: true,
      };


    default: return state;
  }

}

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: null,
    alReady: false,

  })
  const [theme, setTheme] = useState("light");
  const [themeSd, setThemeSd] = useState("Mijozlar");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSidebarMenu = (e) => {
    setThemeSd(e);
  };


  return (
    <GlobalContext.Provider value={{ theme, toggleTheme, themeSd, toggleSidebarMenu, ...state, dispatch, }}>
      {children}
    </GlobalContext.Provider>
  );
}
