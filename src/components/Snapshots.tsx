import { FC, ReactElement, useEffect, useCallback, useState, useContext } from 'react'
import { List, Drawer, Card, Button, Slider } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { SketchPicker } from 'react-color'
import { AxiosResponse, Connection } from '../modules/Connection'
import { ModalContext } from '../contexts/ModalSnapshotContext';
import { MapInstance } from '../contexts/MapInstanceContext';
import { stringify } from 'querystring'

export interface SnapshotsProps {
    visible: boolean;
}

export interface Snapshot {
    [any: string]: any;
    name: string;
    id: number;
    visible: boolean;
    opacity: number;
}

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
                    console.log(snapshot)
                    map.addSource(snapshot.name, {
                        'type': 'vector', 'tiles': [`http://10.71.71.216:1234/map/snapshots/${snapshot.id}/shapes/?z={z}&x={x}&y={y}&layerName=${snapshot.name}`]
                    })
                    const layerType = typeConverter(snapshot.type);
                    map.addLayer(layerType === 'fill' ? {
                        'id': `layer_${snapshot.name}`,
                        'type': layerType,
                        'source-layer': snapshot.name,
                        source: snapshot.name,
                        'paint': {
                            'fill-color': snapshot.color,
                            'fill-opacity': snapshot.opacity
                        },
                        minzoom: 13,
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
                } else {
                    console.log(map.getLayer(`layer_${snapshot.name}`))
                }
            })
        }
    }, [map, snapshots]);

    const typeConverter = (type: 'Polygon' | 'LineString'): 'fill' | 'line' => {
        switch (type) {
            case 'Polygon':
                return 'fill';
            case 'LineString':
                return 'line';
            default:
                return 'fill'
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
        typeof map !== 'undefined' && map.setPaintProperty(`layer_${name}`, type === 'LineString' ? 'line-opacity' : 'fill-opacity', val);
        setSnapshots(snapshots => [...snapshots.map(snapshot => ({ ...snapshot, opacity: snapshot.name === name ? val : snapshot.opacity }))]);
    }, [map]);
    
    const changeColor = useCallback((val: string, name: string, type: string) => {
        typeof map !== 'undefined' && map.setPaintProperty(`layer_${name}`, type === 'LineString' ? 'line-color' : 'fill-color', val);
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
                            <Card size="small" title={item.name} style={{ marginBottom: 10 }} extra={[
                                <Button size="small" key={'toggle'} onClick={() => toggleLayer(item.name)} icon={item.visible ? <EyeInvisibleOutlined /> : <EyeOutlined />} />
                            ]}>
                                <Slider onChange={(val: number) => setOpacity(val, item.name, item.type)} value={item.opacity} disabled={!item.visible} defaultValue={item.opacity} min={0} max={1} step={0.1} tipFormatter={(val) => (val as number) * 10} />
                                {item.visible && <SketchPicker color={item.color} onChange={val => changeColor(val.hex, item.name, item.type)} />}
                            </Card>
                        </>
                    )}
                    rowKey={item => `${item.id}`}
                />
            </Drawer>
            :
            <></>
    )
}
