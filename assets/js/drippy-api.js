import Axios from 'axios'

const api_url = '' || 'https://api.drippy.live';
const exclude = ['/refresh', '/login', '/register'];
const axios = Axios.create({ baseURL: api_url });

axios.interceptors.request.use(config => {
    if (!exclude.includes(config.url)) {
        config.headers['User-Token'] = localStorage['idToken'];
    }
    return config;
});

axios.interceptors.response.use(null, error => {
    if (error.config && error.response && error.response.status === 401) {
        if (!exclude.includes(error.config.url)) {
            return axios.post('/refresh', { refresh_token: localStorage['refreshToken'] }).then(response => {
                localStorage['idToken'] = response.data['idToken'];
                localStorage['refreshToken'] = response.data['refreshToken'];
                error.config.headers['User-Token'] = localStorage['idToken'];
                return Axios.request(error.config);
            });
        }
    }
    throw error;
});

export default {
    async verifyEmail(code) {
        const response = await axios.get(`/auth/verifyEmail/${code}`);
        return response.data;
    },
    async validate() {
        await axios.get('/validate');
    },
    async register(email, username, password) {
        const response = await axios.post('/register', { email, username, password });
        return response.data;
    },
    async login(options = {}) {
        const response = await axios.post('/login', options);
        localStorage['idToken'] = response.data['idToken'];
        localStorage['refreshToken'] = response.data['refreshToken'];
        return response.data;
    },
    async checkEmail(email) {
        const response = await axios.post('/check_email', { email });
        return response.data;
    },
    async getProfile() {
        return (await axios.get('/profile')).data;
    },
    async getPlaylists() {
        const playlists = (await axios.get('/playlists')).data;
        return [...playlists.items];
    },
    async getPlaylist(playlist_id) {
        return (await axios.get(`/playlists/${playlist_id}`)).data;
    },
    async addTrackToPlaylist(playlist_id, track) {
        await axios.post(`/playlists/${playlist_id}/tracks`, { tracks: [track.id] });
    },
    async removeTrackFromPlaylist(playlist_id, track) {
        await axios.delete(`/playlists/${playlist_id}/tracks`, { tracks: [track.id] });
    },
    async createPlaylist(name) {
        return (await axios.post('/playlists', { name })).data;
    },
    async search(query) {
        const response = (await axios.post('/search', { query })).data;
        window.sessionStorage['search_results'] = JSON.stringify(response);
        return response;
    },
    async getArtist(artist_id) {
        return (await axios.get(`/artists/${artist_id}`)).data;
    },
    async getAlbum(album_id) {
        const album = (await axios.get(`/albums/${album_id}`)).data;
        album.tracks.items.forEach(e => e['album'] = { name: album.name, images: album.images });
        return album;
    },
    async spotifyCheck(code) {
        const response = await axios.post('/spotify/auth', { code });
        if (response.data['token']) {
            return response.data;
        }
    },
    getTrackUrl(track) {
        return `${api_url}/stream/${localStorage['idToken']}/${track['id']}`;
    },
    getPicture(object, index, unset = '/images/music-box-multiple-outline@4x.png') {
        if (object.images && object.images.length) {
            return (object.images[index] || object.images[0]).url;
        }
        return unset;
    },
    get spotify() {
        return `${api_url}/spotify`;
    }
}