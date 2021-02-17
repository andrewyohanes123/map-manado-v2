import { FC, ReactElement, useState, useContext } from 'react'
import { Button, Drawer, Tooltip, Space, Typography } from 'antd'
import { MenuOutlined, BookOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { ModalContext } from '../contexts/ModalSnapshotContext'
import { Regions } from './Regions'
import { FocusedRegion } from '../App'

export const ControlBox: FC = (): ReactElement => {
    const [open, toggleOpen] = useState<boolean>(false);
    const { toggleModal, open: modal } = useContext(ModalContext);
    const {unsetRegion, data} = useContext(FocusedRegion);

    return (
        <>
            <div className={`control-box ${(open || modal) ? 'drawer-open' : ''}`}>
                <Typography.Text style={{ marginBottom: 0, marginRight: 15 }}>Manado Map V2</Typography.Text>
                <Space>
                    <Tooltip title="Daftar Wilayah" placement="topRight">
                        <Button type="primary" shape="circle" onClick={() => {
                            modal && toggleModal!();
                            toggleOpen(state => !state);
                        }} icon={<MenuOutlined />} />
                    </Tooltip>
                    <Tooltip title="Basemap" placement="topRight">
                        <Button shape="circle" onClick={() => {
                            toggleModal!();
                            toggleOpen(false);
                        }} icon={<BookOutlined />} />
                    </Tooltip>
                </Space>
            </div>
            <Drawer bodyStyle={{ padding: `10px 10px` }} width={350} title="Wilayah" visible={open} mask={false} onClose={() => toggleOpen(false)}>
                {(typeof data !== 'undefined' && typeof unsetRegion !== 'undefined') && 
                <Tooltip title="Fokus ke wilayah Manado">
                    <Button block style={{ marginBottom: 5 }} type="primary" icon={<ArrowLeftOutlined />} onClick={unsetRegion} />
                </Tooltip>
                }
                <Regions />
            </Drawer>
        </>
    )
}
