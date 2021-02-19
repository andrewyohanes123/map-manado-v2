import {FC, ReactElement} from 'react'
import {Typography} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

export const LoadingBox: FC = (): ReactElement => {
    return (
        <div style={{ display: 'flex', flex: 1, width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <LoadingOutlined spin style={{ fontSize: 30 }} />
            <Typography.Title level={5}>Map Manado V2</Typography.Title>
            <Typography.Text type="secondary">Loading - Harap tunggu sebentar</Typography.Text>
        </div>
    )
}
