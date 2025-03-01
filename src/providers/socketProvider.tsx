import React, { createContext, useContext, useReducer, useRef, useState } from 'react';

import { ordersReducer } from '../reducers/orderReducer';
import { Order, WebSocketContextType } from '../types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL + '?api_key=' + import.meta.env.VITE_SOCKET_KEY;

const WebSocketContext = createContext<WebSocketContextType>({
    socket: null,
    isConnected: false,
    startConnection: () => { },
    stopConnection: () => { },
    orders: [],
    alerts: [],
});

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [state, dispatch] = useReducer(ordersReducer, { orders: [], alerts: [] });
    const orderQueueRef = useRef<Order[]>([]);
    const delayRef = useRef<NodeJS.Timeout | null>(null);

    const startDelayedDispatch = () => {
        delayRef.current = setInterval(() => {
            if (orderQueueRef.current.length > 0) {
                const itemsToDispatch = orderQueueRef.current.splice(0, orderQueueRef.current.length);
                for (const item of itemsToDispatch) {
                    dispatch({ type: 'ADD_ORDER', order: item });
                }
            }
        }, 2000);
    };


    const startConnection = () => {
        if (!socketRef.current) {
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
                    orderQueueRef.current.push(data);
                    if (!delayRef.current) {
                        startDelayedDispatch();
                    }
                }
            };

            newSocket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            newSocket.onclose = () => {
                console.log('WebSocket connection closed');
                setIsConnected(false);
            };

            socketRef.current = newSocket;
        }
    };

    const stopConnection = () => {
        if (socketRef.current) {
            socketRef.current.close();
            setIsConnected(false);
            socketRef.current = null;
        }
        if (delayRef.current) {
            clearInterval(delayRef.current);
            delayRef.current = null;
        }
    };

    return (
        <WebSocketContext.Provider value={{ socket: socketRef.current, stopConnection, alerts: state.alerts, orders: state.orders, isConnected, startConnection }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
