import Axios from 'axios'
import { EventEmitter } from 'events';

const axios = Axios.create({ baseURL: 'https://api.spotify.com/v1' });

export default class Spotify extends EventEmitter {

    constructor() {
        super();
        this.on('user', user => this.user = user);
        axios.interceptors.request.use(async request => {
            if (!this._access_token) {
                this._access_token = await this._callback();
                axios.get('/me').then(response => this.emit('user', response.data));
            }

            request.headers['Authorization'] = `Bearer ${this._access_token}`;
            return request;
        });
        axios.interceptors.response.use(null, error => {
            if (error.config && error.response && error.response.status === 401) {
                return this._callback().then(access_token => {
                    this._access_token = access_token;
                    return Axios.request(error.config);
                });
            }
            throw error;
        });
    }

    async getUserPlaylists() {
        const response = await axios.get('/me/playlists');
        return response.data;
    }

    async getPlaylist(playlist_id) {
        const response = await axios.get(`/playlists/${playlist_id}`);
        return response.data;
    }

    async addTracksToPlaylist(playlist_id, ...tracks) {
        await axios.post(`/playlists/${playlist_id}/tracks`, { uris: tracks.map(e => `spotify:track:${e}`) });
    }

    async removeTracksFromPlaylist(playlist_id, ...tracks) {
        await axios.delete(`/playlists/${playlist_id}/tracks`, {
            data: { tracks: tracks.map(e => ({ uri: `spotify:track:${e}` })) }
        });
    }

    async createPlaylist(name) {
        const response = await axios.post(`/users/${this.user['id']}/playlists`, { name });
        return response.data;
    }

    async search(query, types = []) {
        const response = await axios.get('/search', {
            params: { q: query, type: types.join() }
        });
        return response.data;
    }

    async getArtist(id) {
        const response = await axios.get(`/artists/${id}`);
        return response.data;
    }

    async getArtistAlbums(id, groups = [], limit = 20, offset) {
        const response = await axios.get(`/artists/${id}/albums`, {
            params: {
                limit: limit,
                country: 'US',
                offset: offset || 0,
                include_groups: groups.join()
            }
        });
        return response.data;
    }

    async getAlbum(id) {
        const response = await axios.get(`/albums/${id}`);
        return response.data;
    }

    set callback(callback) {
        this._callback = callback;
    }

}