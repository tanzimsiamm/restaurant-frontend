import BestSellerSection from "../components/home/BestSellerSection";
import HeroSection from "../components/home/HeroSection";
import PartnersSection from "../components/home/PartnersSection";
import TeamSection from "../components/home/TeamSection";
import CustomerFeedback from "../components/home/CustomerFeedback";
import Footer from "../components/layout/Footer";


export default function Home() {
  return (
    <>
      <HeroSection />
      <BestSellerSection />
      <CustomerFeedback />
      <TeamSection />
      <PartnersSection />
      <Footer />
    </>
  );
}