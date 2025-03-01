import { Box } from '@mui/material';
import { useMemo } from 'react';

import { useWebSocket } from '../providers/socketProvider';
import { AlertRule, CategorizedAlerts } from '../types';
import { AccordionTable } from './components/accordion';

const AlertsView = () => {
    const { alerts } = useWebSocket();

    const categorizedAlerts = useMemo<CategorizedAlerts>(() => {
        return alerts.reduce<CategorizedAlerts>(
            (acc, alert) => {
                if (alert.rule === AlertRule.CHEAP) acc.cheap.push(alert);
                if (alert.rule === AlertRule.SOLID) acc.solid.push(alert);
                if (alert.rule === AlertRule.BIG) acc.big.push(alert);
                return acc;
            },
            { cheap: [], solid: [], big: [] }
        );
    }, [alerts]);

    return (
        <Box>
            <AccordionTable type="Cheap orders" data={categorizedAlerts.cheap} />
            <AccordionTable type="Solid orders" data={categorizedAlerts.solid} />
            <AccordionTable type="Big orders" data={categorizedAlerts.big} />
        </Box>
    );
};

export const AlertsList = () => {
    return <AlertsView />;
};
