import { ReactElement, FC, useState, useEffect, useCallback, useContext, useMemo } from 'react'
import { List, Input, Divider } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { bbox, difference, polygon } from '@turf/turf'
import { Connection } from '../modules/Connection'
import { DistrictCard } from './DistrictCard'
import { FocusedRegion } from '../App'
import { MapInstance } from '../contexts/MapInstanceContext'

export interface District {
    id: number;
    name: string;
    subdistricts: Subdistrict[];
}

export interface Subdistrict {
    id: number;
    name: string;
    neighbors: Neighbor[];
    district_id: number;
}

export interface Neighbor {
    id: number;
    name: string;
    subdistrict_id: number;
    district_id: number;
}

export const Regions: FC = (): ReactElement => {
    const [regions, setRegions] = useState<District[]>([]);
    const [loading, toggleLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState('');
    const { data } = useContext(FocusedRegion);
    const { map } = useContext(MapInstance);

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
    }, [getRegions]);

    const focusRegion = useCallback(() => {
        if (typeof data !== 'undefined' && typeof map !== 'undefined') {
            // const line = multiLineString(data.geometry.coordinates);
            const boundingBox = bbox(data.geometry);
            // @ts-ignore
            map.fitBounds(boundingBox, { padding: 30 });
            const earthSource = map.getSource(`earth`);
            const earthLayer = map.getLayer(`earth`);

            if (typeof earthSource !== 'undefined' && typeof earthLayer !== 'undefined') {
                map.removeLayer(`earth`);
                map.removeSource(`earth`);
            }

            const diff = difference({
                type: 'Polygon',
                coordinates: [
                    [
                        // [
                        [-85.1054596961173, -180].reverse(),
                        [85.1054596961173, -180].reverse(),
                        [85.1054596961173, 180].reverse(),
                        [-85.1054596961173, 180].reverse(),
                        [-85.1054596961173, 0].reverse(),
                        // ]
                    ]
                ]
                // @ts-ignore
            }, data.geometry);
            map.addSource(`earth`, {
                type: 'geojson',
                // @ts-ignore
                data: diff
            });
            map.addLayer({
                id: `earth`,
                type: 'fill',
                source: `earth`,
                layout: {},
                paint: {
                    'fill-color': '#000',
                    'fill-opacity': 0.6
                }
            });
        }
    }, [data, map]);

    useEffect(() => {
        typeof data !== 'undefined' && focusRegion();
    }, [data, focusRegion]);

    const filteredRegions = useMemo(() => (
        regions.filter(district => (district.name.toLowerCase().match(filter.toLowerCase())))
    ), [regions, filter])

    return (
        <>
            <Input.Search onChange={e => setFilter(e.target.value)} value={filter} placeholder="Cari Kecamatan" />
            <Divider />
            <List loading={{ indicator: <LoadingOutlined spin />, size: 'large', tip: 'Mengakses data wilayah', spinning: loading }} dataSource={filteredRegions} renderItem={(district) => (
                <DistrictCard district={district} />
            )} rowKey={item => `${item.id}`} />
        </>
    )
}
