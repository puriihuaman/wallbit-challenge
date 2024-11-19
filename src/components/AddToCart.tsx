import { useState, type ChangeEvent } from "react";

type AddToCartProps = {
	handleAddToCart: ({ inputProductId, amount }) => void;
};

const AddToCart = ({ handleAddToCart }: AddToCartProps) => {
	const [amount, setAmount] = useState<number>(0);
	const [inputProductId, setInputProductId] = useState<number>(0);

	const handleSubmit = (ev): void => {
		ev.preventDefault();

		if (inputProductId <= 0 || amount <= 0) {
			return;
		}

		handleAddToCart({ inputProductId, amount });
		setAmount(1);
		setInputProductId(0);
	};

	return (
		<form
			action="#"
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 text-gray-800 sm:flex-row sm:items-end"
		>
			<fieldset className="flex flex-col gap-4 sm:flex-row sm:flex-1">
				<legend className="mb-4">
					Agregar los productos al carro de compra
				</legend>

				<div className="sm:flex-1">
					<div className="relative">
						<input
							className="peer w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 hover:border-indigo-600 shadow-sm focus:shadow"
							type="number"
							id="amount"
							name="amount"
							value={amount}
							min={1}
							autoFocus
							onChange={({ target }: ChangeEvent<HTMLInputElement>): void =>
								setAmount(Number(target.value))
							}
						/>
						<label
							htmlFor="amount"
							className={`absolute cursor-text bg-white px-1 left-2.5  text-gray-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-sm peer-focus:text-indigo-600 ${
								amount > 0 ? "text-sm -top-2" : "top-2.5"
							}`}
						>
							Cantidad
						</label>
					</div>
				</div>

				<div className="sm:flex-1">
					<div className="relative">
						<input
							className="peer w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 hover:border-indigo-600 shadow-sm focus:shadow"
							type="text"
							id="productId"
							name="productId"
							value={inputProductId}
							onChange={({ target }: ChangeEvent<HTMLInputElement>): void =>
								setInputProductId(Number(target.value))
							}
						/>
						<label
							htmlFor="productId"
							className={`absolute cursor-text bg-white px-1 left-2.5  text-gray-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-sm peer-focus:text-indigo-600 ${
								inputProductId > 0 ? "text-sm -top-2" : "top-2.5"
							}`}
						>
							ID del Producto
						</label>
					</div>
				</div>
			</fieldset>

			<button
				type="submit"
				className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Agregar
			</button>
		</form>
	);
};

export default AddToCart;
