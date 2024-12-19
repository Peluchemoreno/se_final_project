import { BASE_URL } from "./constants";

function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject((err) => {
      console.error(err);
    });
  }
}

export function getUserProfile(token) {
  return fetch(`${BASE_URL}me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
}

export function getPlaylists(token, userId) {
  return fetch(`${BASE_URL}users/${userId}/playlists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
}

export function getPlaylistTracks(token, playlistId) {
  return fetch(`${BASE_URL}playlists/${playlistId}/tracks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
}

export function playSong(token, songUri, deviceId) {
  return fetch(`${BASE_URL}me/player/play/device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      context_uri: songUri,
      position_ms: 0,
    }),
  }).then(checkServerResponse);
}

export function pauseSong(token) {
  return fetch(`${BASE_URL}/me/player/pause`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
}

export function getCurrentDevice(token) {
  return fetch(`${BASE_URL}me/player/devices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(checkServerResponse);
}
