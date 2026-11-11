export type Expense={id:number;title:string;amount:number;category:string;date:string};
export type FilterType='all'|'week'|'month';
export type NewExpense=Omit<Expense,'id'>;