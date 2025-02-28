import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';
import { Form, SelectInput } from 'react-admin';
import PaidIcon from '@mui/icons-material/Paid';

import { useWebSocket } from '../providers/socketProvider';
import { Alert, AlertRule } from '../reducers/orderReducer';
import { alertColumns } from '../utils';

const choices = [
    { id: 'CHEAP', 'name': 'Cheap order' },
    { id: 'SOLID', 'name': 'Solid order' },
    { id: 'BIG', 'name': 'Big order' },
];

const AlertsView = () => {
    const { alerts, isConnected } = useWebSocket();
    const [selectedRule, setSelectedRule] = useState<string>('ALL');

    const cheapAlerts = useMemo(() => {
        return alerts.filter((alert: Alert) => alert.rule === AlertRule.CHEAP).length;
    }, [alerts]);

    const solidAlerts = useMemo(() => {
        return alerts.filter((alert: Alert) => alert.rule === AlertRule.SOLID).length;
    }, [alerts]);

    const bigAlerts = useMemo(() => {
        return alerts.filter((alert: Alert) => alert.rule === AlertRule.BIG).length;
    }, [alerts]);

    const filteredAlerts = useMemo(() => {
        return selectedRule === 'ALL'
            ? alerts
            : alerts.filter((alert: Alert) => alert.rule === AlertRule[selectedRule as keyof typeof AlertRule]);
    }, [alerts, selectedRule]);

    const handleFilterChange = useCallback((event: any) => {
        setSelectedRule(event.target.value as AlertRule);
    }, []);

    return (
        <Box>
            <Box display='flex' gap='15px'>
                <Typography gap='10px' display='flex' alignItems='center' variant='h4'>
                    <PaidIcon titleAccess='Cheap' fontSize='large' color='error' /> - {cheapAlerts},
                </Typography>
                <Typography gap='10px' display='flex' alignItems='center' variant='h4'>
                    <PaidIcon titleAccess='Solid' fontSize='large' color='info' /> - {solidAlerts},
                </Typography>
                <Typography gap='10px' display='flex' alignItems='center' variant='h4'>
                    <PaidIcon titleAccess='Big' fontSize='large' color='success' /> - {bigAlerts}
                </Typography>
            </Box>
            <Form>
                <SelectInput
                    defaultValue='ALL'
                    source='rule'
                    choices={choices}
                    emptyText='All'
                    emptyValue='ALL'
                    onChange={handleFilterChange}
                />
            </Form>
            <DataGrid
                loading={isConnected && alerts.length !== 500 ? true : false}
                density='compact'
                localeText={{ noRowsLabel: 'Data not found, Enable Socket Connection' }}
                disableColumnResize
                disableRowSelectionOnClick
                disableColumnMenu
                disableMultipleRowSelection
                disableColumnFilter
                initialState={{
                    pagination: { paginationModel: { pageSize: 25 } },
                }}
                rows={filteredAlerts}
                columns={alertColumns}
                pagination
            />
        </Box>
    );
};

export const AlertsList = () => {
    return <AlertsView />
};
