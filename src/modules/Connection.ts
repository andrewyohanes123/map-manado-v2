import axios from 'axios'
import { Snapshot } from '../components/Snapshots';

export interface AxiosResponse {
    data: {
        data: {
            count: number;
            rows: Snapshot[]
        }
    }
}

export const Connection = axios.create({
    baseURL: 'http://10.71.71.216:1234/'
});