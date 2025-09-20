import { useState } from "react";
import { Link } from "react-router-dom";
import ReservationModal from "./ReservationModal.jsx";
import SearchIcon from "../icons/SearchIcon.jsx";

export default function Hero() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <section className="relative min-h-[600px] ">
      <div
        className="container relative mx-auto grid items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-14"
        style={{ minWidth: "800px" }}
      >
        <div
          className="z-10"
          style={{ paddingTop: "20px", paddingRight: "20px" }}
        >
          <h1
            className="text-[#F67F20]"
            style={{
              width: "503px",
              height: "153px",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: "44px",
              lineHeight: "51px",
              letterSpacing: "0%",
              marginLeft: "50px",
              paddingTop: "40px",
            }}
          >
            Welcome to <span className="text-black">Dz</span>
            <span className="text-[#F67F20]">Délice</span> – Your Gateway to
            Delicious Moments
          </h1>
          <p
            className="mt-16 text-black ml-[50px]"
            style={{
              width: "435px",
              height: "52px",
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "26px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            Fresh, Fast & Hassle-Free Ordering
          </p>
          {/* Moved Search Bar (same design as navbar search) */}
          <div className="mt-6 ml-[50px] hidden md:block">
            <div
              className="flex w-[400px] items-center gap-3 rounded-[8px] bg-white border border-[#EAEAEA] px-4 py-2"
              style={{ height: "36px" }}
            >
              <SearchIcon size={18} />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#94A0BB]"
                placeholder="Search"
                style={{ fontSize: "14px" }}
              />
            </div>
          </div>
          <div
            className="mt-12 flex items-center gap-3 ml-[50px] "
            style={{ width: "500px" }}
          >
            <Link
              to="/dishes"
              className="bg-[#F67F20] text-white flex-shrink-0 hover:bg-[#E55A2B] transition-colors"
              style={{
                width: "183px",
                height: "52px",
                borderRadius: "1000px",
                paddingTop: "16px",
                paddingRight: "37px",
                paddingBottom: "16px",
                paddingLeft: "37px",
                gap: "10px",
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <span style={{ width: "109px", height: "20px" }}>Order Now</span>
            </Link>
            <button
              onClick={() => setIsReservationOpen(true)}
              className="border-2 border-[#F67F20] bg-white text-[#F67F20] flex-shrink-0 cursor-pointer hover:bg-[#F67F20] hover:text-white transition-colors"
              style={{
                width: "auto",
                height: "52px",
                borderRadius: "1000px",
                paddingTop: "16px",
                paddingRight: "37px",
                paddingBottom: "16px",
                paddingLeft: "37px",
                gap: "10px",
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ width: "158px", height: "20px" }}>
                Reserve a table
              </span>
            </button>
          </div>
        </div>

        {/* Hero food image with exact positioning */}
        <div
          className="absolute z-20 right-0"
          style={{
            width: "436px",
            height: "473px",
            bottom: "-90px",
            right: "100px",
          }}
        >
          <img
            src="/src/assets/images/hero.png"
            alt="Hero food bowl"
            className="h-full w-full object-cover drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </section>
  );
}
