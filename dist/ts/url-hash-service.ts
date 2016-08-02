export default class UrlHashService {
    public getHash = (): string => {
        var hash = window.location.hash;

        if (hash.indexOf('#/') > -1) {
            hash = hash.substring(hash.indexOf('#/') + 2);
        } else if (hash.indexOf('#') > -1) {
            hash = hash.substring(1);
        }
        
        return hash;
    };
    
    public getHashData = (): any => {
        var hash = this.getHash();
        var searchRegex = /([^&=]+)=?([^&]*)/g;
        var hashData = {};

        var match = searchRegex.exec(hash);
        while (match) {
            var parameter = this.decodeUrlData(match[1]);
            var value = this.decodeUrlData(match[2]);

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