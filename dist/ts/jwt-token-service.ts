interface IJwtToken {
    header: string;
    payload: string;
    signature: string;
}

export default class JwtTokenService {    
    public getJwtClaims = (encodedToken: string): IJwtClaims => {
        var jwtToken = this.createJwtToken(encodedToken);
        var base64Decoded = this.decodeBase64String(jwtToken.payload);

        return JSON.parse(base64Decoded);
    };

    private createJwtToken = (token: string): IJwtToken => {
        var jwtTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
        var matches = jwtTokenPartsRegex.exec(token);
        var isValidToken = matches && matches.length === 4;
        
        return <IJwtToken>{
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