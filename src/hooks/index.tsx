import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { API_URL } from '../config/api';

// Create a context for the provider
export const AuthContext = createContext<any>(null);

// Create the provider component
export const AuthProvider = ({ children }:any) => {
    // State to track the login status and user data
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const token=sessionStorage.getItem('token')

    useEffect(()=>{
        console.log(token)
        if(token){
    Sync()}
        else{
            setIsLoggedIn(false);
            setUserData(null)
        }

        
    }
    ,[isLoggedIn])
const Sync=async()=>{
    axios.get(API_URL+'sync',{
        headers:{
            Authorization:'Bearer '+token
        }
    }
).then(res=>{
    if(res.status===200){
        setIsLoggedIn(true);
        setUserData(res.data.user)
    }
    else{
        setIsLoggedIn(false);
        setUserData(null)
    }


}
).catch(err=>{
    setIsLoggedIn(false);
    setUserData(null)
})

}
    // Function to handle login
    const login = async(email: string, password: string) => {
      try {
        const res=await axios.post(API_URL+'login',{
            email,
            password
           });
           if(res.status==200){
            console.log(res.data)
                  setIsLoggedIn(true);
                  setUserData(res.data.userdata)
                  sessionStorage.setItem('token',res.data.userdata.token)
           }
           else{
                  setIsLoggedIn(false);
                  setUserData(null)
           }
      } catch (error) {
       return alert('Invalid credentials')
      }
       // Set the user data if available

    };

    // Function to handle logout
    const logout = () => {
        sessionStorage.removeItem('token')
        // Perform logout logic here
        // Set the isLoggedIn state to false
        setIsLoggedIn(false);
        // Clear the user data
        setUserData(null);
    };

    // Value object to be passed to the context provider
    const authContextValue = {
        isLoggedIn,
        userData,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};