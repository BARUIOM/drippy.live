import { api_url } from "../main.js";

var playing = false;

const audio = new Audio();
audio.autoplay = true;
audio.addEventListener('play', () => playing = !audio.paused);
audio.addEventListener('pause', () => playing = !audio.paused);

export default {
    get playing() {
        return playing;
    },
    resume() {
        audio.play();
    },
    pause() {
        audio.pause();
    },
    play(track, user_token) {
        audio.src = `${api_url}/stream/${user_token}/${track['data']}`;
    }
}