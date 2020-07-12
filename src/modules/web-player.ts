import { EventEmitter } from 'events';
import drippy from '@/modules/drippy-api'

const audio = new Audio();

export enum State {

    Paused, Playing

}

export enum Mode {

    RepeatNone, RepeatAll, RepeatOnce

}

export class Player extends EventEmitter {

    public static readonly Instance = new Player();

    private _index: number = 0;
    private _playlist: any[] = [];
    private _state: State = State.Paused;
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
            audio.play().then(() => {
                Player.Instance.emit('playback-started', Player.Instance.playlist[Player.Instance.index], Player.Instance.index);
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