import axios from 'axios'
import { Snapshot } from '../components/Snapshots';

const { REACT_APP_IP_ADDRESS, REACT_APP_PORT }: NodeJS.ProcessEnv = process.env;

export interface AxiosResponse {
    data: {
        data: {
            count: number;
            rows: Snapshot[]
        }
    }
}

export const Connection = axios.create({
    baseURL: `${REACT_APP_IP_ADDRESS}:${REACT_APP_PORT}`
});