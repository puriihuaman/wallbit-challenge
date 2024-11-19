import type { IOrder } from "../interfaces/IOrder";
import type { UserAction } from "../interfaces/UserAction";

type ShoppingCartProps = {
	orders: IOrder[];
	handleIncrement: (
		currentOrder: IOrder,
		amount: number,
		action: UserAction
	) => void;
};

const ShoppingCart = ({ orders, handleIncrement }: ShoppingCartProps) => {
	const calculateOrderTotal = (): number => {
		return orders.reduce(
			(acc: number, order: IOrder): number => acc + order.total,
			0
		);
	};

	return (
		<>
			<div className="overflow-hidden max-h-80 min-h-full h-80">
				<ul className="flex flex-col border border-gray-900/10 text-gray-800 h-full overflow-y-auto">
					<li className="sticky top-0 p-2 grid grid-cols-[80px_minmax(0,_1fr)_40px] sm:grid-cols-[80px_minmax(0,_1fr)_100px_100px_40px] items-center gap-2 bg-gray-100 borde border-b border-gray-900/10">
						<p className="tabular-nums borde border-r border-gray-900/10">
							Cant
						</p>
						<p className="text-nowrap borde border-r border-gray-900/10 text-ellipsis overflow-hidden">
							Nombre
						</p>
						<p className="tabular-nums borde border-r border-gray-900/10 hidden sm:block">
							Precio
						</p>
						<p className="tabular-nums borde border-r border-gray-900/10 hidden sm:block">
							Total
						</p>
						<p>Foto</p>
					</li>

					{orders.map((order: IOrder) => (
						<li
							key={order.id}
							className="grid grid-cols-[80px_minmax(0,_1fr)_40px] sm:grid-cols-[80px_minmax(0,_1fr)_100px_100px_40px] items-center gap-2 p-2 border-b border-gray-900/10"
						>
							<div className="tabular-nums borde border-r border-gray-900/10 flex gap-1 justify-between items-center pr-2">
								<button
									className="w-8 h-6 flex justify-center items-center rounded-md border-2 border-indigo-600  text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-500 hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									onClick={() => handleIncrement(order, 1, "INCREMENT")}
								>
									+
								</button>
								<p className="basis-8 text-center">{order.amount}</p>
								<button
									className={`w-8 h-6 flex justify-center items-center rounded-md border-2 border-indigo-600 text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-500 hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
										order.amount === 1 &&
										"text-indigo-600/50 bg-indigo-600/50 opacity-90 border-indigo-600/50 hover:text-indigo-600/50 hover:bg-indigo-600/50 hover:border-indigo-600/50"
									}`}
									onClick={() => handleIncrement(order, 1, "DECREMENT")}
									disabled={order.amount === 1}
								>
									-
								</button>
							</div>
							<p className="text-nowrap borde border-r border-gray-900/10 text-ellipsis overflow-hidden">
								{order.product.title}
							</p>
							<p className="tabular-nums borde border-r border-gray-900/10 hidden sm:block">
								${order.product.price.toFixed(2)}
							</p>
							<p className="tabular-nums borde border-r border-gray-900/10 hidden sm:block">
								${order.total.toFixed(2)}
							</p>
							<p>
								<img
									src={order?.product?.image}
									alt={order?.product?.title}
									className="block aspect-square w-8 h-8"
								/>
							</p>
						</li>
					))}
				</ul>
			</div>

			{orders.length > 0 && (
				<div className="p-4 text-right text-gray-800">
					Total de la compra:
					<strong> $ {calculateOrderTotal().toFixed(2)}</strong>
				</div>
			)}
		</>
	);
};

export default ShoppingCart;
