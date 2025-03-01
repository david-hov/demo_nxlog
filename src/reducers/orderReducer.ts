import { v4 as uuidv4 } from 'uuid';

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

type OrdersState = {
    orders: Order[],
    alerts: Alert[]
};

type OrdersAction =
    | { type: 'ADD_ORDER'; order: any }
    | { type: 'RESET_ORDER' }
    | { type: 'FINISHED' }

const getTriggeredAlerts = (order: Order) => {
    if (order.price < 50000) order.rule = AlertRule.CHEAP;
    if (order.quantity > 10) order.rule = AlertRule.SOLID;
    if (parseInt(order.total) > 1000000) order.rule = AlertRule.BIG;
    return order
};

export const ordersReducer = (state: OrdersState, action: OrdersAction): OrdersState => {
    switch (action.type) {
        case 'ADD_ORDER':
            const formattedOrder = {
                id: uuidv4(),
                symbol: `${action.order.FSYM}/${action.order.TSYM}`,
                side: action.order.SIDE === 0 ? 'Buy' : 'Sell',
                price: action.order.P.toFixed(2),
                quantity: action.order.Q.toFixed(2),
                total: (action.order.Q * action.order.P).toFixed(2),
                time: new Date(action.order.REPORTEDNS / 1000000).toLocaleTimeString(),
            };
            const alertedOrder = getTriggeredAlerts(formattedOrder);
            const updatedOrders = [alertedOrder, ...state.orders];
            const limitedOrders = updatedOrders.length > 500 ? updatedOrders.slice(0, 500) : updatedOrders;
            let newAlerts = [...state.alerts];
            if (alertedOrder.rule) {
                const alertTime = action.order.REPORTEDNS / 1000000;
                if (Date.now() - alertTime <= 60000) {
                    newAlerts = [alertedOrder, ...state.alerts];
                }
            }
            return { ...state, alerts: newAlerts, orders: limitedOrders }
        case 'RESET_ORDER':
            return { ...state, orders: [] }
        default:
            return state;
    }
};

