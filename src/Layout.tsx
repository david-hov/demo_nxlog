import { Box, Button, Container } from '@mui/material';
import type { ReactNode } from 'react';
import { Layout as RALayout } from 'react-admin';
import { useWebSocket } from './providers/socketProvider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelIcon from '@mui/icons-material/Cancel';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export const Layout = ({ children }: { children: ReactNode }) => {
    const { startConnection, stopConnection, isConnected } = useWebSocket();

    return (
        <RALayout>
            <Container sx={{
                maxWidth: '1600px',
            }}>
                <Box margin='15px 0' display='flex' alignItems='center' justifyContent='flex-end' gap='25px'>
                    {isConnected ? <PowerSettingsNewIcon fontSize='large' color='success' /> : <PowerSettingsNewIcon fontSize='large' color='error' />}
                    <Button endIcon={<PlayArrowIcon />} variant='contained' color='info' onClick={startConnection} disabled={isConnected}>
                        Start
                    </Button>
                    <Button endIcon={<CancelIcon />} variant='contained' color='error' onClick={stopConnection} disabled={!isConnected}>
                        Stop
                    </Button>
                </Box>
                {children}
            </Container>
        </RALayout>
    )
};
