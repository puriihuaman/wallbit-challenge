export interface IOrder {
	id: number;
	product: IProduct;
	amount: number;
	total: number;
	creation_date: string;
}
