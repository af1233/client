const { createContext, useContext, useState } = require("react");

const context=createContext();

const ContenxtProvider=({children})=>{

    const [token, setToken]=useState(localStorage.getItem("token"));
    const [isloggedIn, setIsLoggedIn] = useState(!!token);

    const storeTokenToLS=(storeToken)=>{
       localStorage.setItem("token", storeToken) 
       setToken(storeToken);
       setIsLoggedIn(true);
    }
    const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update isloggedIn state after logout
  };
    return(
        <context.Provider value={{storeTokenToLS,token, LogoutUser,isloggedIn}}>
            {children}
        </context.Provider>
    )
}

const useAuth=()=>{
    const contextValue=useContext(context);
    return  contextValue;
}

export default useAuth;
export {ContenxtProvider};