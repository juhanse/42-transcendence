import { useModal } from "../../contexts/ModalContext";

export function CreateGameModal() {
	const { openModal } = useModal();
	const data = { miniGame: ["game1", "game2"] };

	const handleCreate = async () => {
		await fetch("/game/create", {
			method: "POST",
			body: JSON.stringify(data),
		});
		openModal("LAUNCH");
	};

	return (
		<button
			className="bg-[#E43A70] text-white py-2 px-4 rounded"
			onClick={handleCreate}
		>
			Continuer
		</button>
	);
}
