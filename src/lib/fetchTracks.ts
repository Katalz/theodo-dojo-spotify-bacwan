import { SavedTrack } from 'spotify-types';

const apiToken =
  'BQAoA1sSea4PK5f_Nd2F4hmEVZB6gRRxayO2NisAz1EgZR38MY7xam99kD6-3zF8NLBLo8QkRGWP5OyHJECLNOPNHiaae-UFQnHl_vRNcb6BtnjhOcygKCTT92TdEBP7q_pAyTvTeQgww59Q3mErsNn6p81UzY6nfaqBuD6Jx25jWbLF0J4-I79SKLOo49tPeazfYQ3ZkhVkomSkbiGk51D64HXrbA';

export const fetchTracks = async (): Promise<SavedTrack[]> => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: SavedTrack[] };

  return data.items;
};
