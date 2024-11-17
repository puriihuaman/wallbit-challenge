import { useEffect, useState } from "react";
import "./App.css";
import { useFetching } from "./hooks/useFetching";
import type { IOrder } from "./interfaces/IOrder";
import { dateFormat } from "./utils/date-format";

const WALLBIT_STORAGE_NAME = "WALLBIT";

function App() {
	const [orders, setOrders] = useState<IOrder[]>(
		JSON.parse(localStorage.getItem(WALLBIT_STORAGE_NAME)) ?? []
	);
	const [formData, setFormData] = useState({ productId: 1, amount: 0 });

	const { data, loading, error } = useFetching(formData.productId);

	const handleAddToCart = (ev): void => {
		ev.preventDefault();
		if (formData.productId <= 0 || formData.amount <= 0) {
			return;
		}

		const newOrder: IOrder = {
			id: data.id,
			product: data,
			amount: formData.amount,
			total: data.price * formData.amount,
			creation_date: dateFormat(new Date()),
		};

		const updatedOrders: IOrder[] = [...orders];
		const foundIndex = updatedOrders.findIndex(
			(order): boolean => order.id === newOrder.id
		);

		if (foundIndex !== -1) {
			updatedOrders[foundIndex] = {
				...updatedOrders[foundIndex],
				amount: updatedOrders[foundIndex].amount + formData.amount,
				total:
					(updatedOrders[foundIndex].amount + newOrder.amount) * data.price,
			};
		} else {
			updatedOrders.push(newOrder);
		}

		setOrders(updatedOrders);
	};

	const calculateOrderTotal = (): number => {
		return orders.reduce(
			(amount: number, b: IOrder): number => amount + b.total,
			0
		);
	};

	const getValuesToSearch = ({ target }) => {
		setFormData((formData) => ({
			...formData,
			[target.name]: Number(target.value),
		}));
	};

	useEffect(() => {
		window.localStorage.setItem(WALLBIT_STORAGE_NAME, JSON.stringify(orders));
	}, [orders]);

	return (
		<>
			<main>
				<h1>La tiendita</h1>

				<div>
					<form action="#" onSubmit={handleAddToCart}>
						<fieldset>
							<legend>Agregar los productos al carro de compra</legend>

							<div>
								<label htmlFor="amount">Cantidad</label>
								<input
									type="number"
									id="amount"
									name="amount"
									value={formData.amount}
									min={0}
									onChange={getValuesToSearch}
								/>
							</div>

							<div>
								<label htmlFor="productId">ID del Producto</label>
								<input
									type="text"
									id="productId"
									name="productId"
									placeholder="ID del Producto"
									value={formData.productId}
									onChange={getValuesToSearch}
								/>
							</div>
						</fieldset>

						<button type="submit">Agregar</button>
					</form>
				</div>

				<div>
					<div>
						<p>
							Carrito de compra
							{orders.length > 0 && (
								<span> - Iniciado {orders[0].creation_date}</span>
							)}
						</p>
					</div>

					{/* mostrar si no hay productos en el carrito */}
					{orders.length === 0 && (
						<div className="">
							<p>
								No hay productos en el carro aun, prueba agregando arriba con su
								ID y la cantidad que deseas ingrear
							</p>
						</div>
					)}

					{/* Mostrar cuando productos en el carrito */}
					<ul className="flex flex-col gap-4">
						{loading && <div>Cargando...</div>}
						{error && <div>{error.message}</div>}

						{orders.map((order: IOrder) => (
							<li
								key={order.id}
								className="flex justify-between items-center gap-4"
							>
								<p>x {order.amount}</p>
								<p>{order.product.title}</p>
								<p>{order.product.price}</p>
								<p>{order.total}</p>
								<p>
									<img
										src={order?.product?.image}
										alt={order?.product?.title}
										className="block aspect-square w-16 h-16"
									/>
								</p>
							</li>
						))}

						{/* Mostrar el total de toda la compra */}
						{orders.length > 0 && (
							<li>
								Total de la compra:{" "}
								<strong>$ {calculateOrderTotal().toFixed(2)}</strong>
							</li>
						)}
					</ul>
				</div>
			</main>
		</>
	);
}

export default App;
