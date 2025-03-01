import { DataGrid } from '@mui/x-data-grid';

import { useWebSocket } from '../providers/socketProvider';
import { AlertRule } from '../types';
import { columns } from '../utils';

const TableView = () => {
    const { orders, isConnected } = useWebSocket();

    return (
        <DataGrid
            loading={isConnected && orders.length === 0 ? true : false}
            density="compact"
            localeText={{ noRowsLabel: 'Data not found, Enable Socket Connection' }}
            disableColumnResize
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnFilter
            initialState={{
                pagination: { paginationModel: { pageSize: 25 } },
            }}
            rows={orders}
            getRowClassName={(params) =>
                params.row.rule === AlertRule.BIG
                    ? 'alert-big'
                    : params.row.rule === AlertRule.CHEAP
                        ? 'alert-cheap'
                        : params.row.rule === AlertRule.SOLID
                            ? 'alert-solid'
                            : ''
            }
            columns={columns}
            pagination
        />
    );
};

export const MonitorsList = () => {
    return <TableView />;
};
