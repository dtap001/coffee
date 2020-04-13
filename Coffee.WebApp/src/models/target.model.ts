export class TargetModel {
    public id: number;
    public macAddress: string;
    public ipAddress: string;
    public caption: string;
    public isPinned: boolean;
    public pinCode:number;
}
export class PinnedTargetModel {
    public id: number;
    public caption: string;
}