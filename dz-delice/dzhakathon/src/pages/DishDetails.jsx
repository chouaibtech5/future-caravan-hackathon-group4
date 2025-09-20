import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ShopBagIcon from "../icons/ShopBagIcon.jsx";
import { useCart } from "../context/CartContext.jsx";

// Mock data - in a real app, this would come from an API
const dishes = [
  {
    id: 1,
    title: "Burger Classique",
    price: "2,095 DA",
    cuisine: "American",
    rating: 4.8,
    description:
      "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
    ingredients:
      "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade, tomate, oignon",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    isPopular: true,
    category: "Burgers",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar: "https://i.pravatar.cc/100?img=1",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Sarah Johnson",
        rating: 5,
        comment:
          "Absolutely amazing burger! The meat was perfectly cooked and the sauce was incredible. Will definitely order again!",
        date: "2024-01-12",
        avatar: "https://i.pravatar.cc/100?img=2",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 3,
        name: "Mike Chen",
        rating: 4,
        comment:
          "Great burger overall! The ingredients were fresh and the portion size was perfect. Only minor issue was the wait time.",
        date: "2024-01-10",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
      {
        id: 4,
        name: "Emma Davis",
        rating: 5,
        comment:
          "This burger exceeded my expectations! The combination of flavors was perfect and the presentation was beautiful.",
        date: "2024-01-08",
        avatar: "https://i.pravatar.cc/100?img=4",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 5,
        name: "Alex Rodriguez",
        rating: 3,
        comment:
          "Decent burger but nothing special. The price is a bit high for what you get. Might try again but not in a rush.",
        date: "2024-01-05",
        avatar: "https://i.pravatar.cc/100?img=5",
      },
      {
        id: 6,
        name: "Lisa Wang",
        rating: 4,
        comment:
          "Really enjoyed this burger! The meat was juicy and well-seasoned. The bun was fresh and the vegetables were crisp.",
        date: "2024-01-03",
        avatar: "https://i.pravatar.cc/100?img=6",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 7,
        name: "David Kim",
        rating: 5,
        comment:
          "Best burger I've had in a long time! The quality of ingredients really shows. Highly recommend to anyone!",
        date: "2024-01-01",
        avatar: "https://i.pravatar.cc/100?img=7",
      },
      {
        id: 8,
        name: "Maria Garcia",
        rating: 4,
        comment:
          "Very good burger with excellent presentation. The service was quick and friendly. Will definitely come back!",
        date: "2023-12-28",
        avatar: "https://i.pravatar.cc/100?img=8",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 9,
        name: "James Wilson",
        rating: 3,
        comment:
          "Good burger but the fries were cold when they arrived. The burger itself was tasty though.",
        date: "2023-12-25",
        avatar: "https://i.pravatar.cc/100?img=9",
      },
      {
        id: 10,
        name: "Anna Thompson",
        rating: 5,
        comment:
          "Outstanding burger! Every bite was a delight. The chef really knows how to balance flavors perfectly.",
        date: "2023-12-22",
        avatar: "https://i.pravatar.cc/100?img=10",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
      {
        id: 3,
        title: "Sushi Roll",
        price: "3,200 DA",
        description: "Riz vinaigré, saumon frais, avocat, algue nori, wasabi.",
        img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 2,
    title: "Pizza Margherita",
    price: "1,850 DA",
    cuisine: "Italian",
    rating: 4.6,
    description:
      "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
    ingredients:
      "Tomate, mozzarella, basilic frais, huile d'olive, pâte fine, parmesan",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=400&fit=crop",
    isPopular: false,
    category: "Pizza",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 4.0,
        comment: "Good pizza, fresh ingredients and nice crust.",
        date: "2024-01-10",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 3,
    title: "Sushi Roll",
    price: "3,200 DA",
    cuisine: "Japanese",
    rating: 4.9,
    description: "Riz vinaigré, saumon frais, avocat, algue nori, wasabi.",
    ingredients:
      "Riz vinaigré, saumon frais, avocat, algue nori, wasabi, gingembre mariné",
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop",
    isPopular: true,
    category: "Sushi",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-12",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 4,
    title: "Tacos al Pastor",
    price: "1,750 DA",
    cuisine: "Mexican",
    rating: 4.8,
    description:
      "Tortillas de maïs fraîches, porc mariné aux épices, oignon rouge, coriandre fraîche, sauce piquante maison.",
    ingredients:
      "Tortillas de maïs, porc mariné, oignon rouge, coriandre fraîche, sauce piquante, citron vert",
    img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop",
    isPopular: true,
    category: "Mexican",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-12",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 5,
    title: "Pad Thai",
    price: "2,450 DA",
    cuisine: "Thai",
    rating: 4.7,
    description:
      "Nouilles de riz sautées, crevettes jumbo, tofu grillé, germes de soja croquants, cacahuètes concassées, sauce tamarin.",
    ingredients:
      "Nouilles de riz, crevettes jumbo, tofu grillé, germes de soja, cacahuètes, sauce tamarin, œuf",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop",
    isPopular: true,
    category: "Asian",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-12",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 6,
    title: "Fish & Chips",
    price: "2,100 DA",
    cuisine: "British",
    rating: 4.4,
    description:
      "Cabillaud pané, frites croustillantes, sauce tartare, citron.",
    ingredients:
      "Cabillaud pané, pommes de terre, sauce tartare, citron, persil",
    img: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=600&h=400&fit=crop",
    isPopular: false,
    category: "Seafood",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-12",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 7,
    title: "Ramen Tonkotsu",
    price: "2,800 DA",
    cuisine: "Japanese",
    rating: 4.8,
    description: "Bouillon de porc, nouilles, œuf mollet, nori, oignon vert.",
    ingredients:
      "Bouillon de porc, nouilles, œuf mollet, nori, oignon vert, gingembre",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop",
    isPopular: true,
    category: "Asian",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-12",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 8,
    title: "Chicken Shawarma",
    price: "1,900 DA",
    cuisine: "Middle Eastern",
    rating: 4.6,
    description: "Poulet mariné, pain pita, légumes frais, sauce à l'ail.",
    ingredients:
      "Poulet mariné, pain pita, légumes frais, sauce à l'ail, tomate, oignon",
    img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&h=400&fit=crop",
    isPopular: false,
    category: "Middle Eastern",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-12",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 9,
    title: "Caesar Salad",
    price: "1,650 DA",
    cuisine: "American",
    rating: 4.3,
    description: "Laitue romaine, croûtons, parmesan, sauce césar maison.",
    ingredients:
      "Laitue romaine, croûtons, parmesan, sauce césar maison, tomate cerise",
    img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&h=400&fit=crop",
    isPopular: false,
    category: "Salads",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-12",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 10,
    title: "Pasta Carbonara",
    price: "2,300 DA",
    cuisine: "Italian",
    rating: 4.7,
    description: "Pâtes fraîches, lardons, œufs, parmesan, poivre noir.",
    ingredients: "Pâtes fraîches, lardons, œufs, parmesan, poivre noir, persil",
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=600&h=400&fit=crop",
    isPopular: true,
    category: "Pasta",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-12",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 11,
    title: "Chicken Curry",
    price: "2,200 DA",
    cuisine: "Indian",
    rating: 4.5,
    description: "Poulet mijoté dans une sauce curry épicée, riz basmati.",
    ingredients:
      "Poulet mijoté, sauce curry épicée, riz basmati, légumes, épices",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    isPopular: false,
    category: "Asian",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-12",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    id: 12,
    title: "Beef Steak",
    price: "4,500 DA",
    cuisine: "American",
    rating: 4.9,
    description:
      "Entrecôte de bœuf grillée, pommes de terre rôties, légumes de saison.",
    ingredients:
      "Entrecôte de bœuf grillée, pommes de terre rôties, légumes de saison, sauce au poivre",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
    isPopular: true,
    category: "Grilled",
    reviews: [
      {
        id: 1,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-15",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop",
        ],
      },
      {
        id: 2,
        name: "Floyd Miles",
        rating: 3,
        comment:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non d...",
        date: "2024-01-12",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop",
        ],
      },
    ],
    relatedItems: [
      {
        id: 1,
        title: "Burger Classique",
        price: "2,095 DA",
        description:
          "Pain moelleux, steak haché 100g, fromage cheddar, sauce spéciale, salade.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        title: "Pizza Margherita",
        price: "1,850 DA",
        description:
          "Tomate, mozzarella, basilic frais, huile d'olive sur pâte fine.",
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      },
    ],
  },
];

