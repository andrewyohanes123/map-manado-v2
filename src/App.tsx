import { Map } from './components/Map';
import { ControlBox } from './components/ControlBox';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'antd/dist/antd.css'
import './App.css'
import { Snapshots } from './components/Snapshots';
import { ModalSnapshotProvider } from './contexts/ModalSnapshotContext';

function App() {
  document.title = "Manado Map";

  return (
    <ModalSnapshotProvider>
      <Snapshots />
      <ControlBox />
      <Map />
    </ModalSnapshotProvider>
  );
}

export default App;
