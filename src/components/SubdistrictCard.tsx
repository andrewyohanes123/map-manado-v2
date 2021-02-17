import { FC, ReactElement, useState, useCallback, useContext, MouseEvent } from 'react'
import { Card, Button, Row, Col } from 'antd'
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Subdistrict } from './Regions'
import { NeighborCard } from './NeighborCard'
import { FocusedRegion } from '../App'

export interface SubdistrictCardProps {
    subdistrict: Subdistrict;
    district_id: number;
}

export const SubdistrictCard: FC<SubdistrictCardProps> = ({ subdistrict, district_id }): ReactElement => {
    const [collapse, toggleCollapse] = useState<boolean>(false);
    const { setRegion } = useContext(FocusedRegion);

    const toggleNeighbor = useCallback((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        toggleCollapse(collapsed => !collapsed);
    }, []);

    const focusRegion = useCallback((subdistrict_id: number, district_id: number) => {
        typeof setRegion !== 'undefined' && setRegion({ district_id, subdistrict_id });
    }, [setRegion]);

    return (
        <>
            <Card size="small" style={{ marginBottom: 5 }} onClick={() => focusRegion(subdistrict.id, district_id)} onDoubleClick={() => {
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
