import { lazy, Suspense, createContext, useState, useCallback, useContext } from 'react'
// import { Map } from './components/Map';
import { ModalSnapshotProvider } from './contexts/ModalSnapshotContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'antd/dist/antd.css'
import './App.css'
import { Connection } from './modules/Connection';
import { MapInstance } from './contexts/MapInstanceContext';
import { LoadingBox } from './components/LoadingBox';

const ControlBox = lazy(() => import('./components/ControlBox').then(module => ({ default: module.ControlBox })));
const Snapshots = lazy(() => import('./components/Snapshots').then(module => ({ default: module.Snapshots })));
const SelectedRegionModal = lazy(() => import('./components/SelectedRegionModal').then(module => ({ default: module.SelectedRegionModal })));
const Map = lazy(() => import('./components/Map').then(module => ({ default: module.Map })));

export interface RegionGeometry {
  id: number;
  geometry: {
    type: string;
    coordinates: [[[number, number]]];
  }
}

type FocusedRegionType = {
  data?: RegionGeometry;
  setRegion?: (args: setRegionArgs) => void;
  unsetRegion?: () => void;
}

type setRegionArgs = {
  district_id: number;
  subdistrict_id?: number;
  neighbor_id?: number;
}

export const FocusedRegion = createContext<FocusedRegionType>({});

function App() {
  document.title = "Manado Map";
  const [focusedRegion, setFocusedRegion] = useState<FocusedRegionType>({});
  const { map } = useContext(MapInstance);

  const setRegion = useCallback(({ district_id, subdistrict_id, neighbor_id }: setRegionArgs) => {
    const subdistrict_type = typeof subdistrict_id;
    const neighbor_type = typeof neighbor_id;
    // if (subdistrict_type === 'undefined' && neighbor_type === 'undefined') {
    Connection.get(`/spatials/district_areas/${district_id}${subdistrict_type !== 'undefined' ? `/subdistrict_areas/${subdistrict_id}` : ''}${neighbor_type !== 'undefined' ? `/neighbor_areas/${neighbor_id}` : ''}`).then((resp) => {
      setFocusedRegion(resp.data);
      Connection.get(`/apis/districts/${district_id}${subdistrict_type !== 'undefined' ? `/subdistricts/${subdistrict_id}` : ''}${neighbor_type !== 'undefined' ? `/neighbors/${neighbor_id}` : ''}`).then(resp => {
        document.title = `Manado Map - ${resp.data.data.name}`
      })
        .catch(e => console.log(e));
    })
      .catch(e => console.log(e));
    // }
  }, []);

  const unsetRegion = useCallback(() => {
    setFocusedRegion({});
    document.title = `Manado Map`;

    typeof map !== 'undefined' && map.flyTo({
      center: [124.86218331706851, 1.4847125213695158],
      zoom: 13
    });
  }, [map]);

  return (
    <ModalSnapshotProvider>
      <FocusedRegion.Provider value={{ ...focusedRegion, setRegion, unsetRegion }}>
        <Suspense fallback={<></>}>
          <ControlBox />
          <Snapshots />
          <SelectedRegionModal />
        </Suspense>
        <Suspense fallback={<LoadingBox />}>
          <Map />
        </Suspense>
      </FocusedRegion.Provider>
    </ModalSnapshotProvider>
  );
}

export default App;
