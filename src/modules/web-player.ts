import { EventEmitter } from 'events';
import drippy from '@/modules/drippy-api'

const audio = new Audio();

export class Player extends EventEmitter {

    private _index: number = 0;
    private _playlist: any[] = [];

    public play(index: number): void {
        audio.pause();
        drippy.createSession(this.playlist[index]['id']).then(src => {
            this._index = index;
            audio.src = src;
            audio.load();
        });
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

}

export declare interface Player extends EventEmitter {

    on(type: 'update', listener: () => void): this;
    on(type: 'state', listener: (playing: boolean) => void): this;
    on(type: 'playback-started', listener: (track: any, index: number) => void): this;

}

const player = new Player();
audio.addEventListener('timeupdate', () => player.emit('update'));
audio.addEventListener('play', () => player.emit('state', !audio.paused));
audio.addEventListener('pause', () => player.emit('state', !audio.paused));
audio.addEventListener('loadeddata', () => {
    audio.play().then(() => {
        player.emit('playback-started', player.playlist[player.index], player.index);
    });
});

export default player;