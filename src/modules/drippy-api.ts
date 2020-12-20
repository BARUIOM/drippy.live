import Axios from 'axios'

import Utils, { LocalStorage, SessionStorage } from './utils';
import SpotifyClient from './spotify-api'
import User, { Profile } from './drippy-user'

const api_url = '' || 'https://api.drippy.live';
const axios = Axios.create({ baseURL: api_url });

axios.interceptors.request.use(config => {
    if (LocalStorage.has('session')) {
        const session = LocalStorage.get('session') as UserSession;
        config.headers['User-Token'] = session.idToken;
    }
    return config;
});

axios.interceptors.response.use(e => e, error => {
    if (error.config && error.response && error.response.status === 401) {
        const session = LocalStorage.get('session') as UserSession;
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

const spotify = new SpotifyClient(async () => {
    const data = (await axios.get('/token')).data;
    return data['token'];
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
        return await spotify.getPlaylist(playlist_id);
    }

    public async followPlaylist(playlist: any, user: User) {
        await spotify.followPlaylist(playlist['id']);
        user.collection._playlists.unshift(playlist);
    }

    public async unfollowPlaylist(playlist_id: string, user: User) {
        await spotify.unfollowPlaylist(playlist_id);
        user.collection._playlists.remove(playlist_id);
    }

    public async addTracksToPlaylist(playlist_id: string, tracks: any[]) {
        await spotify.addTracksToPlaylist(playlist_id, tracks.map(e => e['id']));
    }

    public async removeTrackFromPlaylist(playlist_id: string, track: any) {
        await spotify.removeTracksFromPlaylist(playlist_id, [track.id]);
    }

    public async createPlaylist(name: string, user: User) {
        const playlist = await spotify.createPlaylist(name,
            Manager.user.profile.id);
        user.collection._playlists.unshift(playlist);
        return playlist;
    }

    public async search(query: string): Promise<SearchResults> {
        const results = new Map<string, Array<any>>();
        const response = await spotify.search(query,
            ['artist', 'track', 'playlist', 'album'], 10);

        for (let key of Object.keys(response))
            results.set(key, response[key].items);

        if (results.has('albums') && results.has('tracks')) {
            const singles = (results.get('albums')?.filter(e => e['album_type'] == 'single')
                .map(e => e['name']) as string[]).filter(e => results.get('tracks')?.find(t => t['name'] === e));
            results.set('albums', results.get('albums')?.filter(e => !singles.includes(e['name'])) as any[]);
        }

        if (results.has('tracks')) {
            const tracks = Utils.collect(results.get('tracks') as any[], 'name');
            results.set('tracks', tracks);
        }

        const data = Array.from(results).reduce((obj, [key, value]) =>
            Object.assign(obj, { [key]: value }), {});
        SessionStorage.set('search_results', data);
        return data as SearchResults;
    }

    public getArtist(artist_id: string): Promise<any> {
        return spotify.getArtist(artist_id);
    }

    public async getCollection(artist_id: string, type: 'album' | 'single' | 'appears_on' | 'compilation'): Promise<any> {
        const collection = await (async function list(offset: number = 0) {
            const items = new Array();
            const albums = await spotify.getArtistAlbums(artist_id, [type], 50, offset);
            (albums.items as Array<any>).forEach(e => items.push(e));

            if (albums.next) {
                (await list(offset + albums.items.length))
                    .forEach(e => items.push(e));
            }

            return items;
        })();

        return Utils.collect(collection, 'name').map(e =>
            Object.assign(e, {
                release_date: Date.parse(e['release_date'])
            })
        ).sort((a, b) => b['release_date'] - a['release_date']);;
    }

    public async getAlbum(album_id: string) {
        const album = await spotify.getAlbum(album_id);
        (album.tracks.items as any[]).forEach(e =>
            e['album'] = {
                id: album.id,
                name: album.name,
                images: album.images
            }
        );
        return album;
    }

    public async getTrack(track_id: string) {
        return await spotify.getTrack(track_id);
    }

    public async spotifyCheck(code: string): Promise<SpotifyAuthResponse | undefined> {
        const response = await axios.post('/spotify/auth', { code });
        if (response.data['token'])
            return response.data as SpotifyAuthResponse;
    }

    /* discontinued
    public async createSession(id: string): Promise<string> {
        const response = await axios.get(`/stream/${id}`);
        return `${api_url}/audio/${response.data['digest']}`;
    }
    */

    public async getAudio(id: string): Promise<string> {
        const response = await axios.get(`/stream/${id}`);

        if ('session' in response.data) {
            return `${api_url}/audio/${response.data['session']}`;
        }
        return response.data['uri'];
    }

    public get url() {
        return api_url;
    }

}

export declare interface SearchResults {

    readonly tracks: any[];
    readonly artists: any[];
    readonly playlists: any[];
    readonly albums: any[];

}

export class Manager {

    private static _user: User;

    public static async getUser(): Promise<User> {
        await spotify.initialize();
        const profile = await (async (): Promise<Profile> => {
            if (!LocalStorage.has('profile')) {
                const user = await spotify.getUser();
                const profile = {
                    id: user.id,
                    name: user.display_name,
                    photo: ((user.images[0] || { url: null }) as any)['url']
                };

                LocalStorage.set('profile', profile);
            }

            return LocalStorage.get('profile') as Profile;
        })();

        return Manager._user = new User(spotify, profile);
    }

    public static get user() {
        return Manager._user;
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