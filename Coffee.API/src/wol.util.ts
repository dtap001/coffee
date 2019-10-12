import * as wol from "wake_on_lan";

export class WOLUtil {
    async  wake(macAddress: string, ipAddress: string) {
        wol.wake(macAddress, { address: ipAddress }, function (error) {
            if (error) {
                return Promise.reject(error);
            } else {
                return Promise.resolve();
            }
        });
    }
}