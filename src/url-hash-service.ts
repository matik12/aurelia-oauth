export default class UrlHashService {
    public getHash = (hashValue?: string): string => {
        let hash = hashValue ? hashValue : window.location.hash;

        if (hash.indexOf('#/') > -1) {
            hash = hash.substring(hash.indexOf('#/') + 2);
        } else if (hash.indexOf('#') > -1) {
            hash = hash.substring(1);
        }

        return hash;
    };

    public getHashData = (hashValue?: string): any => {
        const hash = this.getHash(hashValue);
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