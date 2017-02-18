export default class UrlHashService {
    public getHash = (): string => {
        let hash = window.location.hash;

        if (hash.indexOf('#/') > -1) {
            hash = hash.substring(hash.indexOf('#/') + 2);
        } else if (hash.indexOf('#') > -1) {
            hash = hash.substring(1);
        }

        return hash;
    };

    public getHashData = (): any => {
        const hash = this.getHash();
        const searchRegex = /([^&=]+)=?([^&]*)/g;
        const hashData = {};

        let match = searchRegex.exec(hash);
        while (match) {
            const parameter = this.decodeUrlData(match[1]);
            const value = this.decodeUrlData(match[2]);

            hashData[parameter] = value;
            match = searchRegex.exec(hash);
        }

        return hashData;
    };

    public clearHash = (): void => {
        window.location.hash = '';
    };

    private decodeUrlData = (s: string): string => {
        return decodeURIComponent(s.replace(/\+/g, ' '));
    };
}