import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

export const columns: GridColDef[] = [
    {
        field: 'symbol',
        headerName: 'Symbol',
        width: 150,
        filterable: true
    },
    {
        field: 'side',
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
        headerName: 'Price',
        width: 150,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 200,
    },
    {
        field: 'time',
        headerName: 'Time',
        width: 200,
    }
];

export const alertColumns: GridColDef[] = [
    {
        field: 'rule',
        headerName: 'Alert Message',
        width: 250,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 150,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 150,
    },
];
