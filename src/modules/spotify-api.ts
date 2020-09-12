import Axios, { AxiosError } from 'axios';

const axios = Axios.create({
    baseURL: 'https://api.spotify.com/v1'
});

export default class SpotifyClient {

    private accessToken?: string;
    private user?: SpotifyUser;

    constructor(authprovider: () => Promise<string>) {
        axios.interceptors.request.use(async config => {
            if (!this.accessToken) {
                this.accessToken = await authprovider();
            }

            config.headers['Authorization'] = `Bearer ${this.accessToken}`;
            return config;
        });

        axios.interceptors.response.use(undefined, (error: AxiosError) => {
            if (error.response && error.response.status === 401) {
                return authprovider().then(accessToken => {
                    this.accessToken = accessToken;
                    error.config.headers['Authorization'] = `Bearer ${accessToken}`;
                    return Axios.request(error.config);
                });
            }
            return error;
        });
    }

    public async getUser(): Promise<SpotifyUser> {
        const response = await axios.get('/me');
        return this.user = response.data;
    }

    public async getTrack(track_id: string) {
        const response = await axios.get(`/tracks/${track_id}`);
        return response.data;
    }

    public async getFollowedArtists(after?: string) {
        const params = { type: 'artist', limit: 50 } as any;
        if (after) params['after'] = after;

        const response = await axios.get('/me/following', { params });
        return response.data['artists'];
    }

    public async getSavedAlbums(offset?: number) {
        const response = await axios.get('/me/albums', {
            params: { limit: 50, offset: offset || 0 }
        });
        return response.data;
    }

    public async getSavedTracks(offset?: number) {
        const response = await axios.get('/me/tracks', {
            params: { limit: 50, offset: offset || 0 }
        });
        return response.data;
    }

    public async getUserPlaylists(offset?: number) {
        const response = await axios.get('/me/playlists', {
            params: { limit: 50, offset: offset || 0 }
        });
        return response.data;
    }

    public async getPlaylist(playlist_id: string) {
        const response = await axios.get(`/playlists/${playlist_id}`);
        return response.data;
    }

    public async followPlaylist(playlist_id: string) {
        await axios.put(`/playlists/${playlist_id}/followers`);
    }

    public async unfollowPlaylist(playlist_id: string) {
        await axios.delete(`/playlists/${playlist_id}/followers`);
    }

    public async addTracksToPlaylist(playlist_id: string, tracks: string[] = []) {
        await axios.post(`/playlists/${playlist_id}/tracks`, { uris: tracks.map(e => `spotify:track:${e}`) });
    }

    public async removeTracksFromPlaylist(playlist_id: string, tracks: string[] = []) {
        await axios.delete(`/playlists/${playlist_id}/tracks`, {
            data: { tracks: tracks.map(e => ({ uri: `spotify:track:${e}` })) }
        });
    }

    public async createPlaylist(name: string, user?: SpotifyUser) {
        const data = this.user || user;
        if (data !== undefined) {
            const response = await axios.post(`/users/${data.id}/playlists`, { name });
            return response.data;
        }

        throw new Error('User not found');
    }

    public async search(query: string, types: string[] = [], limit: number = 20) {
        const response = await axios.get('/search', {
            params: { q: query, type: types.join(), limit }
        });
        return response.data;
    }

    public async getArtist(artist_id: string) {
        const response = await axios.get(`/artists/${artist_id}`);
        return response.data;
    }

    public async getArtistAlbums(artist_id: string, groups: string[] = [], limit: number = 20, offset?: number) {
        const response = await axios.get(`/artists/${artist_id}/albums`, {
            params: {
                limit: limit,
                country: 'US',
                offset: offset || 0,
                include_groups: groups.join()
            }
        });
        return response.data;
    }

    public async getAlbum(album_id: string) {
        const response = await axios.get(`/albums/${album_id}`);
        return response.data;
    }

}

export declare interface SpotifyUser {

    readonly id: string;

    readonly email?: string;

    readonly display_name: string;

    readonly images: object[];

}