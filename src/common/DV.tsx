import type {ShortAttribETypes as SAType} from '../joiner';
import {GObject, RuntimeAccessible} from '../joiner';
import React, {ReactElement} from "react";
const beautify = require('js-beautify').html;

let ShortAttribETypes: typeof SAType = (window as any).ShortAttribETypes;

@RuntimeAccessible
export class DV {
    public static modelView(): string { return beautify(DefaultView.model()); } // damiano: che fa beautify? magari potremmo settarlo in LView.set_jsx invece che solo qui, così viene formattato anche l'input utente?
    public static packageView(): string { return beautify(DefaultView.package()); }
    public static classView(): string { return beautify(DefaultView.class()); }
    public static attributeView(): string { return beautify(DefaultView.feature()); }
    public static referenceView(): string { return beautify(DefaultView.feature()); }
    public static enumeratorView(): string { return beautify(DefaultView.enum()); }
    public static literalView(): string { return beautify(DefaultView.literal()); }
    public static voidView(): string { return beautify(DefaultView.void()); }
    public static operationView(): string { return beautify(DefaultView.operation()); }
    public static operationViewm1(): string { return beautify(DefaultView.operationm1()); }
    public static objectView(): string { return beautify(DefaultView.object()); }
    public static valueView(): string { return beautify(DefaultView.value()); }
    public static defaultPackage(): string { return beautify(DefaultView.defaultPackage()); }
    public static errorView(publicmsg: string | JSX.Element, debughiddenmsg?:any): ReactElement { console.error("error in view:", {publicmsg, debuginfo:debughiddenmsg}); return DefaultView.error(publicmsg); }

    static edgePointView(): string { return beautify(
        `<div className={"edgePoint"} tabIndex="-1" hoverscale={"hardcoded in css"} style={{borderRadius:"999px", border: "2px solid black", background:"red", width:"100%", height:"100%"}} />`
    )}
    static edgePointViewSVG(): string { return beautify(
        `<ellipse stroke={"black"} fill={"red"} cx={"50"} cy={"50"} rx={"20"} ry={"20"} />`
        //`<ellipse stroke={"black"} fill={"red"} cx={this.props.node.x} cy={this.props.node.y} rx={this.props.node.w} ry={this.props.node.h} />`
    )}

    static edgeView(): string { return beautify(
        `<div className={"edge"} style={{overflow: "visible", width:0, height:0}}>
            <svg className={"hoverable"} style={{width:"100vw", height:"100vh", pointerEvents:"none"}}>
                <path className={"preview"} strokeWidth={2} stroke={"gray"} fill={"none"} d={this.component.path()} style={{pointerEvents:"none"}}></path>
                <path className={"content"} strokeWidth={4} stroke={"black"} fill={"none"} d={this.component.path()} style={{pointerEvents:"none"}}></path>
                {this.component.pathSegments().map( pair => <path className={"clickable"} style={{pointerEvents:"all"}}
                 strokeWidth={4} stroke={"transparent"} fill={"none"} d={"M"+pair[0].x+" "+pair[0].y+" L"+pair[1].x+" "+pair[1].y}></path>)}
                <foreignObject style={{overflow:"visible"}}>    </foreignObject>
            </svg>
            {
                false && <EdgePoint key={"midnode1"} view={"Pointer_ViewEdgePoint"} />
            }{
                false && <EdgePoint key={"midnode2"} view={"Pointer_ViewEdgePoint"} />
            }{
                false && props.children && "this would cause loop no idea why, needs to be fixed to allow passing EdgeNodes here" || []
            }
        </div>`
    )}
    static edgeView0(): string { return beautify(
        `<div>edge</div>`
    )}
}

let valuecolormap: GObject = {};
valuecolormap[ShortAttribETypes.EBoolean] = "orange";
valuecolormap[ShortAttribETypes.EByte] = "orange";
valuecolormap[ShortAttribETypes.EShort] = "orange";
valuecolormap[ShortAttribETypes.EInt] = "orange";
valuecolormap[ShortAttribETypes.ELong] = "orange";
valuecolormap[ShortAttribETypes.EFloat] = "orange";
valuecolormap[ShortAttribETypes.EDouble] = "orange";
valuecolormap[ShortAttribETypes.EDate] = "green";
valuecolormap[ShortAttribETypes.EString] = "green";
valuecolormap[ShortAttribETypes.EChar] = "green";
valuecolormap[ShortAttribETypes.void] = "gray";

let valuecolormap_str = JSON.stringify(valuecolormap);


class DefaultView {

