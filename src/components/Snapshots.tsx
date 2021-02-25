import { FC, ReactElement, useEffect, useCallback, useState, useContext } from 'react'
import { List, Drawer } from 'antd'
import { AxiosResponse, Connection } from '../modules/Connection'
import { ModalContext } from '../contexts/ModalSnapshotContext';
import { MapInstance } from '../contexts/MapInstanceContext';
import { SnapshotCard } from './Snapshot'

export interface SnapshotsProps {
    visible: boolean;
}

export interface Snapshot {
    [any: string]: any;
    name: string;
    id: number;
    visible: boolean;
    opacity: number;
    color: string;
}

const { REACT_APP_IP_ADDRESS, REACT_APP_PORT }: NodeJS.ProcessEnv = process.env;

// export interface MapboxEventWithFields extends mapboxgl.MapMouseEvent & {
//     features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
// } & mapboxgl.EventData 

export const Snapshots: FC = (): ReactElement => {
    const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
    const { open: visible, toggleModal } = useContext(ModalContext);
    const { map } = useContext(MapInstance);

    const getSnapshots = useCallback(() => {
        Connection.get('/apis/snapshots').then((resp: AxiosResponse) => {
            setSnapshots(resp.data.data.rows.map(data => ({ ...data, visible: false, opacity: 1 })));
        }).catch(e => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        if (typeof map !== 'undefined' && snapshots.length > 0) {
            snapshots.forEach((snapshot) => {
                if (typeof map.getLayer(`layer_${snapshot.name}`) === 'undefined') {
                    map.addSource(snapshot.name, {
                        'type': 'vector', 'tiles': [`${REACT_APP_IP_ADDRESS}:${REACT_APP_PORT}/map/snapshots/${snapshot.id}/shapes/?z={z}&x={x}&y={y}&layerName=${snapshot.name}`]
                    })
                    const layerType = typeConverter(snapshot.type);
                    map.addLayer(layerType === 'fill-extrusion' ? {
                        'id': `layer_${snapshot.name}`,
                        'type': layerType,
                        'source-layer': snapshot.name,
                        source: snapshot.name,
                        'paint': {
                            'fill-extrusion-color': snapshot.color,
                            'fill-extrusion-opacity': snapshot.opacity,
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'height']
                            ]
                        },
                        minzoom: 12.5,
                        layout: {
                            visibility: 'none'
                        }
                    } : {
                            'id': `layer_${snapshot.name}`,
                            'type': layerType,
                            'source-layer': snapshot.name,
                            source: snapshot.name,
                            'paint': {
                                'line-color': `${snapshot.color}`,
                                "line-opacity": snapshot.opacity,
                            },
                            minzoom: 13,
                            layout: {
                                visibility: 'none'
                            }
                        })
                }
                // else {
                //     map?.setLayoutProperty(`layer_${snapshot.name}`, 'visibility', visible ? 'none' : 'visible');
                //     typeof map !== 'undefined' && map.setPaintProperty(`layer_${snapshot.name}`, snapshot.type === 'LineString' ? 'line-color' : 'fill-color', snapshot.color);
                //     typeof map !== 'undefined' && map.setPaintProperty(`layer_${snapshot.name}`, snapshot.type === 'LineString' ? 'line-opacity' : 'fill-opacity', snapshot.opacity);
                // }
            })
            map.on('click', 'layer_Bangunan', (e) => {
                console.log(e.features![0].properties)
            })
        }
    }, [map, snapshots]);

    const typeConverter = (type: 'Polygon' | 'LineString'): 'fill-extrusion' | 'line' => {
        switch (type) {
            case 'Polygon':
                return 'fill-extrusion';
            case 'LineString':
                return 'line';
            default:
                return 'fill-extrusion'
        }
    }

    useEffect(() => {
        if (typeof map !== 'undefined') {
            getSnapshots();
        }
    }, [getSnapshots, map]);

    const toggleLayer = useCallback((name: string): void => {
        const visibility = map?.getLayoutProperty(`layer_${name}`, 'visibility')
        map?.setLayoutProperty(`layer_${name}`, 'visibility', visibility === 'visible' ? 'none' : 'visible');
        setSnapshots(snapshots => [...snapshots.map(snapshot => ({ ...snapshot, visible: snapshot.name === name ? !snapshot.visible : snapshot.visible }))]);
    }, [map]);

    const setOpacity = useCallback((val: number, name: string, type: string) => {
        typeof map !== 'undefined' && map.setPaintProperty(`layer_${name}`, type === 'LineString' ? 'line-opacity' : 'fill-extrusion-opacity', val);
        setSnapshots(snapshots => [...snapshots.map(snapshot => ({ ...snapshot, opacity: snapshot.name === name ? val : snapshot.opacity }))]);
    }, [map]);

    const changeColor = useCallback((val: string, name: string, type: string) => {
        typeof map !== 'undefined' && map.setPaintProperty(`layer_${name}`, type === 'LineString' ? 'line-color' : 'fill-extrusion-color', val);
        setSnapshots(snapshots => [...snapshots.map(snapshot => ({ ...snapshot, color: snapshot.name === name ? val : snapshot.color }))]);
    }, [map]);

    return (
        typeof map !== 'undefined' ?
            <Drawer maskClosable={false} mask={false}
                bodyStyle={{ padding: 8 }}
                width={350} onClose={toggleModal} footer={null} title="Basemap" visible={visible}>
                <List dataSource={snapshots}
                    renderItem={(item) => (
                        <>
                            <SnapshotCard snapshot={item} onChangeColor={changeColor} onChangeOpacity={setOpacity} toggleLayer={toggleLayer} />
                        </>
                    )}
                    rowKey={item => `${item.id}`}
                />
            </Drawer>
            :
            <></>
    )
}
