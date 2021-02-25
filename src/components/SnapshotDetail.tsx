import { FC, ReactElement, useContext, useCallback } from 'react'
import { Drawer, Card, Row, Col } from 'antd'
import { SnapshotContext } from '../contexts/SnapshotContext'

export interface Field {
    name: string;
    type: string;
}

export const SnapshotDetail: FC = (): ReactElement => {
    const { panel, togglePanel, snapshot } = useContext(SnapshotContext);

    const closePanel = useCallback(() => {
        togglePanel!(false);
    }, [togglePanel]);

    return (
        <Drawer visible={panel} onClose={closePanel} mask={false} height={'300px'} maskClosable={false} placement="bottom" title={snapshot?.properties?.name ?? '-'} >
            {typeof snapshot !== 'undefined' && <Row gutter={[16, 16]}>
                {JSON.parse(snapshot?.properties?.___fields).map((field: Field) => (
                    <Col key={field.name} md={6}>
                        <Card size="small" key={field.name} title={field.name}>
                            {snapshot?.properties![field.name] ?? '-'}
                        </Card>
                    </Col>
                ))}
            </Row>}
        </Drawer>
    )
}
