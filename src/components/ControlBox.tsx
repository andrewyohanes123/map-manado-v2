import { FC, ReactElement, useState, useContext } from 'react'
import { Button, Drawer, Tooltip, Space } from 'antd'
import { MenuOutlined, BookOutlined } from '@ant-design/icons'
import { ModalContext } from '../contexts/ModalSnapshotContext'
import { Regions } from './Regions'

export const ControlBox: FC = (): ReactElement => {
    const [open, toggleOpen] = useState<boolean>(false);
    const { toggleModal } = useContext(ModalContext)

    return (
        <>
            <div className="control-box">
                <Space>
                    <Tooltip title="Menu" placement="topRight">
                        <Button type="primary" shape="circle" onClick={() => toggleOpen(state => !state)} icon={<MenuOutlined />} />
                    </Tooltip>
                    <Tooltip title="Basemap" placement="topRight">
                        <Button shape="circle" onClick={() => {
                            toggleModal!()
                            toggleOpen(false);
                        }} icon={<BookOutlined />} />
                    </Tooltip>
                </Space>
            </div>
            <Drawer bodyStyle={{ padding: `10px 10px` }} width={400} title="Wilayah" visible={open} mask={false} onClose={() => toggleOpen(false)}>
                <Regions />
            </Drawer>
        </>
    )
}
