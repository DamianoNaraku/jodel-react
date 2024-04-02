import { DockLayout, TabData } from 'rc-dock';
import { LModel } from '../../joiner';
declare class DockManager {
    static dock: DockLayout | null;
    static open(group: 'models' | 'editors', tab: TabData): Promise<void>;
    static open2(me: LModel): Promise<void>;
}
export default DockManager;
