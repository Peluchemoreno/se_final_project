const clientId = "49529b74a64149a49bdb35e5eaf8d318";
const redirectUri = "http://localhost:5000";

export async function generateCodeChallenge() {
  const generateRandomString = (length) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const codeVerifier = generateRandomString(64);

  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  };

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  console.log("Code successfully generated: ", codeChallenge)
  return { codeVerifier, codeChallenge };
}

export function requestAuthorization(codeVerifier, codeChallenge) {
  console.log('Requesting Authorization')
  const scope =
    "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);
  window.localStorage.setItem("code_challenge", codeChallenge)

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

export const getToken = async (code) => {
  console.log("Getting token")
  const codeVerifier = localStorage.getItem("code_verifier");
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch("https://accounts.spotify.com/api/token", payload);
  const response = await body.json();

  if (response.access_token) {
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token)
    return response.access_token;
  } else {
    throw new Error(`Failed to fetch token: ${JSON.stringify(response)}`);
  }
};


