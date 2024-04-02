import { DModel, LModel } from '../../../model/logicWrapper';
import { TabData } from 'rc-dock';
declare class TabDataMaker {
    static metamodel(model: DModel | LModel): TabData;
    static model(model: DModel | LModel): TabData;
}
export default TabDataMaker;
