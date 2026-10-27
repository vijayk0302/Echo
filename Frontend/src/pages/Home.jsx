import { ArrowRight, MessageCircle, ShieldCheck, Zap, Users } from "lucide-react";
import useRedirect from "../hook/useRedirect.js";
import Navbar from "../components/Home/Navbar.jsx";
import Hero from "../components/Home/Hero.jsx";

const Home = () => {

  const { handlenavigate } = useRedirect()

  return (

    <>
      <div className="w-full overflow-hidden select-none">
        <Navbar />
        <Hero/>
      </div>
    </>
  );
};

export default Home;