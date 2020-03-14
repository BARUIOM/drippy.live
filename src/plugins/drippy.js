import axios from 'axios'
import { api_url } from "../main.js";

const data = {
    get userdata() {
        if (window.localStorage["USER_DATA"]) {
            return JSON.parse(window.localStorage["USER_DATA"]);
        }
        return {};
    },
    get token() {
        return this.userdata['idToken'];
    },
    get refresh_token() {
        return this.userdata['refreshToken'];
    }
}

export default {
    get userdata() {
        return data.userdata;
    },
    async validate() {
        await axios({
            url: '/validate',
            baseURL: api_url,
            headers: { 'User-Token': data.token }
        });
    },
    async refresh() {
        const response = await axios({
            method: "POST",
            url: "/refresh",
            baseURL: api_url,
            data: {
                refresh_token: data.refresh_token
            }
        });
        window.localStorage["USER_DATA"] = JSON.stringify(response.data);
    },
    async register(email, password) {
        const response = await axios({
            url: '/register',
            baseURL: api_url,
            method: 'POST',
            data: { email: email, password: password }
        });
        return response.data;
    },
    async login(email, password) {
        const response = await axios({
            url: '/login',
            baseURL: api_url,
            method: 'POST',
            data: { email: email, password: password }
        });
        window.localStorage["USER_DATA"] = JSON.stringify(response.data);
        return response.data;
    },
    async getPlaylists() {
        try {
            if (!window.sessionStorage['playlists']) {
                const response = await axios({
                    url: "/playlists",
                    baseURL: api_url,
                    headers: { "User-Token": data.token }
                });
                window.sessionStorage["playlists"] = JSON.stringify(response.data);
                return [...response.data];
            }
            return [...JSON.parse(window.sessionStorage["playlists"])];
        } catch (error) {
            if (error.response && error.response.status == 403) {
                await this.refresh();
                return await this.getPlaylists();
            }
            throw error;
        }
    },
    async getPlaylist(playlist_id) {
        try {
            if (!window.sessionStorage[playlist_id]) {
                const response = await axios({
                    url: `/playlist/${playlist_id}`,
                    baseURL: api_url,
                    headers: { "User-Token": data.token }
                });

                window.sessionStorage[playlist_id] = JSON.stringify(response.data);
                return response.data;
            }
            return JSON.parse(window.sessionStorage[playlist_id]);
        } catch (error) {
            if (error.response && error.response.status == 403) {
                await this.refresh();
                return await this.getPlaylist(playlist_id);
            }
            throw error;
        }
    },
    async addTrackToPlaylist(playlist_id, track_id) {
        try {
            const response = await axios({
                method: "POST",
                url: "/save",
                baseURL: api_url,
                data: {
                    id: track_id,
                    playlist: playlist_id
                },
                headers: { "User-Token": data.token }
            });

            if (window.sessionStorage[playlist_id]) {
                let playlist = JSON.parse(window.sessionStorage[playlist_id]);
                playlist['songs'].push(response.data);
                window.sessionStorage[playlist_id] = JSON.stringify(playlist);
            }
        } catch (error) {
            if (error.response && error.response.status == 403) {
                await this.refresh();
                return await this.addTrackToPlaylist(playlist_id, track_id);
            }
            throw error;
        }
    },
    async removeTrackFromPlaylist(playlist_id, track_id) {
        try {
            await axios({
                method: "POST",
                url: "/remove",
                baseURL: api_url,
                data: {
                    id: track_id,
                    playlist: playlist_id
                },
                headers: { "User-Token": data.token }
            });

            if (window.sessionStorage[playlist_id]) {
                let playlist = JSON.parse(window.sessionStorage[playlist_id]);
                let song = playlist['songs'].find(e => e['id'] == track_id);
                playlist['songs'].splice(playlist['songs'].indexOf(song), 1);
                window.sessionStorage[playlist_id] = JSON.stringify(playlist);
            }
        } catch (error) {
            if (error.response && error.response.status == 403) {
                await this.refresh();
                return await this.removeTrackFromPlaylist(playlist_id, track_id);
            }
            throw error;
        }
    },
    async createPlaylist(name) {
        try {
            const response = await axios({
                method: "POST",
                url: "/create_playlist",
                baseURL: api_url,
                data: {
                    name: name,
                },
                headers: { "User-Token": data.token }
            });

            if (window.sessionStorage['playlists']) {
                let playlists = [...JSON.parse(window.sessionStorage['playlists'])];
                playlists.unshift(response.data);
                window.sessionStorage['playlists'] = JSON.stringify(playlists);
            }
        } catch (error) {
            if (error.response && error.response.status == 403) {
                await this.refresh();
                return await this.createPlaylist(name);
            }
            throw error;
        }
    },
    async search(query) {
        try {
            const response = await axios({
                url: '/audio',
                baseURL: api_url,
                params: { query: query },
                headers: { 'User-Token': data.token }
            });
            window.sessionStorage['search_results'] = JSON.stringify(response.data);
            return [...response.data];
        } catch (error) {
            if (error.response && error.response.status == 403) {
                await this.refresh();
                return await this.search(query);
            }
            throw error;
        }
    },
    getTrackUrl(track) {
        return `${api_url}/stream/${data.token}/${track['data']}`;
    }
}