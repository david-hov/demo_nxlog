export type Order = {
    id: string;
    rule?: AlertRule;
    symbol: string;
    side: string;
    price: number;
    quantity: number;
    total: string;
    time: string;
};

export interface CategorizedAlerts {
    cheap: Alert[];
    solid: Alert[];
    big: Alert[];
}

export interface WebSocketContextType {
    socket: WebSocket | null;
    isConnected: boolean;
    startConnection: () => void;
    stopConnection: () => void;
    orders: Order[],
    alerts: Alert[],
}

export enum AlertRule {
    ALL = 'All',
    CHEAP = 'Cheap order',
    SOLID = 'Solid order',
    BIG = 'Big biznis here'
}
export type Alert = {
    id: string;
    rule?: AlertRule;
    symbol: string;
    side: string;
    price: number;
    quantity: number;
    total: string;
    time: string;
};

export type OrdersState = {
    orders: Order[];
    alerts: Alert[];
};

export type OrdersAction =
    | { type: 'ADD_ORDER'; order: Order }
    | { type: 'RESET_ORDER' }
    | { type: 'FINISHED' };