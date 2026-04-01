import { Link } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';
import Leaderboard from '../components/ui/Leaderboard';

export default function Home() {
  const { openModal, isLoggedIn } = useModal();

  const handlePlay = () => {
    console.log(openModal, isLoggedIn);
    openModal(isLoggedIn ? "JOIN" : "LOGIN");
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-slate-900 bg-cover bg-center text-white font-sans"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 via-slate-900/50 to-transparent" />

      <div className="absolute top-6 right-6 z-20">
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-full border-2 border-white/20 bg-[#E43A70] px-5 py-2 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
          Se connecter
        </Link>
      </div>

      <Leaderboard />

      <div className="relative z-10 flex h-full min-h-screen flex-col justify-center px-10 md:px-20 lg:px-32">
        <div className="mb-10 max-w-sm drop-shadow-2xl">
          <img
            src="/logo.png"
            alt="WhoIsChad"
            className="w-72 object-contain"
          />
        </div>

        <button
          onClick={handlePlay}
          className="mb-10 w-72 rounded-2xl border-2 border-white/80 bg-[#E43A70] py-4 text-center text-3xl font-black tracking-wide text-white shadow-xl drop-shadow-lg transition-transform hover:scale-105"
        >
          Jouer
        </button>

        <nav className="mb-16 flex flex-col gap-5 text-xl font-bold drop-shadow-md">
          <Link to="/faq" className="w-fit hover:text-[#E43A70] transition-colors">
            Les jeux
          </Link>
          <Link to="/hall-of-fleur" className="w-fit hover:text-[#E43A70] transition-colors">
            Subject
          </Link>
          <Link to="/proposer" className="w-fit hover:text-[#E43A70] transition-colors">
            Credits
          </Link>
        </nav>
      </div>
    </div>
  );
}
