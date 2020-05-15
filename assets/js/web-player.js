import { EventEmitter } from 'events';
import drippy from './drippy-api';

const audio = new Audio();

class Player extends EventEmitter {

    constructor() {
        super();
        this._tracks = [];
        this._playing = false;
        this.now_playing = 0;
    }

    get current() {
        return this._tracks[this.now_playing] || {};
    }

    set position(value) {
        audio.currentTime = value;
    }

    next() {
        if (!this._tracks[this.now_playing + 1]) {
            this.now_playing = 0;
        } else this.now_playing++;
        this.play();
    }

    previous() {
        if (!this._tracks[this.now_playing - 1]) {
            this.now_playing = this._tracks.length - 1;
        } else this.now_playing--;
        this.play();
    }

    resume() {
        audio.play();
    }

    pause() {
        audio.pause();
    }

    shuffle() {
        this.now_playing = 0;
        this._tracks = this._tracks.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort).map((a) => a.value);
        this.play();
    }

    play(track, track_list) {
        audio.pause();
        drippy.validate().then(() => {
            if (track_list) this._tracks = [...track_list];

            if (track) {
                let found = this._tracks.find(e => e['id'] === track['id']);
                this.now_playing = this._tracks.indexOf(found);
            }

            if (this.current) {
                this.emit('playback-started', this.current);
                audio.src = drippy.getTrackUrl(this.current);
                audio.onloadeddata = () => audio.play();
            }
        });
    }

    toggle() {
        if (this.current) {
            if (audio.paused) {
                this.resume();
            } else {
                this.pause();
            }
        }
    }

}

const player = new Player();
audio.addEventListener('timeupdate', () => player.emit('update', audio.currentTime));
audio.addEventListener('play', () => player.emit('state', !audio.paused));
audio.addEventListener('pause', () => player.emit('state', !audio.paused));
audio.addEventListener('ended', () => {
    player.now_playing++;
    player.play();
});

export default player;