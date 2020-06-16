import { EventEmitter } from 'events';
import drippy from './drippy-api';

const audio = new Audio();

function getArtworks(track) {
    return track['album'].images
        .map(e => ({ src: e['url'], sizes: `${e['width']}x${e['height']}`, type: 'image/jpg' }));
}

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
        this._index = index;
        drippy.createSession(this._tracks[index]).then(src => {
            audio.src = src;
            audio.load();
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
audio.addEventListener('ended', () => {
    if ((player._index + 1) < player.playlist.length)
        player.play(player._index + 1)
});
audio.addEventListener('loadeddata', async () => {
    player.emit('playback-started', player._tracks[player._index], player._index);
    await audio.play();
    if ('mediaSession' in navigator) {
        const track = player._tracks[player._index];
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track['name'],
            artist: track['artists'][0].name,
            album: track['album'].name,
            artwork: getArtworks(track)
        });

        navigator.mediaSession.setActionHandler('play', () => player.resume());
        navigator.mediaSession.setActionHandler('pause', () => player.pause());
        navigator.mediaSession.setActionHandler('previoustrack', () => player.previous());
        navigator.mediaSession.setActionHandler('nexttrack', () => player.next());
    }
});

export default player;