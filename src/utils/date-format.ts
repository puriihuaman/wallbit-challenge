export const dateFormat = (currentDate: Date): string => {
	const day: string = String(currentDate.getDate()).padStart(2, "0");
	const month: string = String(currentDate.getMonth() + 1).padStart(2, "0");
	const year: number = currentDate.getFullYear();

	const hours: string = String(currentDate.getHours()).padStart(2, "0");
	const minutes: string = String(currentDate.getMinutes()).padStart(2, "0");

	return `${day}/${month}/${year} - ${hours}:${minutes}`;
};
