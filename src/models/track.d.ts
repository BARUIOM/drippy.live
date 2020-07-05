import Artist from './artist'

declare interface Track {

    title: string;
    artists: Artist[];
    duration: number;
    artwork_url?: string;

}

export default Track;