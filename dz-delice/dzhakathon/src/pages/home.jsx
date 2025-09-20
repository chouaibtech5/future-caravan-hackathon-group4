import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Categories from "../components/Categories.jsx";
import Trending from "../components/Trending.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <main className="relative min-h-dvh bg-[#FFF8F0]">
      {/* Orange background image with exact positioning */}
      <div
        className="absolute"
        style={{
          width: "600x",
          height: "650px",
          top: "-50px",

          right: "-50px",
          zIndex: 1,
        }}
      >
        <img
          src="/src/assets/images/orng-pic.png"
          alt="Orange background"
          className="h-full w-full object-cover"
        />
      </div>

      <Navbar />
      <Hero />
      <Categories />
      <Trending />
      <Testimonials />

      <Footer />
    </main>
  );
}
