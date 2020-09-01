import Album from './album'
import Artist from './artist'

declare interface Artwork {

    url: string;

}

declare interface Track {

    id: string;
    title: string;
    album: Album;
    artists: Artist[];
    duration: number;
    images: Artwork[];

}

export default Track;