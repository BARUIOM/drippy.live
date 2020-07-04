import Axios from 'axios'
import User from './drippy-user'

const api_url = '' || 'https://api.drippy.live';
const axios = Axios.create({ baseURL: api_url });

axios.interceptors.request.use(config => {
    config.headers['User-Token'] = localStorage['idToken'];
    return config;
});

axios.interceptors.response.use(e => e, error => {
    if (error.config && error.response && error.response.status === 401) {
        return axios.post('/refresh', { refresh_token: localStorage['refreshToken'] }).then(response => {
            localStorage['idToken'] = response.data['id_token'];
            localStorage['refreshToken'] = response.data['refresh_token'];
            error.config.headers['User-Token'] = response.data['id_token'];
            return Axios.request(error.config);
        });
    }
    throw error;
});

export class Drippy {

    public async validate(): Promise<void> {
        if (!localStorage['idToken'])
            throw new Error('User not authenticated');

        await axios.get('/validate');
    }

    public async register(email: string, username: string, password: string): Promise<MessageResponse> {
        const response = await axios.post('/register', { email, username, password });
        return response.data as MessageResponse;
    }

    public async login(options: object | any): Promise<LoginResponse> {
        const response = await axios.post('/login', options);
        localStorage['idToken'] = response.data['idToken'];
        localStorage['refreshToken'] = response.data['refreshToken'];
        return response.data as LoginResponse;
    }

    public async checkEmail(email: string): Promise<MessageCodeResponse> {
        const response = await axios.post('/check_email', { email });
        return response.data as MessageCodeResponse;
    }

    public async getPlaylist(playlist_id: string) {
        return (await axios.get(`/playlist/${playlist_id}`)).data;
    }

    public async addTracksToPlaylist(playlist_id: string, tracks: any[]) {
        await axios.post(`/playlist/${playlist_id}/tracks`, { tracks: tracks.map(e => e['id']) });
    }

    public async removeTrackFromPlaylist(playlist_id: string, track: any) {
        await axios.delete(`/playlist/${playlist_id}/tracks`, { data: { tracks: [track.id] } });
    }

    public async createPlaylist(name: string, user: User) {
        const playlist = (await axios.post('/collection/playlists', { name })).data;
        user.collection.playlists.unshift(playlist);
        return playlist;
    }

    public async search(query: string) {
        const response = (await axios.post('/search', { query })).data;
        window.sessionStorage['search_results'] = JSON.stringify(response);
        return response;
    }

    public async getArtist(artist_id: string) {
        return (await axios.get(`/artists/${artist_id}`)).data;
    }

    public async getAlbum(album_id: string) {
        const album = (await axios.get(`/albums/${album_id}`)).data;
        (album.tracks.items as any[]).forEach(e => e['album'] = { id: album.id, name: album.name, images: album.images });
        return album;
    }

    public async getTrack(track_id: string) {
        return (await axios.get(`/track/${track_id}`)).data;
    }

    public async spotifyCheck(code: string): Promise<SpotifyAuthResponse | undefined> {
        const response = await axios.post('/spotify/auth', { code });
        if (response.data['token'])
            return response.data as SpotifyAuthResponse;
    }

    public async createSession(id: string): Promise<string> {
        const response = await axios.get(`/stream/${id}`);
        return `${api_url}/audio/${response.data['digest']}`;
    }

    public get url() {
        return api_url;
    }

}

export class Manager {

    public static async getUser(): Promise<User> {
        const user = new User((await axios.get('/profile')).data);
        user.playlists = (await axios.get('/collection/playlists')).data;
        user.following = (await axios.get('/collection/artists')).data;
        user.albums = (await axios.get('/collection/albums')).data;
        user.tracks = (await axios.get('/collection/tracks')).data;
        return user;
    }

}

export declare interface LoginResponse {

    readonly uid: string
    readonly email: string
    readonly displayName: string

    readonly idToken: string
    readonly refreshToken: string

}

export declare interface MessageResponse {

    readonly message?: string

}

export declare interface MessageCodeResponse extends MessageResponse {

    readonly code: string

}

export declare interface SpotifyAuthResponse extends MessageResponse {

    readonly token: string

}

const drippy = new Drippy();
export default drippy;