import { useState, useEffect, useRef } from "react";
import burgerImg from "../assets/images/footer.png";
export default function DzDeliceBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello Rim! 👋 What are you in the mood for today? Pizza, pasta, or something else? and most important tell me and do not forget to mention if you have any allergy !",
      timestamp: "Wed 8:21 AM"
    },
    {
      id: 2,
      type: "user",
      content: "I like something spicy 🌶️ and I have allergy from parmesan",
      timestamp: "8:22 AM"
    },
    {
      id: 3,
      type: "bot",
      content: "First you have to avoid these meals be careful !",
      timestamp: "8:22 AM"
    },
    {
      id: 4,
      type: "bot-products",
      content: "meal-recommendations",
      products: [
        {
          id: 1,
          name: "Spaghetti Bolognese",
          description: "Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan",
          price: "1000",
          image: burgerImg,
          addToCart: true
        },
        {
          id: 2,
          name: "Spaghetti Bolognese",
          description: "Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan",
          price: "1000", 
          image: burgerImg,
          addToCart: true
        },
        {
          id: 3,
          name: "Spaghetti Bolognese",
          description: "Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan",
          price: "1000",
          image: burgerImg,
          addToCart: true
        },
        {
          id: 4,
          name: "Spaghetti Bolognese",
          description: "Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan",
          price: "1000",
          image: burgerImg, 
          addToCart: true
        }
      ],
      timestamp: "8:23 AM"
    },
    {
      id: 5,
      type: "bot",
      content: "Got it! How about a Spicy Chicken Pizza or Arrabbiata Pasta? Both are hot and delicious 🔥 Here is some recommendations:",
      timestamp: "8:23 AM"
    },
    {
      id: 6,
      type: "bot-products",
      content: "spicy-recommendations",
      products: [
        {
          id: 5,
          name: "Spaghetti Bolognese",
          description: "Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan",
          price: "1000",
          image: burgerImg,
          addToCart: true
        },
        {
          id: 6,
          name: "Spaghetti Bolognese", 
          description: "Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan",
          price: "1000",
          image: burgerImg,
          addToCart: true
        }
      ],
      timestamp: "8:24 AM"
    },
    {
      id: 7,
      type: "user",
      content: "My budget is 500 DA",
      timestamp: "8:25 AM"
    },
    {
      id: 8,
      type: "bot",
      content: "Perfect! The Arrabbiata Pasta is 750 DA. You'll even have some left for a drink 🥤 Want me to add it?",
      timestamp: "8:25 AM"
    },
    {
      id: 9,
      type: "bot-products",
      content: "budget-recommendation",
      products: [
        {
          id: 7,
          name: "Spaghetti Bolognese",
          description: "Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan",
          price: "1000",
          image: burgerImg,
          addToCart: true
        }
      ],
      timestamp: "8:26 AM"
    },
    {
      id: 10,
      type: "user",
      content: "Yes add pasta and a Coke",
      timestamp: "8:26 AM"
    },
    {
      id: 11,
      type: "bot",
      content: "Done! ✅ Your total is 690 DA, go to your order list to resume paying ! Bon appétit! And by the way you have 20 points ⭐ You can use them now for a free garlic bread 🍞 And Can you tell me your address if you want to deliver them to your house so I tell you the estimated arrival time of your order 🚗",
      timestamp: "8:27 AM"
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: "user",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
      setInputMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          content: "Great choice! I'm processing your order now. Is there anything else you'd like to add?",
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      }, 1000);
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 mb-3 shadow-sm">
      <div className="flex items-center space-x-3">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h4>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-sm">{product.price} DA</span>
            <button className="bg-black text-white px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition-colors whitespace-nowrap">
              Add Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen max-h-screen bg-gray-50">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs sm:text-sm font-bold">🤖</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-sm sm:text-base">DzDéliceBot</h3>
                <p className="text-xs text-green-600">● Always active</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <input type="text" placeholder="Search" className="px-3 py-1 border border-gray-300 rounded-lg text-sm w-32 lg:w-40" />
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </button>
                <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  </svg>
                </button>
                <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === "bot" ? (
                <div className="flex justify-start">
                  <div className="flex flex-col space-y-2 max-w-full md:max-w-2xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-3 sm:p-4 ml-8 sm:ml-10">
                      <p className="text-gray-800 text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ) : message.type === "bot-products" ? (
                <div className="flex justify-start">
                  <div className="flex flex-col space-y-2 max-w-full w-full">
                    <div className="ml-8 sm:ml-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {message.products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="flex flex-col space-y-1 max-w-full md:max-w-md">
                    <div className="bg-orange-500 text-white rounded-2xl px-3 py-2 sm:px-4 sm:py-3">
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 self-end">{message.timestamp}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            />
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 hidden sm:block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-orange-500 text-white p-2 sm:p-3 rounded-full hover:bg-orange-600 transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}