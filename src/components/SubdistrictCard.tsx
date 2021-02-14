import { FC, ReactElement } from 'react'
import { List, Button } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { Subdistrict } from './Regions'

export interface SubdistrictCardProps {
    subdistrict: Subdistrict;
}

export const SubdistrictCard: FC<SubdistrictCardProps> = ({ subdistrict }): ReactElement => {
    return (
        <>
            <List.Item extra={[<Button size="small" shape="circle" icon={<CaretDownOutlined />} key="collapse" />]}>
                {subdistrict.name}
            </List.Item>
        </>
    )
}
