import { DataGrid } from '@mui/x-data-grid';

import { useWebSocket } from '../providers/socketProvider';
import { columns } from '../utils';

const TableView = () => {
    const { orders, isConnected } = useWebSocket();

    return (
        <DataGrid
            loading={isConnected && orders.length !== 500 ? true : false}
            density='compact'
            localeText={{ noRowsLabel: 'Data not found, Enable Socket Connection' }}
            disableColumnResize
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnFilter
            initialState={{
                pagination: { paginationModel: { pageSize: 25 } },
            }}
            rows={orders}
            columns={columns}
            pagination
        />
    )
}

export const MonitorsList = () => {
    return <TableView />
};
