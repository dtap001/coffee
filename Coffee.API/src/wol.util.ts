import * as wol from "wake_on_lan";
import { injectable } from "inversify";
import { Log } from "./log";
@injectable()
export class WOLUtil {
    async  wake(macAddress: string, ipAddress: string) {
        wol.wake(macAddress, function (error) {
            if (error) {
                Log.i("wake.util error: " + error);
                return Promise.reject(error);
            } else {
                Log.i("wake.util success!");
                return Promise.resolve();
            }
        });
    }
}