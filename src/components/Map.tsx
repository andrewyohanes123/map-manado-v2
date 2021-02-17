import { FC, ReactElement, useContext } from 'react'
import ReactMapboxGL, {ZoomControl, ScaleControl} from 'react-mapbox-gl'
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
    },
    minZoom: 12.5
})

export const Map: FC = (): ReactElement => {
    const { setMap } = useContext(MapInstance);

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
                zoom={[13]}
                center={[124.86218331706851, 1.4847125213695158]}
            >
                <ZoomControl className="zoom-control" position="bottom-right" />
                <ScaleControl position="bottom-left" />
            </Mapbox>
        </>
    )
}
