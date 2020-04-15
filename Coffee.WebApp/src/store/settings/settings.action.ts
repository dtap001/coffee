import { createAction, props } from '@ngrx/store';
import { SettingsModel } from 'src/models/settings.model';

export const GetSettingsAction = createAction(
    "[GetSettings] Start",
    props<{}>()
);
export const GetSettingsFailAction = createAction(
    "[GetSettings] Fail",
    props<{ error: string }>()
);
export const GetSettingsSuccessAction = createAction(
    "[GetSettings] Success",
    props<{ settings: SettingsModel }>()
);
export const SaveSettingsAction = createAction(
    "[SaveSettings] Start",
    props<{ settings: SettingsModel }>()
);
export const SaveSettingsFailAction = createAction(
    "[SaveSettings] Fail",
    props<{ error: string }>()
);
export const SaveSettingsSuccessAction = createAction(
    "[SaveSettings] Success",
    props<{}>()
);
