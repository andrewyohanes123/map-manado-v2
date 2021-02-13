import { FC, ReactElement, useEffect, useCallback, useState, useContext } from 'react'
import { Modal, List } from 'antd'
import { AxiosResponse, Connection } from '../modules/Connection'
import { ModalContext } from '../contexts/ModalSnapshotContext';
import { MapInstance } from '../contexts/MapInstanceContext';

export interface SnapshotsProps {
    visible: boolean;
}

export interface Snapshot {
    [any: string]: any;
    name: string;
    id: number;
}

export const Snapshots: FC = (): ReactElement => {
    const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
    const { open: visible, toggleModal } = useContext(ModalContext);
    const { map } = useContext(MapInstance);

    const getSnapshots = useCallback(() => {
        Connection.get('/apis/snapshots').then((resp: AxiosResponse) => {
            setSnapshots(resp.data.data.rows);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        if (typeof map !== 'undefined') {
            getSnapshots();
        }
    }, [getSnapshots, map]);

    return (
        typeof map !== 'undefined' ?
            <Modal onCancel={toggleModal} footer={null} title="Basemap" visible={visible}>
                <List dataSource={snapshots}
                    renderItem={(item) => (
                        <List.Item>{item.name}</List.Item>
                    )}
                    rowKey={item => `${item.id}`}
                />
            </Modal>
            :
            <></>
    )
}
