import Axios from 'axios'
import { LocalStorage, SessionStorage } from 'quasar'

import User from './drippy-user'

const api_url = '' || 'https://api.drippy.live';
const axios = Axios.create({ baseURL: api_url });
const thumbnails = {
    artist: {
        url: require('@/assets/person_white.png')
    },
    collection: {
        url: require('@/assets/library_music.png')
    }
};

axios.interceptors.request.use(config => {
    if (LocalStorage.has('session')) {
        const session = LocalStorage.getItem('session') as UserSession;
        config.headers['User-Token'] = session.idToken;
    }
    return config;
});

axios.interceptors.response.use(e => e, error => {
    if (error.config && error.response && error.response.status === 401) {
        const session = LocalStorage.getItem('session') as UserSession;
        return axios.post('/refresh', { refresh_token: session.refreshToken }).then(response => {
            error.config.headers['User-Token'] = response.data['id_token'];
            LocalStorage.set('session', {
                idToken: response.data['id_token'],
                refreshToken: response.data['refresh_token']
            } as UserSession);
            return Axios.request(error.config);
        });
    }
    throw error;
});

export class Drippy {

    public async validate(): Promise<void> {
        if (!LocalStorage.has('session'))
            throw new Error('User not authenticated');

        await axios.get('/validate');
    }

    public async register(email: string, username: string, password: string): Promise<MessageResponse> {
        const response = await axios.post('/register', { email, username, password });
        return response.data as MessageResponse;
    }

    public async login(options: object | any): Promise<LoginResponse> {
        const response = await axios.post('/login', options);
        LocalStorage.set('session', {
            idToken: response.data['idToken'],
            refreshToken: response.data['refreshToken']
        } as UserSession);
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
        SessionStorage.set('search_results', response);
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

    public get thumbnails() {
        return thumbnails;
    }

}

export class Manager {

    public static async getUser(): Promise<User> {
        const profile = (await axios.get('/profile')).data;
        const playlists = (await axios.get('/collection/playlists')).data;
        return new User(axios, profile, playlists);
    }

}

export declare interface UserSession {

    readonly idToken: string
    readonly refreshToken: string

}

export declare interface LoginResponse extends UserSession {

    readonly uid: string
    readonly email: string
    readonly displayName: string

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