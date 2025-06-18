import React, { useMemo } from "react";
import { useContext } from "react";
import { useState } from "react";

const SessionContext = React.createContext();

export const SessionProvider = (props) => {
    const [user, setUser] = useState(null);
    const returnValue = useMemo(() => {
        return {
            isLoggedIn: () => user !== null,
            setUser: setUser,
            user: user,
        }
    }, [user, setUser]);

    return (
        <SessionContext.Provider value={returnValue}>
            {props.children}
        </SessionContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => {
    return useContext(SessionContext);
}