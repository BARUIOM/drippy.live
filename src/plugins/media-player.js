import { EventEmitter } from 'events';
import drippy from "./drippy.js";

const audio = new Audio();

class Player extends EventEmitter {

    constructor() {
        super();
        this._tracks = [];
        this.playing = false;
        this.now_playing = 0;
    }

    get current() {
        return this._tracks[this.now_playing];
    }

    set tracks(value) {
        this._tracks = [...value];
    }

    next() {
        this.now_playing = Math.min(this.now_playing + 1, this._tracks.length - 1);
        this.play();
    }

    previous() {
        this.now_playing = Math.max(this.now_playing - 1, 0);
        this.play();
    }

    resume() {
        audio.play();
        this.emit('resume');
    }

    pause() {
        audio.pause();
        this.emit('pause');
    }

    play(track) {
        audio.pause();
        if (track) {
            if (!this._tracks.includes(track)) {
                this._tracks.push(track);
            }

            this.now_playing = this._tracks.indexOf(track);
        }

        if (this.current) {
            audio.src = drippy.getTrackUrl(this.current);
            audio.play();
            this.emit('playback-started', this.current);
            this.emit('resume');
        }
    }

    toggle() {
        if (audio.paused) {
            this.resume();
        } else {
            this.pause();
        }
    }

}

const player = new Player();
audio.addEventListener('play', () => player.playing = !audio.paused);
audio.addEventListener('pause', () => player.playing = !audio.paused);
audio.addEventListener('ended', () => {
    player.now_playing++;
    if (player.now_playing < player._tracks.length) player.play();
});

export default player;