import logo from './assets/logo.svg';
import './App.css';
import { useState } from 'react';
import { fetchTracks } from './lib/fetchTracks';
import { useQuery } from '@tanstack/react-query';
import { SavedTrack } from 'spotify-types';
import Swal from 'sweetalert2';
const trackUrls = [
  'https://p.scdn.co/mp3-preview/742294f35af9390e799dd96c633788410a332e52',
  'https://p.scdn.co/mp3-preview/5a12483aa3b51331aba663131dbac967ccb33d99',
  'https://p.scdn.co/mp3-preview/31f65b6a613010f22316c7be335b62226cf2f263',
  'https://p.scdn.co/mp3-preview/0f6b8a3524ec410020457da4cdd7717f9addce2f',
  'https://p.scdn.co/mp3-preview/ac28d1b0be285ed3bfd8e9fa5fad133776d7cf36',
];

const AlbumCover = ({ currentTrack }: { currentTrack: SavedTrack }) => {
  const src = currentTrack.track.album.images[0].url;
  console.log('Valeur :' + JSON.stringify(currentTrack));
  return <img src={src} style={{ width: 400, height: 400 }} />;
};

const App = () => {
  const { data: tracks } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });
  if (tracks === undefined) {
    return <div> Loading ...</div>;
  }
  const [trackIndex, setTrackIndex] = useState(
    Math.floor(Math.random() * tracks.length),
  );

  const goToNextTrack = () => {
    if (trackIndex == 3) {
      setTrackIndex(0);
    } else {
      setTrackIndex(trackIndex + 1);
    }
  };

  const checkAnswer = id => {
    if (id == trackIndex) {
      Swal.fire('Bravo', 'Tu as gagné', 'success');
    } else {
      Swal.fire('0/20', "C'est pas du tout ça", 'success');
    }
  };

  const track1 = tracks[0];
  const track2 = tracks[1];
  const track3 = tracks[2];
  const message =
    'Parmis vos morceaux likés, il y a ' +
    tracks.length +
    ' morceaux, dont le premier est : ' +
    tracks[0].track.name;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le blind test</h1>
      </header>
      <div className="App-images">
        {/* <AlbumCover currentTrack={tracks[trackIndex]} /> */}
        <audio src={tracks[trackIndex].track.preview_url} autoPlay controls />
        <button onClick={goToNextTrack}>Next track</button>
        {/* <p>{message}</p> */}
      </div>
      <div className="App-buttons">
        <button onClick={() => checkAnswer(2)}>
          {track3.track.album.name}
        </button>
        <button onClick={() => checkAnswer(1)}>
          {track2.track.album.name}
        </button>
        <button onClick={() => checkAnswer(0)}>
          {track1.track.album.name}
        </button>
      </div>
    </div>
  );
};

export default App;
