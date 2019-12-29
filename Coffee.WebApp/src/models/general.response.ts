export class GeneralResponse {
    isOK: boolean;
    content: any;
    error: {
        uid: string,
        message: string,
        code: number
    }
}