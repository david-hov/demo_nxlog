import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { alertColumns } from '../../utils';

export const AccordionTable = React.memo(({ type, data }: any) => {
    return (
        <Accordion style={{ marginBottom: '15px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h6'>{type} - {data.length}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <DataGrid
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
                    rows={data}
                    columns={alertColumns}
                    pagination
                />
            </AccordionDetails>
        </Accordion>
    )
})
