import { EventEmitter } from 'events';
import drippy from './drippy-api';

const audio = new Audio();

const canvas = document.createElement('canvas');
canvas.width = canvas.height = 512;
const context = canvas.getContext('2d');

const video = document.createElement('video');
video.muted = true;

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

    get track() {
        return this._tracks[this._index] || {};
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

    display() {
        video.play().then(() => video.requestPictureInPicture());
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
    const track = player._tracks[player._index];
    player.emit('playback-started', track, player._index);

    await audio.play();
    if ('mediaSession' in navigator) {
        const artwork = getArtworks(track);
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track['name'],
            artist: track['artists'][0].name,
            album: track['album'].name,
            artwork
        });

        navigator.mediaSession.setActionHandler('play', () => player.resume());
        navigator.mediaSession.setActionHandler('pause', () => player.pause());
        navigator.mediaSession.setActionHandler('previoustrack', () => player.previous());
        navigator.mediaSession.setActionHandler('nexttrack', () => player.next());

        if (!video.readyState)
            video.srcObject = canvas.captureStream();

        const image = new Image();
        image.crossOrigin = true;
        image.src = artwork[0].src;

        await image.decode();
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
});

export default player;