import type { IProduct } from "../interfaces/IProduct";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

type ErrorType = Error | null;

interface FetchingResult {
	data: IProduct | null;
	loading: boolean;
	error: ErrorType | null;
}

const fetchProductById = async (productId: number): Promise<FetchingResult> => {
	if (productId <= 0) {
		return { data: null, loading: true, error: null };
	}

	let loading: boolean = true;
	let data: IProduct | null = null;
	let error: ErrorType | null = null;

	try {
		const response = await fetch(`${BASE_URL}/${productId}`);
		if (!response.ok) {
			throw new Error("Error fetching product");
		}

		const result = await response.json();

		if (!result || !result.id) {
			throw new Error("No se encontro ese producto con ese ID");
		}
		data = result;
		error = null;
	} catch (err) {
		error = err as ErrorType;
	} finally {
		loading = false;
	}

	return { data, loading, error };
};
export { fetchProductById };
