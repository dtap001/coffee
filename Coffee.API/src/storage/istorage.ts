export interface IStorage {
    initialize();
    getUser(user: string, passwordHash: string);
}