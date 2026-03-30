import { useModal } from "../../contexts/ModalContext";

export function RegisterModal() {
	const { openModal, setLoggedIn } = useModal();
  
	const handleRegister = async () => {
		await fetch("/auth/register", { method: "POST" });
		setLoggedIn(true);
		openModal("JOIN");
	};
  
	return <button onClick={handleRegister}>Create account</button>;
}
