import axios from 'axios'
import { api_url } from "../main.js";

const data = {
    get token() {
        let user = JSON.parse(window.localStorage["USER_DATA"]);
        return user['idToken'];
    },
    get refresh_token() {
        let user = JSON.parse(window.localStorage["USER_DATA"]);
        return user['refreshToken'];
    }
}

export default {
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
        return response.data;
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
        return response.data;
    },
    async getPlaylists() {
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
    },
    async getPlaylist(playlist_id) {
        const response = await axios({
            url: `/playlist/${playlist_id}`,
            baseURL: api_url,
            headers: { "User-Token": data.token }
        });
        return response.data;
    },
    async addTrackToPlaylist(playlist, track) {
        const response = await axios({
            method: "POST",
            url: "/save",
            baseURL: api_url,
            data: {
                data: track,
                playlist: playlist
            },
            headers: { "User-Token": data.token }
        });
        return response.data;
    },
    async removeTrackFromPlaylist(playlist, track) {
        const response = await axios({
            method: "POST",
            url: "/remove",
            baseURL: api_url,
            data: {
                data: track,
                playlist: playlist
            },
            headers: { "User-Token": data.token }
        });
        return response.data;
    },
    async search(query) {
        const response = await axios({
            url: '/audio',
            baseURL: api_url,
            params: { query: query },
            headers: { 'User-Token': data.token }
        });
        window.sessionStorage['search_results'] = JSON.stringify(response.data);
        return [...response.data];
    }
}