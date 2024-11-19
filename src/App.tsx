import { Suspense, useEffect, useState } from "react";
import AddToCart from "./components/AddToCart";
import ShoppingCart from "./components/ShoppingCart";
import { fetchProductById } from "./hooks/fetching";
import type { IOrder } from "./interfaces/IOrder";
import type { IProduct } from "./interfaces/IProduct";
import type { UserAction } from "./interfaces/IUserAction";
import { dateFormat } from "./utils/date-format";

const WALLBIT_STORAGE_NAME: string = import.meta.env.VITE_WALLBIT_STORAGE_NAME;

function App() {
	const [orders, setOrders] = useState<IOrder[]>(
		JSON.parse(localStorage.getItem(WALLBIT_STORAGE_NAME)) ?? []
	);

	const [product, setProduct] = useState<IProduct | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleAddToCart = async ({ inputProductId, amount }): void => {
		const { data, loading, error } = await fetchProductById(inputProductId);
		setLoading(loading);

		if (data) {
			const newOrder: IOrder = {
				id: data.id,
				product: data,
				amount: amount,
				total: data.price * amount,
				creation_date: dateFormat(new Date()),
			};

			increment(newOrder, amount, "ADD");
		}
	};

	const increment = (
		currentOrder: IOrder,
		amount: number = 1,
		action: UserAction = "ADD"
	) => {
		const updatedOrders = [...orders];

		const foundIndex = updatedOrders.findIndex(
			(order): boolean => order.id === currentOrder.id
		);

		if (foundIndex !== -1) {
			if (action === "ADD" || action === "INCREMENT") {
				updatedOrders[foundIndex] = {
					...updatedOrders[foundIndex],
					amount: (updatedOrders[foundIndex].amount += amount),
					total:
						updatedOrders[foundIndex].amount *
						updatedOrders[foundIndex].product.price,
				};
			} else {
				updatedOrders[foundIndex] = {
					...updatedOrders[foundIndex],
					amount: (updatedOrders[foundIndex].amount -= amount),
					total:
						updatedOrders[foundIndex].amount *
						updatedOrders[foundIndex].product.price,
				};
			}
		} else {
			updatedOrders.push(currentOrder);
		}
		setOrders(updatedOrders);
	};

	useEffect(() => {
		window.localStorage.setItem(WALLBIT_STORAGE_NAME, JSON.stringify(orders));
	}, [orders]);

	return (
		<>
			<Suspense>
				<main className="min-h-screen p-4 flex flex-col gap-8">
					<h1 className="container max-w-screen-md mx-auto text-xl font-bold text-gray-800">
						Wallbit
					</h1>

					<div className="container max-w-screen-md mx-auto border border-gray-900/10 p-4 rounded-md">
						<AddToCart handleAddToCart={handleAddToCart} />
					</div>

					<div className="container max-w-screen-md mx-auto border border-gray-900/10 p-4 rounded-md">
						<div className="text-center p-4 text-gray-800 font-semibold">
							<p>
								Carrito de compra
								{orders.length > 0 && (
									<span> - Iniciado {orders[0].creation_date}</span>
								)}
							</p>
						</div>

						{/* mostrar si no hay productos en el carrito */}
						{orders.length === 0 && (
							<div className="p-4 text-gray-600 text-balance text-center">
								<p>
									No hay productos en el carro aun, prueba agregando arriba con
									su ID y la cantidad que deseas ingrear
								</p>
							</div>
						)}

						{/* Mostrar cuando productos en el carrito */}
						{loading && (
							<div className="p-4 text-center text-indigo-500">Cargando...</div>
						)}
						{error && (
							<div className="p-4 text-center text-rose-500">
								{error.message}
							</div>
						)}

						{orders.length > 0 && (
							<ShoppingCart orders={orders} handleIncrement={increment} />
						)}
					</div>
				</main>
			</Suspense>
		</>
	);
}

export default App;
