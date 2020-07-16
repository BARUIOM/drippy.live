import { AxiosInstance } from 'axios'

export default class User {

    private readonly _axios: AxiosInstance;
    private readonly _profile: Profile;
    private readonly _collection: Collection;

    public constructor(axios: AxiosInstance, profile: Profile, playlists: any[]) {
        this._axios = axios;
        this._profile = profile;
        this._collection = {} as Collection;
        this._collection.playlists = playlists;
    }

    public get profile(): Profile {
        return this._profile;
    }

    public get collection(): Collection {
        return this._collection;
    }

    public set playlists(playlists: any[]) {
        this._collection.playlists = playlists;
    }

    public set following(following: any[]) {
        this._collection.following = following;
    }

    public set albums(albums: any[]) {
        this._collection.albums = albums;
    }

    public set tracks(tracks: any[]) {
        this._collection.tracks = tracks;
    }

    public async getFollowing(): Promise<any[]> {
        this.following = (await this._axios.get('/collection/artists')).data;
        return this._collection.following;
    }

    public async getSavedAlbums(): Promise<any[]> {
        this.albums = (await this._axios.get('/collection/albums')).data;
        return this._collection.albums;
    }

    public async getSavedTracks(): Promise<any[]> {
        this.tracks = (await this._axios.get('/collection/tracks')).data;
        return this._collection.tracks;
    }

}

export declare interface Profile {

    readonly id: string;
    readonly name: string;
    readonly photo?: string;

}

export declare interface Collection {

    playlists: any[]
    following: any[]
    albums: any[]
    tracks: any[]

}