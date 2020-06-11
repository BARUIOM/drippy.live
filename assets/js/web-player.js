import { EventEmitter } from 'events';
import drippy from './drippy-api';

const audio = new Audio();

class Player extends EventEmitter {

    constructor() {
        super();
        this._tracks = [];
        this._playing = false;
        this._index = 0;
    }

    get playlist() {
        return this._tracks;
    }

    set playlist(value) {
        this._tracks = value;
    }

    get loaded() {
        return this._tracks.length > 0;
    }

    get index() {
        return this._index;
    }

    set position(value) {
        audio.currentTime = value;
    }

    next() {
        if (!this._tracks[this._index + 1]) {
            this._index = 0;
        } else this._index++;
        this.play(this._index);
    }

    previous() {
        if (!this._tracks[this._index - 1]) {
            this._index = this._tracks.length - 1;
        } else this._index--;
        this.play(this._index);
    }

    resume() {
        audio.play();
    }

    pause() {
        audio.pause();
    }

    shuffle() {
        this._tracks = this._tracks.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort).map((a) => a.value);
        this.play(0);
    }

    play(index) {
        audio.pause();
        drippy.validate().then(() => {
            this._index = index;
            this.emit('playback-started', this._tracks[index], index);
            audio.src = drippy.getTrackUrl(this._tracks[index]);
            audio.onloadeddata = () => audio.play();
        });
    }

    toggle() {
        audio.paused ? this.resume() : this.pause();
    }

}

const player = new Player();
audio.addEventListener('timeupdate', () => player.emit('update', audio.currentTime));
audio.addEventListener('play', () => player.emit('state', !audio.paused));
audio.addEventListener('pause', () => player.emit('state', !audio.paused));
audio.addEventListener('ended', () => player.play(player._index + 1));

export default player;