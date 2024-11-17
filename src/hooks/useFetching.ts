import { useEffect, useState } from "react";
import type { IProduct } from "../interfaces/IProduct";

const API_URL = "https://fakestoreapi.com/products";

type ErrorType = Error | null;

interface Params {
	data: IProduct;
	loading: boolean;
	error: ErrorType;
}

const useFetching = (productId: number) => {
	const [data, setData] = useState<IProduct>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ErrorType>(null);

	useEffect(() => {
		setLoading(true);

		const fetching = async () => {
			try {
				const response = await fetch(`${API_URL}/${productId}`);

				if (!response.ok) {
					throw new Error("Error");
				}

				const jsonData = await response.json();
				setData(jsonData);
				setError(null);
			} catch (error) {
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};

		fetching();
	}, [productId]);

	return { data, loading, error };
};

export { useFetching };
