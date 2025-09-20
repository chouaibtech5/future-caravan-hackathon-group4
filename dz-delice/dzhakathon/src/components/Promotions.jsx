export default function Promotions() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        {/* Deal of the Day Card */}
        <div
          className="rounded-3xl shadow-lg border-0 p-6 relative overflow-hidden min-h-[180px] flex flex-col w-full lg:col-span-3"
          style={{
            backgroundImage: "url(/src/assets/images/promotion_bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Blurred background overlay */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

          <div className="relative z-10 flex-1 flex flex-col">
            <div className="mb-3">
              <h3
                className="text-[#F67F20]"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "17px",
                  lineHeight: "175%",
                  letterSpacing: "2%",
                }}
              >
                Deal of the Day
              </h3>
            </div>

            <div className="flex items-start gap-4 mb-3 flex-1">
              <div className="w-14 h-14 bg-orange-200 rounded-full flex items-center justify-center overflow-hidden shadow-md">
                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🍝</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-base mb-1 leading-tight">
                  Spaghetti + classic burger + soda
                </h4>
                <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                  Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan
                  + classic burger + soda of your choice
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-bold text-gray-900">800</span>
                  <span className="text-sm text-gray-900 font-medium">DA</span>
                  <span className="text-base text-gray-400 line-through font-medium">
                    1000 DA
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-gray-600 text-sm">
                Get <span className="text-[#F67F20] font-bold">FREE</span>{" "}
                delivery on every weekend.
              </p>
            </div>

            <button className="w-full bg-[#F67F20] text-white py-2.5 rounded-xl hover:bg-[#E55A2B] transition-all duration-300 font-semibold text-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
              Check Menu
            </button>
          </div>
        </div>

        {/* 50% off Burger Card */}
        <div
          className="relative rounded-3xl shadow-lg overflow-hidden w-full lg:col-span-2"
          style={{
            backgroundImage: "url(/src/assets/images/promotion_bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Blurred background overlay */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>

          <div className="relative p-4 text-center h-full flex flex-col justify-between min-h-[160px]">
            <div className="flex-1 flex items-center justify-center">
              <img
                src="/src/assets/images/Burger image.png"
                alt="Burger"
                className="w-64 h-64 object-cover"
              />
            </div>

            <div className="text-white space-y-1">
              <h3
                className="mb-1"
                style={{
                  fontFamily: "Playfair Display",
                  fontWeight: 700,
                  fontSize: "32px",
                  lineHeight: "130%",
                  letterSpacing: "2%",
                  textAlign: "center",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
              >
                50% off
              </h3>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "175%",
                  letterSpacing: "2%",
                  textAlign: "center",
                }}
              >
                The full price of burgers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
