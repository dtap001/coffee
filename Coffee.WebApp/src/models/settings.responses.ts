import { GeneralResponse } from './general.response';
import { SettingsModel } from './settings.model';

export class SettingsSaveResponse extends GeneralResponse { }
export class SettingsGetResponse extends GeneralResponse {
    content: SettingsModel;    
}