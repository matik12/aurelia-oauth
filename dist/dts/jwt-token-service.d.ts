export interface JwtClaims {
    exp: number;
    nbf?: number;
    iat?: number;
    ppid?: string;
    given_name?: string;
}
export default class JwtTokenService {
    getJwtClaims: (encodedToken: string) => JwtClaims;
    private createJwtToken;
    private decodeBase64String;
}
