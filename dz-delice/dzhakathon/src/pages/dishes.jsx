import { useState, useMemo } from "react";
import Navbar from "../components/Navbar.jsx";
import ShopBagIcon from "../icons/ShopBagIcon.jsx";
import SearchIcon from "../icons/SearchIcon.jsx";
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
    category: "Burgers",
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
    category: "Pizza",
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
    category: "Sushi",
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
    category: "Mexican",
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
    category: "Asian",
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
    category: "Seafood",
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
    category: "Asian",
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
    category: "Middle Eastern",
  },
  {
    id: 9,
    title: "Caesar Salad",
    price: "1,650 DA",
    cuisine: "American",
    rating: 4.3,
    description: "Laitue romaine, croûtons, parmesan, sauce césar maison.",
    img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    isPopular: false,
    category: "Salads",
  },
  {
    id: 10,
    title: "Pasta Carbonara",
    price: "2,300 DA",
    cuisine: "Italian",
    rating: 4.7,
    description: "Pâtes fraîches, lardons, œufs, parmesan, poivre noir.",
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
    isPopular: true,
    category: "Pasta",
  },
  {
    id: 11,
    title: "Chicken Curry",
    price: "2,200 DA",
    cuisine: "Indian",
    rating: 4.5,
    description: "Poulet mijoté dans une sauce curry épicée, riz basmati.",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    isPopular: false,
    category: "Asian",
  },
  {
    id: 12,
    title: "Beef Steak",
    price: "4,500 DA",
    cuisine: "American",
    rating: 4.9,
    description:
      "Entrecôte de bœuf grillée, pommes de terre rôties, légumes de saison.",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    isPopular: true,
    category: "Grilled",
  },
];

const categories = [
  "All",
  "Burgers",
  "Pizza",
  "Sushi",
  "Mexican",
  "Asian",
  "Seafood",
  "Middle Eastern",
  "Salads",
  "Pasta",
  "Grilled",
];

export default function Dishes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const { toggleCartItem, isInCart } = useCart();

  const filteredDishes = useMemo(() => {
    let filtered = dishes.filter((dish) => {
      const matchesSearch =
        dish.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.cuisine.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || dish.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort dishes
    switch (sortBy) {
      case "popular":
        return filtered.sort((a, b) => b.isPopular - a.isPopular);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "price-low":
        return filtered.sort(
          (a, b) =>
            parseFloat(a.price.replace(/[^\d]/g, "")) -
            parseFloat(b.price.replace(/[^\d]/g, ""))
        );
      case "price-high":
        return filtered.sort(
          (a, b) =>
            parseFloat(b.price.replace(/[^\d]/g, "")) -
            parseFloat(a.price.replace(/[^\d]/g, ""))
        );
      case "name":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <h1
          className="text-4xl font-bold text-[#07143B] mb-2"
          style={{
            fontFamily: "Playfair Display",
            fontWeight: 700,
          }}
        >
          Our Menu
        </h1>
        <p className="text-gray-600 text-lg">
          Discover our delicious collection of dishes
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar and Sort */}
          <div className="flex flex-col lg:flex-row gap-4 items-center px-4 lg:px-8">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F67F20] focus:border-transparent outline-none"
              />
            </div>

            {/* Sort Options */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full lg:w-auto px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F67F20] focus:border-transparent outline-none bg-white min-w-[200px]"
              >
                <option value="popular">Sort by Popular</option>
                <option value="rating">Sort by Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-[#F67F20] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredDishes.map((dish) => (
            <article
              key={dish.id}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer"
              onClick={() => (window.location.href = `/dish/${dish.id}`)}
            >
              {/* Image with Popular Tag */}
              <div className="relative overflow-hidden">
                <img
                  src={dish.img}
                  alt={dish.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {dish.isPopular && (
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
                    {dish.price}
                  </span>
                  <button
                    onClick={() => toggleCartItem(dish)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
                      isInCart(dish.id)
                        ? "bg-[#F67F20]"
                        : "hover:bg-[#F67F20]/10"
                    }`}
                  >
                    <ShopBagIcon
                      size={16}
                      className={
                        isInCart(dish.id) ? "text-white" : "text-[#F67F20]"
                      }
                    />
                  </button>
                </div>

                {/* Cuisine and Rating */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{dish.cuisine}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">
                      {dish.rating}
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
                  {dish.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No dishes found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-6 py-2 bg-[#F67F20] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
