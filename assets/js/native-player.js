import { EventEmitter } from 'events';

class Player extends EventEmitter {

    play(track, track_list) {
        window.native.play(localStorage['idToken'], localStorage['refreshToken'], JSON.stringify(track), JSON.stringify(track_list));
    }

}

export default new Player();