import { FC, ReactElement, useState } from 'react'
import { List, Button, Card, Row, Col, } from 'antd'
import { District } from './Regions'
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
import { SubdistrictCard } from './SubdistrictCard'

export interface DistrictCardProps {
    district: District;
}

export const DistrictCard: FC<DistrictCardProps> = ({ district }): ReactElement => {
    const [show, toggleShow] = useState<boolean>(false);
    return (
        <>
        <Card style={{ marginBottom: 5 }} size="small" bordered={false} hoverable={true}>
            <Row justify="space-between">
                <Col span={18}>
                    {district.name}
                </Col>
                <Col span={2}>
                    {/* <Button size="small" shape="circle" type="primary" icon={<InfoCircleOutlined />} key="info" />
                    <Divider type="vertical" /> */}
                    <Button size="small" type={show ? 'primary' : 'default'} shape="circle" onClick={() => toggleShow(!show)} icon={show ? <CaretDownOutlined /> : <CaretRightOutlined />} key="collapse" />
                </Col>
            </Row>
        </Card>
            {show &&
                <Card style={{ margin: `5px 0` }} size="small">
                    <List dataSource={district.subdistricts} renderItem={(item) => <SubdistrictCard subdistrict={item} />} rowKey={sub => `${sub.id}`} />
                </Card>}
        </>
    )
}
