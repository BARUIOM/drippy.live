import Axios from 'axios'
import Spotify from './spotify-api';

const data = {
    get profile() {
        if (localStorage['profile']) {
            return JSON.parse(localStorage['profile']);
        }
    },
    set profile(value) {
        localStorage['profile'] = JSON.stringify(value);
    },
    get spotify() {
        return client.user;
    }
}

const api_url = '' || 'https://api.drippy.live';
const exclude = ['/refresh', '/login', '/register'];
const axios = Axios.create({ baseURL: api_url });

const client = new Spotify();
client.on('user', user => {
    data.profile = { name: user['display_name'], photo: (user.images[0] || { url: null }).url };
});

client.callback = async () => {
    const response = await axios.get('/token');
    return response.data['access_token'];
};

axios.interceptors.request.use(config => {
    if (!exclude.includes(config.url)) {
        config.headers['User-Token'] = localStorage['idToken'];
    }
    return config;
});

axios.interceptors.response.use(null, error => {
    if (error.config && error.response && error.response.status === 403) {
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
    async getPlaylists() {
        const playlists = await client.getUserPlaylists();
        return [...playlists.items];
    },
    async getPlaylist(playlist_id) {
        return await client.getPlaylist(playlist_id);
    },
    async addTrackToPlaylist(playlist_id, track) {
        await client.addTracksToPlaylist(playlist_id, track.id);
    },
    async removeTrackFromPlaylist(playlist_id, track) {
        await client.removeTracksFromPlaylist(playlist_id, track.id);
    },
    async createPlaylist(name) {
        if (data.spotify) {
            return await client.createPlaylist(name);
        }
    },
    async search(query) {
        const result = {};
        const response = await client.search(query, ['artist', 'track', 'playlist', 'album'], 10);
        for (let key of Object.keys(response)) result[key] = response[key].items;
        window.sessionStorage['search_results'] = JSON.stringify(result);
        return result;
    },
    async getArtist(artist_id) {
        var collection = [];
        const artist = await client.getArtist(artist_id);
        await (async () => {
            let albums, offset = 0;
            do {
                albums = await client.getArtistAlbums(artist_id, ['album', 'single'], 50, offset);
                collection = collection.concat(albums.items);
                offset += albums.items.length;
            } while (albums.next);
        })();

        artist['albums'] = collection.filter(e => e.album_type === 'album');
        artist['singles'] = collection.filter(e => e.album_type === 'single');
        return artist;
    },
    async getAlbum(album_id) {
        const album = await client.getAlbum(album_id);
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
    },
    get profile() {
        return data.profile;
    }
}