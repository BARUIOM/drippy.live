import { EventEmitter } from 'events';

class Player extends EventEmitter {

    play(track, track_list) {
        const tracks = [...track_list];
        const index = tracks.indexOf(tracks.find(e => e['id'] === track['id']));
        window.native.play(localStorage['idToken'], localStorage['refreshToken'], index, JSON.stringify(tracks));
    }

}

export default new Player();