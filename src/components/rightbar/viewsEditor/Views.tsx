import React from "react";
import type {LViewElement} from "../../../view/viewElement/view";
import {DViewElement} from "../../../view/viewElement/view";
import {CreateElementAction, DeleteElementAction, SetRootFieldAction} from "../../../redux/action/action";
import {U} from "../../../joiner";
import {useStateIfMounted} from "use-state-if-mounted";

interface Props { views: LViewElement[]; }
function ViewsData(props: Props) {
    const views = props.views;

    const [hoverID, setHoverID] = useStateIfMounted('');

    const add = (evt: React.MouseEvent<Element>) => {
        const jsx =`<div className={'root bg-white'}>Hello World!</div>`;
        const view: DViewElement = DViewElement.new('View', jsx);
        CreateElementAction.new(view);
        SetRootFieldAction.new('stackViews', view.id, '+=', true);
    }
    const remove = (evt: React.MouseEvent<Element>, index:number, view: LViewElement) => {
        SetRootFieldAction.new('viewelements', view.id, '-=', true);
        DeleteElementAction.new(view.id);
    }
    const select = (evt: React.MouseEvent<Element>, view: LViewElement) => {
        SetRootFieldAction.new('stackViews', view.id, '+=', true);
    }
    const clone = (e: React.MouseEvent, v: LViewElement) => {
        e.stopPropagation();
        const view: DViewElement = DViewElement.new(`${v.name} Copy`, '<div>Empty</div>');
        for(let key in v.__raw) {
            if(key !== 'id' && key !== 'name') {
                // @ts-ignore
                view[key] = v.__raw[key];
            }
        }
        CreateElementAction.new(view);
        SetRootFieldAction.new('stackViews', view.id, '+=', true);
    }

    return(<div>
        <div className={'d-flex p-2'}>
            <b className={'ms-1 my-auto'}>VIEWS</b>
            <button className={'btn btn-primary ms-auto'} onClick={add}>
                <i className={'p-1 bi bi-plus'}></i>
            </button>
        </div>
        {views.map((view, i) => {
            return <div key={view.id} className={'d-flex p-1 mt-1 border round mx-1'}
                        tabIndex={-1}
                        onMouseEnter={(e) => setHoverID(view.id)}
                        onMouseLeave={(e) => setHoverID('')}
                        onClick={(evt) => {select(evt, view)}}
                        style={{cursor: 'pointer', background: hoverID === view.id ? '#E0E0E0' : 'transparent'}}>
                <label style={{cursor: 'pointer'}} className={'my-auto'}>{view?.name}</label>
                <button className={'btn btn-success ms-auto'} onClick={e => clone(e, view)}>
                    <i className={'p-1 bi bi-clipboard2-fill'}></i>
                </button>
                <button className={'btn btn-danger ms-1'} disabled={U.getDefaultViewsID().includes(view.id)}
                        onClick={(evt) => {remove(evt, i, view)}}>
                    <i className={'p-1 bi bi-trash3-fill'}></i>
                </button>
            </div>
        })}
    </div>);
}

export default ViewsData;
