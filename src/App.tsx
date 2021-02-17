import { lazy, Suspense } from 'react'
import { Map } from './components/Map';
import { ModalSnapshotProvider } from './contexts/ModalSnapshotContext';
import { MapInstanceProvider } from './contexts/MapInstanceContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'antd/dist/antd.css'
import './App.css'

const ControlBox = lazy(() => import('./components/ControlBox').then(module => ({ default: module.ControlBox })));
const Snapshots = lazy(() => import('./components/Snapshots').then(module => ({ default: module.Snapshots })));
const SelectedRegionModal = lazy(() => import('./components/SelectedRegionModal').then(module => ({ default: module.SelectedRegionModal })));

function App() {
  document.title = "Manado Map";

  return (
    <MapInstanceProvider>
      <ModalSnapshotProvider>
        <Suspense fallback={<></>}>
          <ControlBox />
          <Snapshots />
          <SelectedRegionModal />
        </Suspense>
        <Map />
      </ModalSnapshotProvider>
    </MapInstanceProvider>
  );
}

export default App;
