import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { Alert, Order, ordersReducer } from '../reducers/orderReducer';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL + '?api_key=' + import.meta.env.VITE_SOCKET_KEY;

interface WebSocketContextType {
    socket: WebSocket | null;
    isConnected: boolean;
    startConnection: () => void;
    stopConnection: () => void;
    orders: Order[],
    alerts: Alert[],
    addOrder: (order: any) => void,
}

const WebSocketContext = createContext<WebSocketContextType>({
    socket: null,
    isConnected: false,
    startConnection: () => { },
    stopConnection: () => { },
    orders: [],
    alerts: [],
    addOrder: (_: Order) => { }
});

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [state, dispatch] = useReducer(ordersReducer, {orders: [], alerts: []});

    const startConnection = () => {
        if (!socket) {
            const newSocket = new WebSocket(SOCKET_URL);

            newSocket.onopen = () => {
                const subRequest = {
                    action: 'SubAdd',
                    subs: ['8~Binance~BTC~USDT'],
                };
                newSocket.send(JSON.stringify(subRequest));
                console.log('WebSocket connected');
                dispatch({ type: 'RESET_ORDER' });
                setIsConnected(true);
            };

            newSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.P && data.Q) {
                    dispatch({ type: 'ADD_ORDER', order: data });
                }
            };

            newSocket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            newSocket.onclose = () => {
                console.log('WebSocket connection closed');
                setIsConnected(false);
            };

            setSocket(newSocket);
        }
    };

    const stopConnection = () => {
        if (socket) {
            socket.close();
            setIsConnected(false);
            setSocket(null);
        }
    };

    useEffect(() => {
        if (isConnected && state.orders.length === 500) {
            toast.success('500 rows data fetched, Socket Connection Closed');
            stopConnection();
        }
    }, [isConnected, state.orders])

    const addOrder = (order: any) => {
        dispatch({ type: 'ADD_ORDER', order });
    };

    return (
        <WebSocketContext.Provider value={{ socket, addOrder, stopConnection, alerts: state.alerts, orders: state.orders, isConnected, startConnection }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
