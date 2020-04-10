import { EventEmitter } from 'events';
import drippy from "./drippy.js";

const audio = new Audio();

class Player extends EventEmitter {

    constructor() {
        super();
        this._tracks = [];
        this._playing = false;
        this.now_playing = 0;
    }

    get current() {
        return this._tracks[this.now_playing];
    }

    set tracks(value) {
        this._tracks = [...value];
    }

    set position(value) {
        audio.currentTime = value;
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
    }

    pause() {
        audio.pause();
    }

    play(track) {
        audio.pause();
        drippy.validate().then(() => {
            if (track) {
                let found = this._tracks.find(e => e['data'] === track['data']);
                this.now_playing = this._tracks.indexOf(found);
            }

            if (this.current) {
                this.emit('playback-started', this.current);
                audio.src = drippy.getTrackUrl(this.current);
                audio.play();
            }
        }).catch(async (error) => {
            if (error.response && error.response.status == 403) {
                await drippy.refresh();
                this.play(track);
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
    if (player.now_playing < player._tracks.length) {
        player.play();
    } else player.pause();
});

export default player;