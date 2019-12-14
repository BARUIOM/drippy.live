const stream_data = {
    audio: new Audio(),
    mediaSource: new MediaSource()
};

export default {
    sockets: {
        "stream-start"(type) {
            this.sockets.unsubscribe("stream-data");
            if (stream_data.mediaSource.readyState == "open") {
                stream_data.audio.pause();
                stream_data.mediaSource.endOfStream();
            }

            stream_data.stream_type = type;
            stream_data.mediaSource.onsourceopen = () => {
                let sourceBuffer = stream_data.mediaSource.addSourceBuffer(stream_data.stream_type);
                sourceBuffer.onupdateend = () => this.$socket.emit("stream-data");

                this.sockets.subscribe("stream-data", data => {
                    if (data && data instanceof ArrayBuffer) {
                        sourceBuffer.appendBuffer(data);
                    } else if (data && data["end-of-stream"]) {
                        stream_data.mediaSource.endOfStream();
                    } else if (!data) {
                        this.$socket.emit("stream-data");
                    }
                });
            };

            stream_data.audio.src = URL.createObjectURL(stream_data.mediaSource);
            stream_data.audio.play();
        }
    }
}