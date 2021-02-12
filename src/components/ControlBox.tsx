import { FC, ReactElement, useState, useContext } from 'react'
import { Button, Drawer, Tooltip, Space } from 'antd'
import { MenuOutlined, BookOutlined } from '@ant-design/icons'
import { ModalContext } from '../contexts/ModalSnapshotContext'

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
                        <Button shape="circle" onClick={() => toggleModal!()} icon={<BookOutlined />} />
                    </Tooltip>
                </Space>
            </div>
            <Drawer width={400} title="Test" visible={open} mask={false} onClose={() => toggleOpen(false)}>

            </Drawer>
        </>
    )
}
