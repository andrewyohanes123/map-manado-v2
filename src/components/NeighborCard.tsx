import { FC, ReactElement, useCallback, useContext } from 'react'
import { List, Card, Typography } from 'antd'
import { Neighbor } from './Regions';
import { FocusedRegion } from '../App';

export interface NeighborCardProps {
  neighbors: Neighbor[];
}

export const NeighborCard: FC<NeighborCardProps> = ({ neighbors }): ReactElement => {
  const { setRegion } = useContext(FocusedRegion);

  const focusRegion = useCallback((district_id: number, subdistrict_id: number, neighbor_id: number) => {
    typeof setRegion !== 'undefined' && setRegion({district_id, subdistrict_id, neighbor_id});
  }, [setRegion])

  return (
    <div style={{ marginLeft: 15, marginBottom: 5 }}>
      <List
        dataSource={neighbors}
        rowKey={neighbor => `${neighbor.id}`}
        renderItem={neighbor => (
          <Card size="small" 
          style={{ marginBottom: 7.5 }} 
          onDoubleClick={() => console.log({ neighbor })} 
          onClick={() => focusRegion(neighbor.district_id, neighbor.subdistrict_id, neighbor.id)}
          bordered={false} 
          hoverable><Typography.Text>{neighbor.name}</Typography.Text></Card>
        )}
        locale={{ emptyText: <Typography.Text type="secondary">Tidak ada lingkungan</Typography.Text> }}
      />
    </div>
  )
}
