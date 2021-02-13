import { FC, ReactElement, useContext, useEffect } from 'react'
import ReactMapboxGL from 'react-mapbox-gl'
import { MapInstance } from '../contexts/MapInstanceContext'

const Mapbox = ReactMapboxGL({
    accessToken: 'pk.eyJ1IjoiYW5kcmV3eW9oYW5lcyIsImEiOiJjamxsc2c3MnQweHRuM2tsMXowNXR5ZTQ5In0.H6o00Jv2W2pfGbiY7BK7Yw',
    attributionControl: false,
    logoPosition: 'top-right',
    transformRequest: (url, resourceType) => {
        return {
            url: url,
            // headers: { 'x-map-key': '8d3a4f73-6c1b-4932-be1d-8edbaf09a486' },
            // credentials: 'include'
        }
    }
})

export const Map: FC = (): ReactElement => {
    const { setMap, map } = useContext(MapInstance);

    useEffect(() => {
        if (typeof map !== 'undefined') {
            map.addSource('bangunan', {
                'type': 'vector', 'tiles': ['http://10.71.71.216:1234/map/snapshots/4/shapes/?z={z}&x={x}&y={y}&layerName=bangunan']
            })
            map.addLayer({
                'id': 'layer_bangunan',
                'type': 'fill',
                'source-layer': 'bangunan',
                source: 'bangunan',
                'paint': {
                    'fill-color': 'blue'
                },
                minzoom: 13
            })
        }
    }, [map])

    return (
        <>
            <Mapbox
                style="http://10.71.71.216:1234/map/maps/erdow"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
                onStyleLoad={map => {
                    setMap!(map);
                }}
                center={[124.86218331706851, 1.4847125213695158]}
            >
            </Mapbox>
        </>
    )
}
