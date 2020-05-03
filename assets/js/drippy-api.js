import Axios from 'axios'
const api_url = '' || 'https://api.drippy.live';

const data = {
    get userdata() {
        if (window.localStorage["USER_DATA"]) {
            return JSON.parse(window.localStorage["USER_DATA"]);
        }
        return {};
    },
    set userdata(value) {
        window.localStorage["USER_DATA"] = JSON.stringify(value);
    },
    get token() {
        return this.userdata['idToken'];
    },
    set token(token) {
        let data = this.userdata;
        data['idToken'] = token;
        this.userdata = data;
    },
    get refresh_token() {
        return this.userdata['refreshToken'];
    },
    set refresh_token(token) {
        let data = this.userdata;
        data['refreshToken'] = token;
        this.userdata = data;
    }
}

const exclude = ['/refresh', '/login', '/register'];
const axios = Axios.create({ baseURL: api_url });
axios.interceptors.request.use(config => {
    if (!exclude.includes(config.url)) {
        config.headers['User-Token'] = data.token;
    }
    return config;
});

axios.interceptors.response.use(null, error => {
    if (error.config && error.response && error.response.status === 403) {
        if (!exclude.includes(error.config.url)) {
            return refresh().then(() => axios.request(error.config));
        }
    }
    throw error;
});

const refresh = async () => {
    const response = await axios.post('/refresh', { refresh_token: data.refresh_token });
    data.token = response.data['idToken'];
    data.refresh_token = response.data['refreshToken'];
}

export default {
    async verifyEmail(code) {
        const response = await axios.get(`/auth/verifyEmail/${code}`);
        return response.data;
    },
    async validate() {
        if (!data.userdata['displayName']) delete window.localStorage["USER_DATA"];
        await axios.get('/validate');
    },
    async refresh() {
        await refresh();
    },
    async register(email, username, password) {
        const response = await axios.post('/register', { email, username, password });
        return response.data;
    },
    async login(options = {}) {
        const response = await axios.post('/login', options);
        data.userdata = response.data;
        return response.data;
    },
    async checkEmail(email) {
        const response = await axios.post('/check_email', { email });
        return response.data;
    },
    async getPlaylists() {
        if (!window.sessionStorage['playlists']) {
            const response = await axios.get('/playlists');
            window.sessionStorage["playlists"] = JSON.stringify(response.data);
            return [...response.data];
        }
        return [...JSON.parse(window.sessionStorage["playlists"])];
    },
    async getPlaylist(playlist_id) {
        const response = await axios.get(`/playlist/${playlist_id}`);
        return response.data;
    },
    async addTrackToPlaylist(playlist_id, track) {
        await axios.post('/save', { id: track.id, playlist: playlist_id });
        if (window.sessionStorage[playlist_id]) {
            let playlist = JSON.parse(window.sessionStorage[playlist_id]);
            playlist['tracks'].items.push({ track });
            window.sessionStorage[playlist_id] = JSON.stringify(playlist);
        }
    },
    async removeTrackFromPlaylist(playlist_id, track_id) {
        await axios.post('/remove', { id: track_id, playlist: playlist_id });
        if (window.sessionStorage[playlist_id]) {
            let playlist = JSON.parse(window.sessionStorage[playlist_id]);
            let song = playlist['tracks'].find(e => e['data'] == track_id);
            playlist['tracks'].splice(playlist['tracks'].indexOf(song), 1);
            window.sessionStorage[playlist_id] = JSON.stringify(playlist);
            return playlist['tracks'];
        }
    },
    async createPlaylist(name) {
        const response = await axios.post('/create_playlist', { name });
        if (window.sessionStorage['playlists']) {
            let playlists = [...JSON.parse(window.sessionStorage['playlists'])];
            playlists.unshift(response.data);
            window.sessionStorage['playlists'] = JSON.stringify(playlists);
        }
    },
    async search(query, type) {
        const response = await axios.post(`/search/${type}`, { query });

        let object = {};
        if (window.sessionStorage['search_results']) {
            object = JSON.parse(window.sessionStorage['search_results']);
        }

        object[type] = response.data;
        window.sessionStorage['search_results'] = JSON.stringify(object);
        return [...object[type]];
    },
    async getArtist(artist_id) {
        if (!window.sessionStorage[artist_id]) {
            const response = await axios.get(`/artist/${artist_id}`);
            window.sessionStorage[artist_id] = JSON.stringify(response.data);
            return response.data;
        }
        return JSON.parse(window.sessionStorage[artist_id]);
    },
    async getAlbum(album_id) {
        if (!window.sessionStorage[album_id]) {
            const response = await axios.get(`/album/${album_id}`);
            window.sessionStorage[album_id] = JSON.stringify(response.data);
            return response.data;
        }
        return JSON.parse(window.sessionStorage[album_id]);
    },
    async spotifyCheck(code) {
        const response = await axios.post('/spotify/auth', { code });
        if (response.data['token']) {
            return response.data;
        }
    },
    get spotify() {
        return `${api_url}/spotify`;
    },
    getTrackUrl(track) {
        return `${api_url}/stream/${data.token}/${track['id']}`;
    },
    get userdata() {
        return data.userdata;
    }
}