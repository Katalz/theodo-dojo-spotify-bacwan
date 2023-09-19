import { SavedTrack } from 'spotify-types';

const apiToken =
  'BQCgWlCiXnKwqbvyHqmINOsCLQhjHma_cgx-tuYIijmkfvuvkmlGwB1PRbpK6oD-qw9B8PxaltLOaaqyiJMqaQi5XvKKWth8h6AtsTbLL5cxqYa70SE9aNnYNayo2mkkDd_s9juU5ZHo-KYnukufQl_71HtRBbshfrs4akBhujtaihmo7__imXZwv6r0jr3LQbyd4ozcZWJXdm0lDNlOk5xjXv_pFg';

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
