import { FC, ReactElement } from 'react'
import ReactMapboxGL from 'react-mapbox-gl'

const Mapbox = ReactMapboxGL({
    accessToken: 'pk.eyJ1IjoiYW5kcmV3eW9oYW5lcyIsImEiOiJjamxsc2c3MnQweHRuM2tsMXowNXR5ZTQ5In0.H6o00Jv2W2pfGbiY7BK7Yw',
    attributionControl: false,
    logoPosition: 'top-right'
})

export const Map: FC = (): ReactElement => {
    return (
        <>
            <Mapbox
                style="http://10.71.71.216:1234/map/maps/erdow"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
                center={[124.86218331706851, 1.4847125213695158]}
            ></Mapbox>
        </>
    )
}
