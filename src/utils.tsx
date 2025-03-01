import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

export const columns: GridColDef[] = [
    {
        field: 'symbol',
        flex: 1,
        headerName: 'Symbol',
        width: 150,
    },
    {
        field: 'side',
        flex: 1,
        headerName: 'Side',
        width: 150,
        renderCell: (params) => {
            const isBuy = params.value === 'Buy';
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        style={{
                            color: isBuy ? 'green' : 'red',
                        }}
                    >
                        {isBuy ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                    <span style={{ marginLeft: 5 }}>{params.value}</span>
                </div>
            );
        },
    },
    {
        field: 'price',
        flex: 1,
        headerName: 'Price',
        width: 150,
    },
    {
        field: 'quantity',
        flex: 1,
        headerName: 'Quantity',
        width: 200,
    },
    {
        field: 'total',
        flex: 1,
        headerName: 'Total',
        width: 200,
    },
    {
        field: 'time',
        flex: 1,
        headerName: 'Time',
        width: 200,
    }
];

export const alertColumns: GridColDef[] = [
    {
        field: 'rule',
        flex: 1,
        headerName: 'Alert Message',
        width: 250,
    },
    {
        field: 'price',
        flex: 1,
        headerName: 'Price',
        width: 150,
    },
    {
        field: 'quantity',
        flex: 1,
        headerName: 'Quantity',
        width: 150,
    },
    {
        field: 'total',
        flex: 1,
        headerName: 'Total',
        width: 200,
    }
];
