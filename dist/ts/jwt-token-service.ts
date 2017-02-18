interface JwtToken {
    header: string;
    payload: string;
    signature: string;
}

export interface JwtClaims {
    exp: number;
    nbf?: number;
    iat?: number;
    ppid?: string;
    given_name?: string;
}

export default class JwtTokenService {
    public getJwtClaims = (encodedToken: string): JwtClaims => {
        const jwtToken = this.createJwtToken(encodedToken);
        const base64Decoded = this.decodeBase64String(jwtToken.payload);

        return JSON.parse(base64Decoded);
    };

    private createJwtToken = (token: string): JwtToken => {
        const jwtTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
        const matches = jwtTokenPartsRegex.exec(token);
        const isValidToken = matches && matches.length === 4;

        return <JwtToken>{
            header: isValidToken ? matches[1] : '',
            payload: isValidToken ? matches[2] : '',
            signature: isValidToken ? matches[3] : ''
        };
    };

    private decodeBase64String = (base64IdToken: string): string => {
        base64IdToken = base64IdToken.replace(/-/g, '+').replace(/_/g, '/');

        if (!window.atob) {
            throw new Error('Browser doesn\'t implement atob');
        }

        return window.atob(base64IdToken);
    };
}