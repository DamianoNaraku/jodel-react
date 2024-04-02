export declare class TagNames {
    static FOREIGNOBJECT: "FOREIGNOBJECT";
}
export declare class CSSRuleSorted {
    all: CSSStyleRule[];
    constructor(styleNode: HTMLStyleElement);
    getCSSMediaRule(): CSSMediaRule[];
    getCSSStyleRule(): CSSStyleRule[];
    notIn(list: CSSStyleRule[]): CSSStyleRule[];
}
export declare class CSSParser {
    static parse(styleNode: HTMLStyleElement): CSSRuleSorted;
}
