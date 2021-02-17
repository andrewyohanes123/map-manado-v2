import { FC, ReactElement } from 'react'
import { List, Card, Typography } from 'antd'
import { Neighbor } from './Regions';

export interface NeighborCardProps {
  neighbors: Neighbor[];
}

export const NeighborCard: FC<NeighborCardProps> = ({ neighbors }): ReactElement => {
  return (
    <div style={{ marginLeft: 15, marginBottom: 5 }}>
      <List
        dataSource={neighbors}
        rowKey={neighbor => `${neighbor.id}`}
        renderItem={neighbor => (
          <Card size="small" style={{ marginBottom: 7.5 }} onDoubleClick={() => console.log({ neighbor })} bordered={false} hoverable><Typography.Text>{neighbor.name}</Typography.Text></Card>
        )}
        locale={{ emptyText: <Typography.Text type="secondary">Tidak ada lingkungan</Typography.Text> }}
      />
    </div>
  )
}
