import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import TrainingModules from "./components/TrainingModules";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TrainingModules />
      <About />
      <Footer />
    </main>
  );
}
