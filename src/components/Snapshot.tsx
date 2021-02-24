import { FC, ReactElement, useState } from 'react'
import { Card, Button, Slider, Tooltip, Switch, Typography } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined, CheckCircleOutlined, SwitcherOutlined } from '@ant-design/icons'
import { SketchPicker } from 'react-color'
import { Snapshot } from './Snapshots'

export interface SnapshotCardProps {
    snapshot: Snapshot;
    onChangeOpacity: (val: number, name: string, type: string) => void;
    onChangeColor: (val: string, name: string, type: string) => void;
    toggleLayer: (name: string) => void;
}


export const SnapshotCard: FC<SnapshotCardProps> = ({ snapshot: item, toggleLayer, onChangeColor, onChangeOpacity }): ReactElement => {

    const [colorPicker, toggleColorPicker] = useState<boolean>(false);
    return (
        <Card size="small" title={item.name} style={{ marginBottom: 10, position: 'relative' }} extra={[
            <Switch key="switch" checkedChildren={<EyeOutlined />} onChange={() => toggleLayer(item.name)} checked={item.visible} unCheckedChildren={<EyeInvisibleOutlined />} />
        ]}>
            {
                !item.visible ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 12, textAlign: 'center', flexDirection: 'column' }} >
                        <SwitcherOutlined style={{ fontSize: 30, color: '#929292' }} color="#efefef" />
                        <Typography.Text type="secondary">Basemap {item.name} tidak diaktifkan</Typography.Text>
                    </div>
                    :
                    <>
                        <Slider onChange={(val: number) => onChangeOpacity(val, item.name, item.type)} value={item.opacity} disabled={!item.visible} defaultValue={item.opacity} min={0} max={1} step={0.1} tipFormatter={(val) => (val as number) * 10} />
                        {colorPicker &&
                            <Card size="small" title={`Warna ${item.name}`} extra={[<Button type="primary" onClick={() => toggleColorPicker(false)} key={item.name} size="small" icon={<CheckCircleOutlined />} />]} 
                            style={{ position: 'absolute', zIndex: 100 }}                            
                            >
                                <SketchPicker disableAlpha={true} color={item.color} onChange={val => onChangeColor(val.hex, item.name, item.type)} />
                            </Card>
                        }
                        <Tooltip title={`Ganti warna ${item.name}`}>
                            <div style={{ padding: 30, borderRadius: 12, background: item.color, cursor: 'pointer' }} onClick={() => toggleColorPicker(true)} />
                        </Tooltip>
                    </>
            }
        </Card>
    )
}
