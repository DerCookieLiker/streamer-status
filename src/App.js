import './App.css';
import Status from './Components/Status/Status';
import Toolbar from './Components/Toolbar/Toolbar';
import { useStreamer } from './contexts/StreamerContext';


function App() {
  
  const {streamer} = useStreamer();

  return (
    <div className="App">
        <h1 className='app-header'>{streamer}</h1>  
      <main className='app-body'>
        <Status></Status>
      </main>
      <Toolbar></Toolbar>
    </div>
  );
}

export default App;
