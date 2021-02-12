import { FC, ReactElement, useEffect, useCallback, useState, useContext } from 'react'
import { Modal, List } from 'antd'
import { AxiosResponse, Connection } from '../modules/Connection'
import { ModalContext } from '../contexts/ModalSnapshotContext';

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
    const { open: visible, toggleModal } = useContext(ModalContext)

    const getSnapshots = useCallback(() => {
        Connection.get('/apis/snapshots').then((resp: AxiosResponse) => {
            console.log(resp.data);
            setSnapshots(resp.data.data.rows);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        getSnapshots();
    }, [getSnapshots]);

    return (
        <Modal onCancel={toggleModal} footer={null} title="Basemap" visible={visible}>
            <List dataSource={snapshots}
                renderItem={(item) => (
                    <List.Item>{item.name}</List.Item>
                )}
                rowKey={item => `${item.id}`}
            />
        </Modal>
    )
}
