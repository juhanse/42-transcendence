import { useModal } from "./ModalContext";
import { LoginModal } from "../components/modals/LoginModal";
import { RegisterModal } from "../components/modals/RegisterModal";
import { JoinGameModal } from "../components/modals/JoinGameModal";
import { CreateGameModal } from "../components/modals/CreateGameModal";
import { LaunchGameModal } from "../components/modals/LaunchGameModal";

export function ModalRoot() {
	const { step, closeModal } = useModal();
	console.log("Current modal step:", step);

	return (
		<>
		{step && (
			<div
				className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
				onClick={closeModal}
			>
				<div className="bg-white p-6 rounded shadow-lg" onClick={e => e.stopPropagation()}>
					{step === "LOGIN" && <LoginModal />}
					{step === "REGISTER" && <RegisterModal />}
					{step === "JOIN" && <JoinGameModal />}
					{step === "CREATE" && <CreateGameModal />}
					{step === "LAUNCH" && <LaunchGameModal />}
				</div>
			</div>
		)}
		</>
	);
}
