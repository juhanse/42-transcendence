import { useState } from 'react';
import { useModal } from "../../contexts/ModalContext";
import { Mail, KeyRound, Eye, EyeOff, X } from 'lucide-react';
import { Modal } from '../ui/Modal';

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="size-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20c11.046 0 20-8.954 20-20 0-1.303-.121-2.578-.389-3.917Z" fill="#FFC107" />
    <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-6.69 0-12.87 2.197-17.694 5.309Z" fill="#FF3D00" />
    <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C10.992 39.117 16.966 44 24 44Z" fill="#4CAF50" />
    <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l6.19 5.238C43.361 34.691 46 29.74 46 24c0-1.303-.121-2.578-.389-3.917Z" fill="#1976D2" />
  </svg>
);

const GithubLogo = () => (
  <svg viewBox="0 0 24 24" className="size-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export function LoginModal() {
  const { openModal, setLoggedIn, closeModal } = useModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const res = await fetch("/auth/login", { method: "POST" });

    if (res.status === 404) {
      openModal("REGISTER");
      return;
    }

    setLoggedIn(true);
    openModal("JOIN");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal onClose={close} open={true}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div
          className="bg-white rounded-3xl shadow-xl p-12 max-w-lg w-full relative"
          onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic à l'intérieur
        >
          {/* Bouton de fermeture (bonne pratique, même si absent de l'image) */}
          <button onClick={closeModal} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 focus:outline-none">
            <X className="size-6" />
          </button>

          {/* Titre */}
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">Se connecter</h2>

          {/* Description */}
          <p className="text-lg text-gray-700 text-center mb-10 leading-relaxed font-medium">
            Tu peux jouer à <span className="font-semibold">Who is Chad?</span> en te connectant avec ton compte, Google ou Github.
          </p>

          {/* Formulaire */}
          <form className="mb-8">
            <div className="relative mb-4">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 size-6 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-gray-100 rounded-full px-8 pl-16 py-4 text-lg border-none placeholder:text-gray-500 focus:ring-2 focus:ring-magenta focus:bg-white focus:outline-none transition"
              />
            </div>

            <div className="relative mb-4">
              <KeyRound className="absolute left-6 top-1/2 -translate-y-1/2 size-6 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full bg-gray-100 rounded-full px-8 pl-16 pr-16 py-4 text-lg border-none placeholder:text-gray-500 focus:ring-2 focus:ring-magenta focus:bg-white focus:outline-none transition"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff className="size-6" /> : <Eye className="size-6" />}
              </button>
            </div>

            {/* Lien Mot de passe oublié */}
            <a href="#" className="text-base text-gray-500 text-center block mb-8 hover:underline hover:text-gray-700">
              Mot de passe oublié ?
            </a>

            {/* Bouton Se connecter principal */}
            <button type="submit" className="w-full bg-magenta rounded-full py-5 text-xl font-semibold text-white shadow-md hover:bg-magenta-dark active:scale-[0.98] transition-all">
              Se connecter
            </button>
          </form>

          {/* Séparateur social (non présent dans l'image mais propre pour la structure) */}
          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400">ou</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Boutons de connexion sociale */}
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-4 bg-gray-100 rounded-full py-5 text-xl font-medium text-gray-800 border border-gray-200 shadow-sm hover:bg-gray-200 active:scale-[0.98] transition-all">
              <GoogleLogo />
              Se connecter avec Google
            </button>
            <button
              className="w-full flex items-center justify-center gap-4 bg-gray-100 rounded-full py-5 text-xl font-medium text-gray-800 border border-gray-200 shadow-sm hover:bg-gray-200 active:scale-[0.98] transition-all"
              onClick={() => handleLogin()}
            >
              <GithubLogo />
              Se connecter avec Github
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
