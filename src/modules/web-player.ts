import { EventEmitter } from 'events';
import drippy from '@/modules/drippy-api'

const audio = new Audio();

const canvas = document.createElement('canvas');
canvas.width = canvas.height = 512;

const context = canvas.getContext('2d');
const video = document.createElement('video');
video.muted = true;

function getArtworks(track: any): MediaImage[] {
    return track['album'].images.map((e: any) => ({
        src: e['url'],
        sizes: `${e['width']}x${e['height']}`,
        type: 'image/jpg'
    }));
}

class Thumbnail extends Image {

    constructor(media: MediaImage) {
        super();
        this.crossOrigin = 'true';
        this.src = media.src;
    }

}

export enum State {

    Idle, Paused, Playing

}

export enum Mode {

    RepeatNone, RepeatAll, RepeatOnce

}

export class Player extends EventEmitter {

    public static readonly Instance = new Player();

    private _index: number = 0;
    private _playlist: any[] = [];
    private _state: State = State.Idle;
    private _mode: Mode = Mode.RepeatNone;

    private constructor() {
        super();
        audio.addEventListener('timeupdate', () => {
            Player.Instance.emit('update');
        });

        audio.addEventListener('play', () => {
            Player.Instance._state = State.Playing;
            Player.Instance.emit('update');
        });

        audio.addEventListener('pause', () => {
            Player.Instance._state = State.Paused;
            Player.Instance.emit('update');
        });

        audio.addEventListener('loadeddata', () => {
            audio.play().then(async () => {
                const track = Player.Instance.playlist[Player.Instance.index];
                Player.Instance.emit('playback-started', track, Player.Instance.index);

                if (navigator.mediaSession && context) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: track['name'],
                        artist: track['artists'][0].name,
                        album: track['album'].name,
                        artwork: getArtworks(track)
                    });

                    navigator.mediaSession.setActionHandler('play', () => audio.play());
                    navigator.mediaSession.setActionHandler('pause', () => audio.pause());
                    navigator.mediaSession.setActionHandler('previoustrack', () => Player.Instance.play(Player.Instance.index - 1));
                    navigator.mediaSession.setActionHandler('nexttrack', () => Player.Instance.play(Player.Instance.index + 1));

                    if (!video.readyState)
                        video.srcObject = (canvas as any).captureStream();

                    const image = new Thumbnail(navigator.mediaSession.metadata.artwork[0]);
                    await image.decode();

                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                }
            });
        });

        audio.addEventListener('ended', () => {
            if (Player.Instance._mode == Mode.RepeatOnce) {
                Player.Instance._mode = Mode.RepeatNone;
                return Player.Instance.play(Player.Instance._index);
            }

            if (Player.Instance._mode == Mode.RepeatAll && (Player.Instance._index + 1) == Player.Instance._playlist.length) {
                Player.Instance._mode = Mode.RepeatNone;
                return Player.Instance.play(0);
            }

            Player.Instance.play(Player.Instance._index + 1);
        });
    }

    public play(index: number): void {
        if (this.playlist[index] !== undefined) {
            audio.pause();
            drippy.createSession(this.playlist[index]['id']).then(src => {
                this._index = index;
                audio.src = src;
                audio.load();
            });
        }
    }

    public toggle(): void {
        this._state == State.Playing ? audio.pause() : audio.play();
    }

    public repeat(): void {
        switch (this._mode) {
            case Mode.RepeatNone:
                this._mode = Mode.RepeatAll;
                break;
            case Mode.RepeatAll:
                this._mode = Mode.RepeatOnce;
                break;
            case Mode.RepeatOnce:
                this._mode = Mode.RepeatNone;
        }
        this.emit('update');
    }

    public display(): void {
        video.play().then(() => (video as any).requestPictureInPicture());
    }

    public get index() {
        return this._index;
    }

    public get playlist() {
        return this._playlist;
    }

    public set playlist(playlist: any[]) {
        this._playlist = playlist;
    }

    public get position() {
        return audio.currentTime;
    }

    public set position(value: number) {
        audio.currentTime = value;
    }

    public get state() {
        return this._state;
    }

    public get mode() {
        return this._mode;
    }

}

export declare interface Player extends EventEmitter {

    on(type: 'update', listener: () => void): this;
    on(type: 'playback-started', listener: (track: any, index: number) => void): this;

}

export default Player.Instance;