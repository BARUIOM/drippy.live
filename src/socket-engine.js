const audio = new Audio();
audio.autoplay = true;

export default {
    sockets: {
        "stream-start"(type) {
            this.sockets.unsubscribe("stream-data");

            const mediaSource = new MediaSource();
            mediaSource.addEventListener('sourceended', () => this.sockets.unsubscribe("stream-data"));
            mediaSource.addEventListener('sourceopen', (event) => {
                let sourceBuffer = event.target.addSourceBuffer(type);
                sourceBuffer.onupdateend = () => this.$socket.emit("stream-data");

                this.sockets.subscribe("stream-data", data => {
                    if (data) {
                        if (data instanceof ArrayBuffer) {
                            sourceBuffer.appendBuffer(data);
                        } else if (data["end-of-stream"]) {
                            event.target.endOfStream();
                        }
                    } else {
                        this.$socket.emit("stream-data");
                    }
                });
                this.$socket.emit("stream-data");
            });

            audio.src = URL.createObjectURL(mediaSource);
        }
    },
    play: () => audio.play(),
    pause: () => audio.pause(),
    state: (listener) => {
        audio.addEventListener('play', () => listener(!audio.paused));
        audio.addEventListener('pause', () => listener(!audio.paused));
    }
}