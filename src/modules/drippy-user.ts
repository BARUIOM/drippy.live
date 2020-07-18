import { AxiosInstance } from 'axios'
import { EventEmitter } from 'events'

import Container from '@/models/container'

export default class User extends EventEmitter {

    private readonly _profile: Profile;
    private readonly _collection: Collection = new Collection();

    public constructor(axios: AxiosInstance, profile: Profile) {
        super();
        this._profile = profile;
        axios.get('/collection/playlists').then(response => {
            this._collection.playlists = response.data;
            this.emit('ready');
        });
        axios.get('/collection/artists').then(response => {
            this._collection.following = response.data;
            this.emit('ready');
        });
        axios.get('/collection/albums').then(response => {
            this._collection.albums = response.data;
            this.emit('ready');
        });
        axios.get('/collection/tracks').then(response => {
            this._collection.tracks = response.data;
            this.emit('ready');
        });
    }

    public get profile(): Profile {
        return this._profile;
    }

    public get collection(): Collection {
        return this._collection;
    }

}

export declare interface Profile {

    readonly id: string;
    readonly name: string;
    readonly photo?: string;

}

export class Collection {

    public readonly _playlists: Container<any> = new Container();
    public readonly _following: Container<any> = new Container();
    public readonly _albums: Container<any> = new Container();
    public readonly _tracks: Container<any> = new Container();

    get playlists(): any[] {
        return this._playlists.collection;
    }

    set playlists(values: any[]) {
        this._playlists.collection = values;
    }

    get following(): any[] {
        return this._following.collection;
    }

    set following(values: any[]) {
        this._following.collection = values;
    }

    get albums(): any[] {
        return this._albums.collection;
    }

    set albums(values: any[]) {
        this._albums.collection = values;
    }

    get tracks(): any[] {
        return this._tracks.collection;
    }

    set tracks(values: any[]) {
        this._tracks.collection = values;
    }

}