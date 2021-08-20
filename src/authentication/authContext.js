import React from 'react';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { auth } from './setUpAuth';

const AuthContext = React.createContext();

//provide access to the context hook
export function useAuth() {
    return useContext(AuthContext);
}

//declare the provider
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            //don't load the app until the first state change
            setCurrentUser(user);
            setLoading(false);
        });
        //return unsubscribe;
        return () => {
            unsubscribe();
        };
    }, []);

    const value = {
        currentUser,
        signUp,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
