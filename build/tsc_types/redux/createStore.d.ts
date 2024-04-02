import { Store } from "redux";
import { Action, DState } from "../joiner";
interface StateExt {
}
export declare let store: Store<DState & StateExt, Action>;
export {};
