export default class UrlHashService {
    getHash: (hashValue?: string) => string;
    getHashData: (hashValue?: string) => any;
    clearHash: () => void;
    private decodeUrlData;
}
