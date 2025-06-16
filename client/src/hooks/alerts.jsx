import React, { useEffect } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useState } from "react";

const AlertContext = React.createContext();

// Needed so tailwind will compile the class names at build time
const alertColours = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error"
}

const Alert = ({data, dequeue}) => {
    useEffect(() => {
        // Doesn't quite hit my ideal "each alert is dequeued exactly 5 seconds after it is created"
        // but wow running timeouts in react components is hard
        // ...practically it won't really matter, will it?
        const timer = setTimeout(() => dequeue(), 5000);
        return () => clearTimeout(timer);
    }, [dequeue]);
    return (
        <div role="alert" className={`alert alert-soft ${alertColours[data?.status ?? "info"]}`}>
            <span>{data?.message ?? "Dummy alert"}</span>
        </div>
    )
};

export const AlertProvider = (props) => {
    const [alerts, setAlerts] = useState([]);
    const dequeueAlert = useCallback(() => {
        setAlerts(alerts.slice(1) ?? []);
    }, [alerts]);
    const enqueueAlert = useCallback((alert) => {
        setAlerts(alerts.concat(alert));
    }, [alerts]);

    return (
        <AlertContext.Provider value={enqueueAlert}>
            {props.children}
            <div className="toast toast-end">
                {alerts.map(a => <Alert data={a} dequeue={dequeueAlert} />)}
            </div>
        </AlertContext.Provider>
    )
}

// should be fine?
// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
    return useContext(AlertContext);
}