export default class LocalStorageService {
    public isStorageSupported(): boolean {
        return window.localStorage !== undefined;
    }

    public set<T>(key: string, object: T): void {
        window.localStorage.setItem(key, JSON.stringify(object));
    }

    public get<T>(key: string): T {
        return JSON.parse(window.localStorage.getItem(key));
    }

    public remove(key: string): void {
        window.localStorage.removeItem(key);
    }
}