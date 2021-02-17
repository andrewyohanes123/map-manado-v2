import { FC, ReactElement, useState, useCallback } from 'react'
import { Card, Button, Row, Col } from 'antd'
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Subdistrict } from './Regions'
import { NeighborCard } from './NeighborCard'

export interface SubdistrictCardProps {
    subdistrict: Subdistrict;
    district_id: number;
}

export const SubdistrictCard: FC<SubdistrictCardProps> = ({ subdistrict, district_id }): ReactElement => {
    const [collapse, toggleCollapse] = useState<boolean>(false);

    const toggleNeighbor = useCallback(() => {
        toggleCollapse(collapsed => !collapsed);
    }, []);

    return (
        <>
            <Card size="small" style={{ marginBottom: 5 }} onDoubleClick={() => {
                console.log({ subdistrict, district_id });
            }} bordered={false} hoverable>
                <Row justify="space-between">
                    <Col md={18}>
                        {subdistrict.name}
                    </Col>
                    <Col md={2}>
                        <Button onClick={toggleNeighbor} size="small" shape="circle" icon={collapse ? <CaretDownOutlined /> : <CaretRightOutlined />} key="collapse" />
                    </Col>
                </Row>
            </Card>
            {collapse && <NeighborCard neighbors={subdistrict.neighbors} />}
        </>
    )
}
