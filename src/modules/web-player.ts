import { EventEmitter } from 'events';
import drippy from '@/modules/drippy-api'

const audio = new Audio();

export class Player extends EventEmitter {

    private _playlist: string[] = [];

    public play(index: number): void {
        audio.pause();
        drippy.createSession(this.playlist[index]).then(src => {
            audio.src = src;
            audio.load();
        });
    }

    public get playlist() {
        return this._playlist;
    }

    public set playlist(playlist: string[]) {
        this._playlist = playlist;
    }

}

const player = new Player();
audio.addEventListener('timeupdate', () => player.emit('update', audio.currentTime));
audio.addEventListener('play', () => player.emit('state', !audio.paused));
audio.addEventListener('pause', () => player.emit('state', !audio.paused));
audio.addEventListener('loadeddata', async () => {
    await audio.play();
});

export default player;