    public static model(): string {
        return `<div className={'root model'}>
             {!this.data && "Model data missing."}
             
            <div className="edges">
                {this.data && this.node.allSubNodes.length >=2 &&
                    <DamEdge view={"Pointer_ViewEdge"} start={this.node.allSubNodes[0]} end={this.node.allSubNodes[1]}>
                        <EdgePoint key={"midnode1"} view={"Pointer_ViewEdgePoint"} />
                        <EdgePoint key={"midnode2"} view={"Pointer_ViewEdgePoint"} />
                    </DamEdge>
                }
                {
                    false && this.data.suggestedEdges.reference.map(se => <DamEdge start={se.start} end={se.end} view={"Pointer_ViewEdge"}/>)
                }
            </div>
             {this.data && this.data.packages.map((child, index) => {
                return <DefaultNode key={index} data={child.id}></DefaultNode>
            })}
            {this.data && this.data.allSubObjects.map((child, index) => {
                return <DefaultNode key={index} data={child.id}></DefaultNode>
            })}
        </div>`;
    }

    public static void(): string {
        return `<div className={'round bg-white root void model-less p-1'}>
            <div>voidvertex element test</div>
            <div>data: {this.props.data ? this.props.data.name : "empty"}</div>
        </div>`;
    }
    public static package(): string {
        return `<div className={'round bg-white root package'}>
            <Input jsxLabel={<b className={'package-name'}>EPackage:</b>} field={'name'} hidden={true} />
            <hr />
            <div className={'package-children'}>
                {this.data.children.map((child, index) => {
                    return <DefaultNode key={index} data={child.id}></DefaultNode>
                })}
            </div>
        </div>`;
    }

    public static class(): string {
        return `<div className={'round bg-white root class'}>
            <Input jsxLabel={<b className={'class-name'}>EClass:</b>} 
                   data={this.data.id} field={'name'} hidden={true} autosize={true} />
            <hr/>
            <div className={'class-children'}>
                {this.data.children.map((child, index) => {
                    return <DefaultNode key={index} data={child.id}></DefaultNode>
                })}
            </div>
        </div>`;
    }

    public static enum(): string {
        return `<div className={'round bg-white root enumerator'}>
            <Input jsxLabel={<b className={'enumerator-name'}>EEnum:</b>} 
                   data={this.data.id} field={'name'} hidden={true} autosize={true} />
            <hr />
            <div className={'enumerator-children'}>
                {this.data.children.map((child, index) => {
                    return <DefaultNode key={index} data={child.id}></DefaultNode>
                })}
            </div>
        </div>`;
    }

    public static feature(): string {
        return `<Select className={'root feature'} data={this.data} field={'type'} label={this.data.name} />`;
    }

    public static literal(): string {
        return `<label className={'d-block text-center root literal'}>{this.data.name}</label>`
    }

    public static operation(): string {
        return `<Select className={'root operation'} data={this.data} field={'type'} label={this.data.name+this.data.signature} />`;
    }



    public static operationm1(): string {
        return `<div className={'d-flex root operationm1'} style={{paddingRight: "6px"}}>
             {<label className={'d-block ms-1'}>{this.props.data.instanceof.name}</label>}
            <label className={'d-block ms-auto hover-root'} style={{color:` + valuecolormap_str + `[this.props.data.values.type] || "gray"
            }}>→→→{
                <div className="hover-content">{
                    <ParameterForm operation = {this.props.data.id} vertical={true} />
                }
                }</label>
        </div>`
    }

    public static object(): string {
        return `<div className={'round bg-white root class'}>
            <label className={'ms-1'}>
                <Input jsxLabel={<b className={'class-name'}>{this.data.instanceof ? this.data.instanceof.name : "Object"}:</b>} 
                   data={this.data.id} field={'name'} hidden={true} autosize={true}/>
            </label>
            <hr />
            <div className={'object-children'}>
                {this.data.features.map((child, index) => {
                    return <DefaultNode key={index} data={child.id}></DefaultNode>
                })}
            </div>
        </div>`;
    }

    public static value() {
        return `<div className={'d-flex root value'} style={{paddingRight: "6px"}}>
             {this.props.data.instanceof && <label className={'d-block ms-1'}>{this.props.data.instanceof.name}</label>}
             {!this.props.data.instanceof && <Input asLabel={true} data={this.data.id} field={'name'} hidden={true} autosize={true} />}
            <label className={'d-block ms-auto'} style={{color:` + valuecolormap_str + `[this.props.data.values.type] || "gray"
            }}>: {this.props.data.valuestring()}</label>
        </div>`
    }

    public static defaultPackage() {
        return `<div style={{backgroundColor: 'transparent', position: 'fixed', width: '-webkit-fill-available', height: '-webkit-fill-available'}}>
            {this.data.children.map((child, index) => {
            return <DefaultNode key={index} data={child.id}></DefaultNode>
            })}
        </div>`;
    }

    public static error(msg: undefined | string | JSX.Element) {
        return <div className={'w-100 h-100'}>
            <div className={"h-100 round bg-white border border-danger"}>
                <div className={'text-center text-danger'}>
                    <b>SYNTAX ERROR</b>
                    <hr/>
                    <label className={'text-center mx-1 d-block'}>
                        The JSX you provide is NOT valid!
                    </label>
                    {msg && <label className={'text-center mx-1 d-block'}>{msg}</label>}
                </div>
            </div>
        </div>;
    }

}
