// import { createContext, useMemo,useContext } from "react";
// import io from "socket.io-client";



// const socketContext =createContext();

// const getSocket=()=>useContext(socketContext);

// const SocketProvider = ({ children }) => {
    

//     const socket=useMemo(()=>io("http://localhost:3002",
//         {withCredentials:true,
//     auth:{token:localStorage.getItem("token")}}),[]);
//     return (
//         <socketContext.Provider value={socket}>
//             {children}
//         </socketContext.Provider>
//     );
// }

// export {SocketProvider,getSocket};


import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";

// Create a context with a default value of null
const SocketContext = createContext(null);

// Custom hook to use the socket context
const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    // Memoize the socket connection
    const socket = useMemo(() => io("http://localhost:3002", {
        withCredentials: true,
        auth: {
            token: localStorage.getItem("token")
        }
    }), []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

// Export both SocketProvider and useSocket
export { useSocket };
