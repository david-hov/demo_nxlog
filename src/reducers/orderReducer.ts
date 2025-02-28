export type Order = {
    id: number;
    symbol: string;
    side: string;
    price: number;
    quantity: number;
    time: string;
};

export enum AlertRule {
    ALL = 'All',
    CHEAP = 'Cheap order',
    SOLID = 'Solid order',
    BIG = 'Big biznis here'
}

export type Alert = {
    id: number;
    rule: AlertRule;
    symbol: string;
    price: number;
    quantity: number;
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

const getTriggeredAlerts = (order: Order, alerts: Alert[]): Alert[] => {
    const currentState = [...alerts];
    if (order.price < 50000) currentState.push({...order, rule: AlertRule.CHEAP});
    if (order.quantity > 10) currentState.push({...order, rule: AlertRule.SOLID});
    if (order.price > 1000000) currentState.push({...order, rule: AlertRule.BIG});
    return currentState
};

export const ordersReducer = (state: OrdersState, action: OrdersAction): OrdersState => {
    switch (action.type) {
        case 'ADD_ORDER':
            const formattedOrder = {
                id: state.orders.length,
                symbol: `${action.order.FSYM}/${action.order.TSYM}`,
                side: action.order.SIDE === 0 ? 'Buy' : 'Sell',
                price: action.order.P,
                quantity: action.order.Q,
                time: new Date(action.order.REPORTEDNS / 1000000).toLocaleTimeString(),
            };
            const updatedOrders = [formattedOrder, ...state.orders];
            const newAlerts = getTriggeredAlerts(formattedOrder, state.alerts);
            const result = updatedOrders.length > 500 ? state.orders : updatedOrders;
            return { ...state, alerts: newAlerts, orders: result }
        case 'RESET_ORDER':
            return { ...state, orders: [] }
        default:
            return state;
    }
};
