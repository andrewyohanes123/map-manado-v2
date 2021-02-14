import { ReactElement, FC, useState, useEffect, useCallback } from 'react'
import { List } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Connection } from '../modules/Connection'
import { DistrictCard } from './DistrictCard'

export interface District {
    id: number;
    name: string;
    subdistricts: Subdistrict[];
}

export interface Subdistrict {
    id: number;
    name: string;
    neighbor: Neighbor[];
    district_id: number;
}

export interface Neighbor {
    id: number;
    name: string;
    subdistrict_id: number;
}

export const Regions: FC = (): ReactElement => {
    const [regions, setRegions] = useState<District[]>([]);
    const [loading, toggleLoading] = useState<boolean>(true);

    const getRegions = useCallback(() => {
        toggleLoading(true);
        Connection.get(`/apis/districts`).then((res) => {
            toggleLoading(false);
            setRegions((res.data.data as District[]));
        }).catch(e => {
            console.log(e)
        })
    }, []);

    useEffect(() => {
        getRegions();
    }, [getRegions])

    return (
        <div>
            <List loading={{ indicator: <LoadingOutlined spin />, size: 'large', tip: 'Mengakses data wilayah', spinning: loading }} dataSource={regions} renderItem={(district) => (
                <DistrictCard district={district} />
            )} rowKey={item => `${item.id}`} />
        </div>
    )
}
