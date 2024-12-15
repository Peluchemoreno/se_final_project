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

export function getPlaylists(token, userId){
  return fetch(`${BASE_URL}users/${userId}/playlists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(checkServerResponse)
}

export function getPlaylistTracks(token, playlistId){
  return fetch(`${BASE_URL}playlists/${playlistId}/tracks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(checkServerResponse)
}