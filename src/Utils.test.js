import { buildSpotifyAuthUrl } from "./Utils";

describe("Spotify auth URL generation", () => {
  it("uses the authorization code flow with PKCE parameters", () => {
    const url = buildSpotifyAuthUrl({
      clientId: "test-client-id",
      redirectUri: "https://example.com/callback",
      scopes: ["user-read-private", "user-read-email"],
      state: "test-state",
      codeChallenge: "test-code-challenge",
    });

    expect(url).toContain("response_type=code");
    expect(url).toContain("client_id=test-client-id");
    expect(url).toContain("redirect_uri=https%3A%2F%2Fexample.com%2Fcallback");
    expect(url).toContain("scope=user-read-private%20user-read-email");
    expect(url).toContain("state=test-state");
    expect(url).toContain("code_challenge=test-code-challenge");
    expect(url).toContain("code_challenge_method=S256");
  });
});
