import { Map } from './components/Map';
import { ControlBox } from './components/ControlBox';
import { Snapshots } from './components/Snapshots';
import { ModalSnapshotProvider } from './contexts/ModalSnapshotContext';
import { MapInstanceProvider } from './contexts/MapInstanceContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'antd/dist/antd.css'
import './App.css'

function App() {
  document.title = "Manado Map";

  return (
    <MapInstanceProvider>
      <ModalSnapshotProvider>
        <Snapshots />
        <ControlBox />
        <Map />
      </ModalSnapshotProvider>
    </MapInstanceProvider>
  );
}

export default App;
