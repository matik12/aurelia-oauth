export default class LocalStorageService {
    isStorageSupported(): boolean;
    set<T>(key: string, object: T): void;
    get<T>(key: string): T;
    remove(key: string): void;
}
