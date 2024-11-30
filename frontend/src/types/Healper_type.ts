export interface formatCurrency_props {
    amount:number;
    currency?:string;
    locale?:number;
}
//________________ TEXT AREA
export interface Textarea_normal_props {
    value:string; 
    label:string;
    get_value:(value:string)=>void;
}