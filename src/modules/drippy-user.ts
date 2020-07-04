export default class User {

    private readonly _profile: Profile;
    private readonly _collection: Collection;

    public constructor(profile: Profile) {
        this._profile = profile;
        this._collection = {} as Collection;
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