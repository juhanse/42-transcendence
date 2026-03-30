import { useModal } from "../../contexts/ModalContext";

export function JoinGameModal() {
	const { openModal } = useModal();

	const joinGame = () => openModal("LAUNCH");
	const createGame = () => openModal("CREATE");

	return (
		<div className="flex flex-col gap-3">
			<button
				className="bg-[#E43A70] text-white py-2 rounded"
				onClick={joinGame}
			>
				Rejoindre
			</button>
			<button
				className="border py-2 rounded"
				onClick={createGame}
			>
				Créer
			</button>
		</div>
	);
}
