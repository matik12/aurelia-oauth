export default class UrlHashService {
    getHash: () => string;
    getHashData: () => any;
    clearHash: () => void;
    private decodeUrlData;
}
