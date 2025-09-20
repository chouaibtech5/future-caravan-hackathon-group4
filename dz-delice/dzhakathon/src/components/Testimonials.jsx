import GalleryIcon from "../icons/GalleryIcon.jsx";
import ArrowRightIcon from "../icons/ArrowRightIcon.jsx";

const reviews = [
  {
    id: 1,
    name: "Floyd Miles",
    rating: 3,
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 5,
    text: "The food quality is exceptional and the delivery was incredibly fast. I've been ordering from here for months and never been disappointed. Highly recommend!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Michael Chen",
    rating: 4,
    text: "Great variety of dishes and excellent customer service. The flavors are authentic and the portions are generous. Will definitely order again!",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    rating: 5,
    text: "Amazing taste and super fast delivery! The presentation is beautiful and the food is always fresh. This is now my go-to restaurant for takeout.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "David Wilson",
    rating: 4,
    text: "Consistent quality and great value for money. The staff is friendly and the ordering process is smooth. Highly satisfied with my experience.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Lisa Thompson",
    rating: 5,
    text: "Outstanding food and service! Every dish I've tried has been delicious and perfectly prepared. The delivery time is always accurate.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
  },
];

export default function Testimonials() {
  const duplicated = [...reviews, ...reviews];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="text-[#07143B]"
          style={{
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "130%",
            letterSpacing: "2%",
          }}
        >
          Reviews - Users Testimonials
        </h2>
      </div>
      <div className="space-y-6">
        <div className="marquee-container">
          <div className="marquee-track">
            {duplicated.map((r, idx) => (
              <div
                key={`row1-${r.id}-${idx}`}
                className="group relative overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
                style={{
                  width: "300px",
                  minHeight: "163px",
                  borderRadius: "11px",
                  padding: "10px",
                  marginRight: "24px",
                }}
              >
                <div className="flex flex-col gap-3">
                  {/* Avatar and Rating */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-[#FFC700] p-0.5">
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < r.rating ? "text-[#F67F20]" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* User Name */}
                  <h3
                    className="text-left font-semibold text-black"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "2%",
                    }}
                  >
                    {r.name}
                  </h3>

                  {/* Testimonial Text */}
                  <p
                    className="text-left"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "2%",
                      color: "#00000080",
                    }}
                  >
                    {r.text}
                  </p>

                  {/* See More Button */}
                  <div
                    className="flex items-center justify-start gap-1 text-black"
                    style={{
                      height: "18px",
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "2%",
                    }}
                  >
                    <GalleryIcon size={14} className="text-black" />
                    <span className="whitespace-nowrap">See more</span>
                    <ArrowRightIcon size={8} className="text-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-container">
          <div className="marquee-track reverse">
            {duplicated.map((r, idx) => (
              <div
                key={`row2-${r.id}-${idx}`}
                className="group relative overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
                style={{
                  width: "300px",
                  minHeight: "163px",
                  borderRadius: "11px",
                  padding: "10px",
                  marginRight: "24px",
                }}
              >
                <div className="flex flex-col gap-3">
                  {/* Avatar and Rating */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-[#FFC700] p-0.5">
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < r.rating ? "text-[#F67F20]" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* User Name */}
                  <h3
                    className="text-left font-semibold text-black"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "2%",
                    }}
                  >
                    {r.name}
                  </h3>

                  {/* Testimonial Text */}
                  <p
                    className="text-left"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "2%",
                      color: "#00000080",
                    }}
                  >
                    {r.text}
                  </p>

                  {/* See More Button */}
                  <div
                    className="flex items-center justify-start gap-1 text-black"
                    style={{
                      height: "18px",
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "2%",
                    }}
                  >
                    <GalleryIcon size={14} className="text-black" />
                    <span className="whitespace-nowrap">See more</span>
                    <ArrowRightIcon size={8} className="text-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
