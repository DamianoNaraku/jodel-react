import { AxiosResponse } from 'axios';
import { GObject, LModelElement } from "../joiner";
import { MemoRecObject } from "./types";
export default class MemoRec {
    static post(path: string, obj: MemoRecObject): Promise<AxiosResponse>;
    static structuralFeature(me: LModelElement): Promise<{
        data: GObject[];
        type: 'class' | 'package';
    }>;
    static classifier(me: LModelElement): Promise<{
        data: GObject[];
        type: 'class' | 'package';
    }>;
}
