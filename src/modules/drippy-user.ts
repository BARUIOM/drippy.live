import { EventEmitter } from 'events'

import Container from '@/models/container'
import SpotifyClient from './spotify-api';

export default class User extends EventEmitter {

    private readonly _profile: Profile;
    private readonly _collection: Collection = new Collection();

    public constructor(client: SpotifyClient, profile: Profile) {
        super();
        this._profile = profile;

        (async function list(offset: number = 0) {
            const items = new Array();
            const response = await client.getUserPlaylists(offset);
            (response['items'] as Array<any>).forEach(e => items.push(e));

            if (response['next']) {
                (await list(offset + items.length))
                    .forEach(e => items.push(e));
            }

            return items;
        })().then(playlists => {
            this._collection.playlists = playlists;
            this.emit('ready');
        });

        (async function list(after?: string) {
            const items = new Array();
            const response = await client.getFollowedArtists(after);
            (response['items'] as Array<any>).forEach(e => items.push(e));

            if (response['next']) {
                (await list(items[items.length - 1]['id']))
                    .forEach(e => items.push(e));
            }

            return items;
        })().then(artists => {
            this._collection.following = artists;
            this.emit('ready');
        });

        (async function list(offset: number = 0) {
            const items = new Array();
            const response = await client.getSavedAlbums(offset);
            (response['items'] as Array<any>).forEach(e => items.push(e));

            if (response['next']) {
                (await list(offset + items.length))
                    .forEach(e => items.push(e));
            }

            return items;
        })().then(albums => {
            this._collection.albums = albums;
            this.emit('ready');
        });

        (async function list(offset: number = 0) {
            const items = new Array();
            const response = await client.getSavedTracks(offset);
            (response['items'] as Array<any>).forEach(e => items.push(e));

            if (response['next']) {
                (await list(offset + items.length))
                    .forEach(e => items.push(e));
            }

            return items;
        })().then(tracks => {
            this._collection.tracks = tracks;
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