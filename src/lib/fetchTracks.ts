import { SavedTrack } from 'spotify-types';

const apiToken =
  'BQA4g9Fii_v_u1TOWXWl120j-7lTzJIvJVDB6gBlBy5fJt-grIV3GwzCcRpxY0O7p0oDzfRWeWquvQ0Ym9mVs28UuF6ajKK4GjmeH5AGybhlSIBDr_Bee-bfrsBHVxU8ndQy8ZCVwL20TGk7DJu1Kujrp2Ua7PFcXQsAotRNqP-Tavnh2yDVJhrabAdkd99vlrY-nd6IFckt8VsAQwe96VZMUxS9Kw';

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
