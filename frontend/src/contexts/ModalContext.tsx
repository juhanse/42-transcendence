import { createContext, useContext, useState, type ReactNode } from "react";
import { ModalRoot } from "./ModalRoot";
export type ModalStep = null | "LOGIN" | "REGISTER" | "JOIN" | "CREATE" | "LAUNCH";

type ModalContextType = {
	step: ModalStep;
	openModal: (step: ModalStep) => void;
	closeModal: () => void;
	isLoggedIn: boolean;
	setLoggedIn: (v: boolean) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
	const [step, setStep] = useState<ModalStep>(null);
	const [isLoggedIn, setLoggedIn] = useState(false);

	const openModal = (step: ModalStep) => setStep(step);
	const closeModal = () => setStep(null);

	return (
		<ModalContext.Provider
			value={{ step, openModal, closeModal, isLoggedIn, setLoggedIn }}
		>
			{children}
			<ModalRoot />
		</ModalContext.Provider>
	);
}

export function useModal() {
	const ctx = useContext(ModalContext);
	if (!ctx) throw new Error("useModal must be used within ModalProvider");
	return ctx;
}
