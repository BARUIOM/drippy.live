import { EventEmitter } from 'events';

export default (() => {
    if (window.native) {
        var tracks = [];

        class Player extends EventEmitter {

            play(track, track_list) {
                tracks = [...track_list];
                const index = tracks.indexOf(tracks.find(e => e['id'] === track['id']));
                window.native.play(localStorage['idToken'], localStorage['refreshToken'], index, JSON.stringify(tracks));
            }

            toggle() {
                window.native.toggle();
            }

        }

        const player = new Player();
        window.native.event = new EventEmitter();
        window.native.event.on('state', value => player.emit('state', value));
        window.native.event.on('started', index => player.emit('playback-started', tracks[index]));
        return player;
    }
})();