import { GeneralResponse } from './general.response';
import { TargetModel, PinnedTargetModel } from './target.model';

export class TargetsSearchResponse extends GeneralResponse {
    content: TargetModel[];
}

export class TargetsWakeResponse extends GeneralResponse {
    content: TargetModel;
}

export class TargetsDeleteResponse extends GeneralResponse {
    content: TargetModel;
}

export class TargetsSaveResponse extends GeneralResponse {
    content: TargetModel;
}

export class TargetsGetPinnedResponse extends GeneralResponse {
    content: [PinnedTargetModel];
}

