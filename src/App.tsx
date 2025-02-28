import {
    Admin,
    Resource,
} from 'react-admin';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { ToastContainer } from 'react-toastify';

import { WebSocketProvider } from './providers/socketProvider';
import { MonitorsList } from './resources/monitorsList';
import { Layout } from './Layout';
import { AlertsList } from './resources/alertsList';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'

export const App = () => (
    <div>
        <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            theme='light'
        />
        <WebSocketProvider>
            <Admin disableTelemetry layout={Layout}>
                <Resource
                    icon={DataThresholdingIcon}
                    name='monitors'
                    list={MonitorsList}
                />
                <Resource
                    icon={NewReleasesIcon}
                    name='alerts'
                    list={AlertsList}
                />
            </Admin>
        </WebSocketProvider>
    </div>
);
