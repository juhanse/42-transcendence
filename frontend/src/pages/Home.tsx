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
      <div className="relative z-10 flex h-full min-h-screen">
        <div className="flex w-1/2 flex-col items-start gap-10 pl-10 pt-10">
          <img src="/logo.png" alt="WhoIsChad" className="w-72 object-contain drop-shadow-2xl" />

          <button
            onClick={handlePlay}
            className="w-72 rounded-2xl border-2 border-white/80 bg-[#E43A70] py-4 text-center text-3xl font-black tracking-wide text-white shadow-xl drop-shadow-lg transition-transform hover:scale-105"
          >
            Jouer
          </button>

          <div className="flex flex-1 flex-col justify-between mt-10">
            <nav className="flex flex-col gap-5 text-xl font-bold">
              <Link to="/faq" className="w-fit text-2xl hover:text-[#E43A70] transition-colors hover:scale-105">
                Les jeux
              </Link>
              <Link to="/friends" className="w-fit text-2xl hover:text-[#E43A70] transition-colors hover:scale-105">

                Mes amis
              </Link>
              <Link to="/history" className="w-fit text-2xl hover:text-[#E43A70] transition-colors hover:scale-105">
                Historique
              </Link>
            </nav>
            <nav className="flex flex-col gap-5 text-xl font-bold pb-10">
              <Link to="/hall-of-fleur" className="w-fit text-2xl hover:text-[#E43A70] transition-colors hover:scale-105">
                Subject
              </Link>
              <Link to="/proposer" className="w-fit text-2xl hover:text-[#E43A70] transition-colors hover:scale-105">
                Credits
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex w-1/2 flex-col items-end gap-10 pr-10 pt-10">
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-full border-2 border-white/20 bg-[#E43A70] px-5 py-2 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            Se connecter
          </Link>

          <Leaderboard count={5} />
        </div>
      </div>
    </div>
  );
}