export default function DishDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, toggleCartItem } = useCart();

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [viewMode, setViewMode] = useState("card"); // "card" or "list"
  const [currentPage, setCurrentPage] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const dish = dishes.find((d) => d.id === parseInt(id));
  const reviewsPerPage = 4;
  const totalPages = dish ? Math.ceil(dish.reviews.length / reviewsPerPage) : 1;

  // Get current page reviews
  const getCurrentPageReviews = () => {
    if (!dish) return [];
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return dish.reviews.slice(startIndex, endIndex);
  };

  const currentPageReviews = getCurrentPageReviews();

  // Handle image loading and errors
  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('Failed to load dish image:', dish?.img);
    setImageLoading(false);
    setImageError(true);
  };

  // Fallback image placeholder
  const renderImagePlaceholder = () => (
    <div className="w-full lg:w-96 h-64 lg:h-80 bg-gray-200 rounded-xl flex items-center justify-center">
      <div className="text-center text-gray-500">
        <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
        <p className="text-sm">Image not available</p>
      </div>
    </div>
  );

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-[#F67F20]" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const renderImages = (images) => {
    // Handle case where images is undefined or null
    if (!images || !Array.isArray(images) || images.length === 0) {
      return null;
    }

    return (
      <div className="flex gap-2 mt-3">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Review image ${index + 1}`}
              className="w-12 h-12 rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    );
  };

  if (!dish) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Dish not found
          </h1>
          <button
            onClick={() => navigate("/dishes")}
            className="bg-[#F67F20] text-white px-6 py-2 rounded-lg hover:bg-[#E55A2B] transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const sizePrices = { S: 0, M: 0, L: 500, XL: 1000, XXL: 1500 };
  const currentPrice =
    parseFloat(dish.price.replace(/[^\d]/g, "")) + sizePrices[selectedSize];

  const handleAddToCart = () => {
    const itemToAdd = {
      ...dish,
      price: currentPrice.toString() + " DA",
      size: selectedSize,
      quantity,
      notes,
    };
    addToCart(itemToAdd);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div
          className="bg-white rounded-[20px] p-4 sm:p-6 lg:p-[25px] mb-8 w-full max-w-7xl mx-auto"
          style={{
            gap: "35px",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-[#F67F20] transition-colors flex-shrink-0"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1
                className="text-black text-lg sm:text-xl lg:text-2xl break-words"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  lineHeight: "130%",
                  letterSpacing: "2%",
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
              >
                {dish.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1">
                <span
                  className="text-black text-sm sm:text-base"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  {dish.rating}
                </span>
                <svg
                  className="text-[#F67F20] w-4 h-4 sm:w-5 sm:h-5"
                  style={{
                    borderRadius: "0.5px",
                  }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <button
                onClick={() => toggleCartItem(dish)}
                className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                  isInCart(dish.id)
                    ? "text-[#F67F20] bg-[#FFF1E6]"
                    : "text-gray-400 hover:text-[#F67F20]"
                }`}
              >
                <ShopBagIcon size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Product Image */}
            <div className="relative flex-shrink-0 w-full lg:w-auto">
              <img
                src={dish.img}
                alt={dish.title}
                className="w-full lg:w-96 h-64 lg:h-80 object-cover rounded-xl"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4 lg:space-y-6 flex-1 min-w-0">
              {/* Ingredients */}
              <div>
                <p
                  className="text-[#000000A8] break-words"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "130%",
                    letterSpacing: "2%",
                    verticalAlign: "middle",
                    fontVariantNumeric: "lining-nums proportional-nums",
                  }}
                >
                  {dish.ingredients}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <h3
                  className="text-black mb-3"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: "130%",
                    letterSpacing: "2%",
                    verticalAlign: "middle",
                    fontVariantNumeric: "lining-nums proportional-nums",
                  }}
                >
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-[10000px] border-2 transition-colors text-sm sm:text-base ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                      style={{
                        paddingTop: "3px",
                        paddingRight: "12px",
                        paddingBottom: "3px",
                        paddingLeft: "12px",
                        gap: "10px",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes/Allergies */}
              <div>
                <h3
                  className="text-black mb-2"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: "130%",
                    letterSpacing: "2%",
                    verticalAlign: "middle",
                    fontVariantNumeric: "lining-nums proportional-nums",
                  }}
                >
                  Notes / Allergies
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="No parmesan, Allergy from..."
                  className="w-full rounded-[5px] border border-gray-300 outline-none resize-none"
                  style={{
                    height: "87px",
                    paddingTop: "5px",
                    paddingRight: "6px",
                    paddingBottom: "5px",
                    paddingLeft: "6px",
                    gap: "10px",
                  }}
                  rows={3}
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 mb-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 mt-1 flex-shrink-0"
                />
                <span
                  className="text-[#000000A8] text-sm leading-tight"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "-0.7px",
                  }}
                >
                  Agree to terms and policies and the rule 18-07
                </span>
              </div>

              {/* Quantity Selector and Add to Cart */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-700"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-8 text-center text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-700"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center w-full sm:w-auto min-w-[200px]"
                  style={{
                    height: "33px",
                    borderRadius: "10000px",
                    paddingTop: "6px",
                    paddingRight: "22px",
                    paddingBottom: "6px",
                    paddingLeft: "22px",
                    gap: "10px",
                  }}
                >
                  <span
                    className="text-center"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "130%",
                      letterSpacing: "2%",
                      verticalAlign: "middle",
                      fontVariantNumeric: "lining-nums proportional-nums",
                    }}
                  >
                    Full price: {(currentPrice * quantity).toLocaleString()} DA
                    | Add to cart
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#F67F20] rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-[#F67F20] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "card"
                    ? "bg-[#F67F20] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Card View
              </button>
            </div>
          </div>

          {/* Reviews Content */}
          {viewMode === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentPageReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
                >
                  {/* User Info and Rating */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://i.pravatar.cc/100?img=1";
                        }}
                      />
                      <h3 className="font-semibold text-gray-900 text-base">
                        {review.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {review.comment}
                  </p>

                  {/* Review Images */}
                  {review.images && renderImages(review.images)}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentPageReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://i.pravatar.cc/100?img=1";
                        }}
                      />
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {review.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {review.comment}
                    </p>
                    {review.images && renderImages(review.images)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded ${
                        currentPage === page
                          ? "bg-[#F67F20] text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next &gt;
              </button>
            </div>
          )}
        </div>

        {/* Related Items */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You might also like
          </h2>
          <div className="space-y-3">
            {dish.relatedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[100px] p-6 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-sm">{item.price}</span>
                      <button className="bg-black text-white px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition-colors">
                        Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
