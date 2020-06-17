import { EventEmitter } from 'events';

export default (() => {
    if (window.native) {
        var _index = 0;
        var _tracks = [];

        class Player extends EventEmitter {

            get playlist() {
                return _tracks;
            }

            set playlist(value) {
                window.native.setData(localStorage['idToken'], localStorage['refreshToken']);
                window.native.load(JSON.stringify(_tracks = value));
            }

            get loaded() {
                return _tracks.length > 0;
            }

            get index() {
                return _index;
            }

            get track() {
                return _tracks[_index] || {};
            }

            play(index) {
                window.native.play(_index = index);
            }

            toggle() {
                window.native.toggle();
            }

        }

        const player = new Player();
        window.native.event = new EventEmitter();
        window.native.event.on('state', value => player.emit('state', value));
        window.native.event.on('started', index => player.emit('playback-started', _tracks[index], index));
        return player;
    }
})();