import { Link } from "react-router-dom";
import ShopBagIcon from "../icons/ShopBagIcon.jsx";
import { useCart } from "../context/CartContext.jsx";

const dishes = [
  {
    id: 1,
    title: "Burger Classique",
    price: "2,095 DA",
    cuisine: "American",
    rating: 4.8,
    description:
      "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    isPopular: true,
  },
  {
    id: 2,
    title: "Pizza Margherita",
    price: "1,850 DA",
    cuisine: "Italian",
    rating: 4.6,
    description:
      "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
    isPopular: false,
  },
  {
    id: 3,
    title: "Sushi Roll",
    price: "3,200 DA",
    cuisine: "Japanese",
    rating: 4.9,
    description: "Riz vinaigré, saumon frais, avocat, algue nori, wasabi.",
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    isPopular: true,
  },
  {
    id: 4,
    title: "Tacos al Pastor",
    price: "1,750 DA",
    cuisine: "Mexican",
    rating: 4.8,
    description:
      "Tortillas de maïs fraîches, porc mariné aux épices, oignon rouge, coriandre fraîche, sauce piquante maison.",
    img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    isPopular: true,
  },
  {
    id: 5,
    title: "Pad Thai",
    price: "2,450 DA",
    cuisine: "Thai",
    rating: 4.7,
    description:
      "Nouilles de riz sautées, crevettes jumbo, tofu grillé, germes de soja croquants, cacahuètes concassées, sauce tamarin.",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    isPopular: true,
  },
  {
    id: 6,
    title: "Fish & Chips",
    price: "2,100 DA",
    cuisine: "British",
    rating: 4.4,
    description:
      "Cabillaud pané, frites croustillantes, sauce tartare, citron.",
    img: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400&h=300&fit=crop",
    isPopular: false,
  },
  {
    id: 7,
    title: "Ramen Tonkotsu",
    price: "2,800 DA",
    cuisine: "Japanese",
    rating: 4.8,
    description: "Bouillon de porc, nouilles, œuf mollet, nori, oignon vert.",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    isPopular: true,
  },
  {
    id: 8,
    title: "Chicken Shawarma",
    price: "1,900 DA",
    cuisine: "Middle Eastern",
    rating: 4.6,
    description: "Poulet mariné, pain pita, légumes frais, sauce à l'ail.",
    img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop",
    isPopular: false,
  },
];

export default function Trending() {
  const { toggleCartItem, isInCart } = useCart();

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="text-[#07143B]"
          style={{
            fontFamily: "Playfair Display",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "130%",
            letterSpacing: "2%",
          }}
        >
          Trending dishes
        </h2>
        <Link
          to="/dishes"
          className="flex items-center gap-2 hover:bg-[#EEEEEE] text-black px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          <span>View All</span>
          <div className="w-6 h-6 bg-[#F67F20] rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dishes.map((d) => (
          <article
            key={d.id}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer"
            onClick={() => (window.location.href = `/dish/${d.id}`)}
          >
            {/* Image with Popular Tag */}
            <div className="relative overflow-hidden">
              <img
                src={d.img}
                alt={d.title}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {d.isPopular && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-[#F67F20] px-3 py-1">
                  <svg
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-medium text-white">
                    POPULAR
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Price and Add Button */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-2xl font-bold text-[#F67F20]">
                  {d.price}
                </span>
                <button
                  onClick={() => toggleCartItem(d)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
                    isInCart(d.id) ? "bg-[#F67F20]" : "hover:bg-[#F67F20]/10"
                  }`}
                >
                  <ShopBagIcon
                    size={16}
                    className={isInCart(d.id) ? "text-white" : "text-[#F67F20]"}
                  />
                </button>
              </div>

              {/* Cuisine and Rating */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">{d.cuisine}</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-700">
                    {d.rating}
                  </span>
                  <svg
                    className="h-4 w-4 text-[#F67F20]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                {d.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {d.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
