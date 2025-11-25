import BestSellerSection from "../components/home/BestSellerSection";
import HeroSection from "../components/home/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <BestSellerSection />
    </main>
  );
}