import { lazy, Suspense } from 'react'
import { Map } from './components/Map';
import { ModalSnapshotProvider } from './contexts/ModalSnapshotContext';
import { MapInstanceProvider } from './contexts/MapInstanceContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'antd/dist/antd.dark.css'
import './App.css'

const ControlBox = lazy(() => import('./components/ControlBox').then(module => ({ default: module.ControlBox })));
const Snapshots = lazy(() => import('./components/Snapshots').then(module => ({ default: module.Snapshots })));

function App() {
  document.title = "Manado Map";

  return (
    <MapInstanceProvider>
      <ModalSnapshotProvider>
        <Suspense fallback={<></>}>
          <ControlBox />
          <Snapshots />
        </Suspense>
        <Map />
      </ModalSnapshotProvider>
    </MapInstanceProvider>
  );
}

export default App;
