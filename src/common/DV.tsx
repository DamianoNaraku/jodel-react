import {DocString, EdgeHead, ShortAttribETypes as SAType, U} from '../joiner';
import {GObject, RuntimeAccessible} from '../joiner';
import React, {ReactElement} from "react";
// const beautify = require('js-beautify').html; // BEWARE: this adds some newline that might be breaking and introduce syntax errors in our JSX parser
const beautify = (s: any)=>s;
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
    public static errorView_string(publicmsg: string | JSX.Element, debughiddenmsg?:any): string {
        let visibleMessage = publicmsg && typeof publicmsg === "string" ? U.replaceAll(publicmsg, "Parse Error: ", "") : publicmsg;
        console.error("error in view:", {publicmsg, debuginfo:debughiddenmsg}); return DefaultView.error_string(visibleMessage); }
    public static errorView(publicmsg: string | JSX.Element, debughiddenmsg?:any): React.ReactNode {
        let visibleMessage = publicmsg && typeof publicmsg === "string" ? U.replaceAll(publicmsg, "Parse Error: ", "") : publicmsg;
        console.error("error in view:", {publicmsg, debuginfo:debughiddenmsg}); return DefaultView.error(visibleMessage); }

    static edgePointView(): string { return beautify(
        `<div className={"edgePoint"} tabIndex="-1" hoverscale={"hardcoded in css"} style={{borderRadius:"999px", border: "2px solid black", background:"transparent", width:"100%", height:"100%"}} />`
    )}
    static edgePointViewSVG(): string { return beautify(
        `<ellipse stroke={"black"} fill={"red"} cx={"50"} cy={"50"} rx={"20"} ry={"20"} />`
        //`<ellipse stroke={"black"} fill={"red"} cx={this.props.node.x} cy={this.props.node.y} rx={this.props.node.w} ry={this.props.node.h} />`
    )}

    static svgHeadTail(head: "Head" | "Tail", type: EdgeHead): string {
        let inner: string;
        let headstr = head==="Head" ? "this.segments.head" : "this.segments.tail";
        let styleTranslate = "{}"; // '{transform:"translate(" + ' + headstr + '.x + "px, " + ' + headstr + '.y + "px)"}';
        let styleTranslateRotate = '{transform:"translate(" + ' + headstr + '.x + "px, " + ' + headstr + '.y + "px) rotate(" + (' + headstr + '.rad) + "rad)",' +
            ' "transformOrigin":'+headstr+'.w/2+"px "+ '+headstr+'.h/2+"px"}';
        let styleRotate = 'style={{transform:"rotate(" + ' + headstr + '.rad + "rad), transformOrigin:"noooope  not center"}}'; // edgeHead EdgeReference
        let attrs = `\n\t\t\t\tstyle={`+styleTranslateRotate +`}\n\t\t\t\t stroke={this.strokeColor} strokeWidth={this.strokeWidth}
 className={"edge` + head + ` ` + type +` preview"}></path>\n`;
        let path: string;
        let hoverAttrs = `\n\t\t\t\tstyle={`+styleTranslateRotate +`}\n\t\t\t\t stroke={this.segments.all[0]&&(this.segments.all[0].length > this.strokeLengthLimit )&& this.strokeColorLong || this.strokeColorHover} strokeWidth={this.strokeWidthHover}
 className={"edge` + head + ` ` + type +` clickable content"}></path>\n`;
        switch(type) {
            default:
                inner = "edge '" + head + "' with type: '" +type + "' not found";
                break;
            case EdgeHead.extend:
                path = `<path d={"M 0 0   L " + `+headstr+`.w + " " + `+headstr+`.h/2 + "   L 0 " + `+headstr+`.h + "Z" } fill="#fff" `;
                inner = path + attrs + "\n\t\t\t\t" + path + hoverAttrs;
                break;
            case EdgeHead.reference:
                path = `<path d={"M 0 0   L " + `+headstr+`.w + " " + `+headstr+`.h/2 + "   L 0 " + `+headstr+`.h } fill="none" `;
                inner = path + attrs + "\n\t\t\t\t" + path + hoverAttrs;
                break;
            case EdgeHead.aggregation:
                path = `<path d={"M 0 " + `+headstr+`.h/2 + " L " + `+headstr+`.w/2 + " 0 L " +
                    `+headstr+`.w + " " +`+headstr+`.h/2 + " L " + `+headstr+`.w/2 + " " + `+headstr+`.h + " Z"} fill="#fff" `;
                inner = path + attrs + "\n\t\t\t\t" + path + hoverAttrs;
                break;
            case EdgeHead.composition:
                path = `<path d={"M 0 " + `+headstr+`.h/2 + " L " + `+headstr+`.w/2 + " 0 L " +
                    `+headstr+`.w + " " + `+headstr+`.h/2 + " L " + `+headstr+`.w/2 + " " + `+headstr+`.h + " Z"} fill="#000" `;
                inner = path + attrs + "\n\t\t\t\t" + path + hoverAttrs;
                break;
                /* `<svg width="20" height="20" viewBox="0 0 20 20" style={overflow: "visible"}>
                                            <path d={"M 10 0 L 0 20 L 20 20 Z"} fill="#ffffff" stroke="#808080" strokeWidth="1"></path>
                                         </svg>`;*/
                //  style={transform: "rotate3d(xcenter, ycenter, zcenter??, 90deg)"}
        }
        //  transform={"rotate("+`+headstr+`.rad+"rad "+ this.segments.all[0].start.pt.toString(false, " ")}
        return inner; // no wrap because of .hoverable > .preview  on root & subelements must be consecutive
        // return `<g className="edge`+head + ` ` + type +`" style={` + styleTranslate + `}>\n`+ inner +`</g>`
    }

    // about label rotation in .edge > foreignObect > div (label)
    // first transform is h-center. second is rotate, third adds [0, 50%] of 50% vertical offset AFTER rotation to take label out of edge. fourth is to add a margin.
    static edgeView(modename: EdgeHead, head: DocString<"JSX">, tail: DocString<"JSX">, dashing: string | undefined): string { return beautify(
        `<div className={"edge ` + modename + `"} style={{overflow: "visible", width:"100%", height:"100%", pointerEvents:"none"}}>
            <svg className={"hoverable"} style={{width:"100vw", height:"100vh", pointerEvents:"none", overflow: "visible"}}>
                { /* edge full segment */ }
                <path className={"preview"} strokeWidth={this.strokeWidth}
                stroke={this.strokeColor} fill={"none"} d={this.edge.d} strokeDasharray="` + dashing + `"></path>
                { /* edge separate segments */ }
                { console.warn("inside jxs", {thiss:this, segments:this.segments}) && null }
                {this.segments.all.flatMap(s => [
                    <path className={"clickable content"} style={{pointerEvents:"all"}} strokeWidth={this.strokeWidthHover}
                    stroke={s.length > this.strokeLengthLimit && this.strokeColorLong || this.strokeColorHover}
                     fill={"none"} d={s.dpart}></path>,
                    s.label && <foreignObject style={{overflow: "visible", height:"0", width:"0", whiteSpace:"pre", x:(s.start.pt.x + s.end.pt.x)/2+"px", y:(s.start.pt.y + s.end.pt.y)/2+"px"}}>
                    <div
                     style={{width: "fit-content",
                      transform: "translate(-50%, 0%) rotate("+s.radLabels+"rad) translate(0%, -"+(1-0.5*Math.abs(Math.abs(s.radLabels)%Math.PI)/(Math.PI/2))*100+"%)"+
                     " translate(0%, -5px", color: this.strokeColor}}>{s.label}</div>
                    </foreignObject>
                ])}
            { /* edge head */ }
            ` + head + `
            { /* edge tail */ }
            ` + tail + `
            </svg>
            { /* interactively added edgepoints */ }
            {
                edge.midPoints.map( m => <EdgePoint data={edge.father.model.id} initialSize={m} key={m.id} view={"Pointer_ViewEdgePoint"} /> )
            }{
                
                false && edge.end.model.attributes.map( (m, index, arr) => <EdgePoint data={m.id} initialSize={(parent) => {
                    let segs = parent.segments.segments;
                    let pos = segs[0].start.pt.multiply(1-(index+1)/(arr.length+1), true).add(segs[segs.length-1].end.pt.multiply((index+1)/(arr.length+1), true));
                    // console.trace("initial ep", {segs, pos, ratio:(index+1)/(arr.length+1), s:segs[0].start.pt, e:segs[segs.length-1].end.pt});
                    return {...pos, w:55, h:55}}} key={m.id} view={"Pointer_ViewEdgePoint"} /> )
                    
            }{
                false && <EdgePoint key={"midnode1"} view={"Pointer_ViewEdgePoint"} />
            }{
                false && <EdgePoint key={"midnode2"} view={"Pointer_ViewEdgePoint"} />
            }{
                false && props.children && "this would cause loop no idea why, needs to be fixed to allow passing EdgeNodes here" || []
            }
        </div>`
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

// &&[]bn
let valuecolormap_str = JSON.stringify(valuecolormap);


class DefaultView {

    public static model(): string {
        return `<div className={'root model'}>
            {!this.data && "Model data missing."}
            <div className="edges" style={{zIndex:101, position: "absolute", height:0, width:0, overflow: "visible"}}>{[
                    true && this.data.suggestedEdges.reference &&
                    this.data.suggestedEdges.reference.map(
                        se => (!se.vertexOverlaps)
                         && <DamEdge start={se.start.father} end={se.end} view={"Pointer_ViewEdge" + ( se.start.containment && "Composition" || "Association")} key={se.start.node.id+"~"+se.end.node.id}/>)
                         ,
                    true && this.data.suggestedEdges.extend &&
                    this.data.suggestedEdges.extend.map(
                        se => (!se.vertexOverlaps)
                         && <DamEdge start={se.start} end={se.end} view={"Pointer_ViewEdgeInheritance"} key={se.start.node.id+"~"+se.end.node.id}/>)]
                }
            </div>
             {this.data && this.data.packages.map((pkg, index) => {
                return <DefaultNode key={pkg.id} data={pkg.id}></DefaultNode>
            })}
            {this.data && this.data.allSubObjects.map((child, index) => {
                return <DefaultNode key={child.id} data={child.id}></DefaultNode>
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
            { /*<Input jsxLabel={<b className={'package-name'}>EPackage:</b>} field={'name'} hidden={true} />*/ }
            { console.log("evalcontex:", {thiss: this, pname: this.pname, c: this._context}) && null}
            <Input jsxLabel={<b>{this.pname}:</b>} field={'name'} hidden={true} />
            <hr />
            <div className={'package-children'}>
                {this.data.children.map((child, index) => {
                    return <DefaultNode key={child.id} data={child.id}></DefaultNode>
                })}
            </div>
        </div>`;
    }

    public static class(): string {
        return `<div className={'round bg-white root class'}>
            <Input jsxLabel={<b className={'class-name'}>EClass:</b>} 
                   data={this.data.id} field={'name'} hidden={true} autosize={true} />
            <hr/>
            {/* i kept them separated because i want them in this order. i could have used data.children once, or put all in same container to mix them. */}
            <div className={'class-children'}>{ this.data.attributes.map(c => <DefaultNode key={c.id} data={c.id} />) }</div>
            <div className={'class-children'}>{ this.data.references.map(c => <DefaultNode key={c.id} data={c.id} />) }</div>
            <div className={'class-children'}>{ this.data.operations.map(c => <DefaultNode key={c.id} data={c.id} />) }</div>
        </div>`;
    }

    public static enum(): string {
        return `<div className={'round bg-white root enumerator'}>
            <Input jsxLabel={<b className={'enumerator-name'}>EEnum:</b>} 
                   data={this.data.id} field={'name'} hidden={true} autosize={true} />
            <hr />
            <div className={'enumerator-children'}>
                {this.data.children.map((child, index) => {
                    return <DefaultNode key={child.id} data={child.id}></DefaultNode>
                })}
            </div>
        </div>`;
    }

    public static feature(): string {
        return `<div><Select className={'root feature'} data={this.data} field={'type'} label={this.data.name} /></div>`;
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
                    return <DefaultNode key={child.id} data={child.id}></DefaultNode>
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
            return <DefaultNode key={child.id} data={child.id}></DefaultNode>
            })}
        </div>`;
    }

    public static error(msg: undefined | string | JSX.Element) {
        return <div className={'w-100 h-100 round bg-white border border-danger'} style={{minHeight:"min-content"}}>
            <div className={'text-center text-danger'} style={{background:"#fff7"}}>
                <b>SYNTAX ERROR</b>
                <hr/>
                <label className={'text-center mx-1 d-block'}>
                    The JSX you provide is NOT valid!
                </label>
                {msg && <label className={'text-center mx-1 d-block'} style={{color:"black"}}>{msg}</label>}
            </div>
        </div>;
    }
    public static error_string(msg: undefined | string | JSX.Element): string {
        return `<div className={'w-100 h-100 round bg-white border border-danger'} style={{minHeight:"min-content"}}>
            <div className={'text-center text-danger'} style={{background:"#fff7"}}>
                <b>SYNTAX ERROR</b>
                <hr/>
                <label className={'text-center mx-1 d-block'}>
                    The JSX you provide is NOT valid!
                </label>
                ` + (msg ? `<label className={'text-center mx-1 d-block'} style={{color:"black"}>{"` + msg + `"}</label>` : "") + `
            </div>
        </div>`;
    }

}
