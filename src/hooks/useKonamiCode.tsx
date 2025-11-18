import { useEffect, useState } from "react";

const KONAMI_CODE = [
	"ArrowUp",
	"ArrowUp",
	"ArrowDown",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowLeft",
	"ArrowRight",
	"b",
	"a",
];

export const useKonamiCode = () => {
	const [isActivated, setIsActivated] = useState(false);
	const [input, setInput] = useState<string[]>([]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const key = e.key;
			const newInput = [...input, key].slice(-KONAMI_CODE.length);
			setInput(newInput);

			if (newInput.join("") === KONAMI_CODE.join("")) {
				setIsActivated(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [input]);

	const reset = () => setIsActivated(false);

	return { isActivated, reset };
};
