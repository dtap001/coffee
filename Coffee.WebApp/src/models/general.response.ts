export class GeneralResponse {
    isOk: boolean;
    content: any;
    error: {
        uid: string,
        message: string,
        code: number
    }
}