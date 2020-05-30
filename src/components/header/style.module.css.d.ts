declare namespace StyleModuleCssNamespace {
    export interface IStyleModuleCss {
        active: string;
        header: string;
    }
}

declare const StyleModuleCssModule: StyleModuleCssNamespace.IStyleModuleCss;

export = StyleModuleCssModule;
