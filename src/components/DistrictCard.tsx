import { FC, ReactElement, useState, useContext, useCallback, MouseEvent } from 'react'
import { List, Button, Card, Row, Col, } from 'antd'
import { District } from './Regions'
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
import { SubdistrictCard } from './SubdistrictCard'
import { RegionSelector } from '../contexts/RegionSelectorContext'

export interface DistrictCardProps {
    district: District;
}

export const DistrictCard: FC<DistrictCardProps> = ({ district }): ReactElement => {
    const [show, toggleShow] = useState<boolean>(false);
    const { setRegion } = useContext(RegionSelector);

    const focusOnRegion = useCallback((ev: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        console.log(ev.target)
    }, [])

    const collapseSubdistrict = useCallback((ev: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        ev.stopPropagation();
        toggleShow(!show)
    }, [show])

    return (
        <>
            <Card style={{ marginBottom: 5 }} onClick={focusOnRegion} onDoubleClick={() => setRegion!(district)} size="small" bordered={false} hoverable={true}>
                <Row justify="space-between">
                    <Col span={18}>
                        {district.name}
                    </Col>
                    <Col span={2}>
                        {/* <Button size="small" shape="circle" type="primary" icon={<InfoCircleOutlined />} key="info" />
                    <Divider type="vertical" /> */}
                        <Button size="small" type={show ? 'primary' : 'default'} shape="circle" onClick={collapseSubdistrict} icon={show ? <CaretDownOutlined /> : <CaretRightOutlined />} key="collapse" />
                    </Col>
                </Row>
            </Card>
            {show &&
                <Card style={{ margin: `5px 0` }} size="small">
                    <List dataSource={district.subdistricts} renderItem={(item) => <SubdistrictCard district_id={district.id} subdistrict={item} />} rowKey={sub => `${sub.id}`} />
                </Card>}
        </>
    )
}
