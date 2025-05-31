import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Add this line

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/'); // This will redirect to your landing page (root route)
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-20 items-center min-w-0">
          {/* Logo and App Name - Responsive sizing */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink min-w-0">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 no-underline">
              <div className="relative group flex-shrink-0">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 150 150"
                  className="sm:w-[90px] sm:h-[90px] drop-shadow-2xl hover:drop-shadow-2xl transition-all duration-500 hover:scale-105"
                  style={{ minWidth: '60px', minHeight: '60px' }}
                >
                  <defs>
                    {/* Advanced Gradients */}
                    <radialGradient id="treeCore" cx="40%" cy="20%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#22c55e" />
                      <stop offset="70%" stopColor="#16a34a" />
                      <stop offset="100%" stopColor="#15803d" />
                    </radialGradient>
                    
                    <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#92400e" />
                      <stop offset="50%" stopColor="#a16207" />
                      <stop offset="100%" stopColor="#ca8a04" />
                    </linearGradient>
                    
                    <radialGradient id="leafGradient" cx="30%" cy="30%">
                      <stop offset="0%" stopColor="#84cc16" />
                      <stop offset="50%" stopColor="#65a30d" />
                      <stop offset="100%" stopColor="#4d7c0f" />
                    </radialGradient>
                    
                    <linearGradient id="moneyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    
                    <radialGradient id="glowEffect" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="70%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </radialGradient>

                    {/* Filters */}
                    <filter id="leafGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="leafBlur"/>
                      <feMerge> 
                        <feMergeNode in="leafBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    
                    <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="goldBlur"/>
                      <feMerge> 
                        <feMergeNode in="goldBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Base Shadow */}
                  <ellipse cx="80" cy="115" rx="45" ry="18" fill="#1f2937" opacity="0.3" />
                  
                  {/* Money Tree Trunk */}
                  <g className="group-hover:animate-pulse">
                    <rect x="65" y="80" width="20" height="40" fill="url(#trunkGradient)" rx="10" />
                    <rect x="67" y="85" width="4" height="30" fill="#d97706" opacity="0.6" />
                    <rect x="79" y="90" width="4" height="25" fill="#d97706" opacity="0.6" />
                  </g>
                  
                  {/* Main Tree Crown */}
                  <g className="group-hover:animate-bounce" style={{ animationDuration: '2s' }}>
                    {/* Large Center Leaf */}
                    <circle cx="75" cy="60" r="25" fill="url(#treeCore)" stroke="#16a34a" strokeWidth="3" filter="url(#leafGlow)" />
                    
                    {/* Side Leaves */}
                    <circle cx="50" cy="55" r="18" fill="url(#leafGradient)" opacity="0.8" />
                    <circle cx="100" cy="55" r="18" fill="url(#leafGradient)" opacity="0.8" />
                    <circle cx="60" cy="35" r="15" fill="url(#leafGradient)" opacity="0.7" />
                    <circle cx="90" cy="35" r="15" fill="url(#leafGradient)" opacity="0.7" />
                    <circle cx="75" cy="25" r="12" fill="url(#leafGradient)" opacity="0.6" />
                  </g>
                  
                  {/* Falling Money Leaves */}
                  <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                    <g transform="translate(40,45)">
                      <circle r="6" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="1" filter="url(#goldGlow)" />
                      <text textAnchor="middle" y="3" fontSize="8" fontWeight="bold" fill="#ffffff">$</text>
                      <animateTransform 
                        attributeName="transform" 
                        type="translate" 
                        values="40,45; 35,70; 30,95" 
                        dur="4s" 
                        repeatCount="indefinite"
                      />
                    </g>
                    
                    <g transform="translate(110,40)">
                      <circle r="6" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="1" filter="url(#goldGlow)" />
                      <text textAnchor="middle" y="3" fontSize="8" fontWeight="bold" fill="#ffffff">€</text>
                      <animateTransform 
                        attributeName="transform" 
                        type="translate" 
                        values="110,40; 115,65; 120,90" 
                        dur="5s" 
                        repeatCount="indefinite"
                      />
                    </g>
                    
                    <g transform="translate(25,30)">
                      <circle r="5" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="1" filter="url(#goldGlow)" />
                      <text textAnchor="middle" y="2" fontSize="7" fontWeight="bold" fill="#ffffff">¥</text>
                      <animateTransform 
                        attributeName="transform" 
                        type="translate" 
                        values="25,30; 20,60; 15,90" 
                        dur="6s" 
                        repeatCount="indefinite"
                      />
                    </g>
                  </g>
                  
                  {/* Growing Branches */}
                  <g className="animate-pulse" style={{ animationDuration: '2s' }}>
                    <path d="M75,80 Q85,70 95,60" stroke="#a16207" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
                    <path d="M75,80 Q65,70 55,60" stroke="#a16207" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
                    <path d="M75,75 Q80,65 85,55" stroke="#a16207" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                    <path d="M75,75 Q70,65 65,55" stroke="#a16207" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                  </g>
                  
                  {/* Orbiting Success Coins */}
                  <g className="animate-spin" style={{ transformOrigin: '75px 65px', animationDuration: '10s' }}>
                    <g transform="translate(75,15)">
                      <circle r="8" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="2" />
                      <text textAnchor="middle" y="4" fontSize="10" fontWeight="bold" fill="#ffffff">$</text>
                    </g>
                    
                    <g transform="translate(125,65)">
                      <circle r="8" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="2" />
                      <text textAnchor="middle" y="4" fontSize="10" fontWeight="bold" fill="#ffffff">£</text>
                    </g>
                    
                    <g transform="translate(25,65)">
                      <circle r="8" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="2" />
                      <text textAnchor="middle" y="4" fontSize="10" fontWeight="bold" fill="#ffffff">€</text>
                    </g>
                  </g>
                  
                  {/* Growth Sparkles */}
                  <g className="animate-ping" style={{ animationDuration: '2s' }}>
                    <path d="M35,30 L37,34 L41,34 L38,37 L39,41 L35,39 L31,41 L32,37 L29,34 L33,34 Z" fill="#fbbf24" opacity="0.8" />
                    <path d="M115,35 L117,39 L121,39 L118,42 L119,46 L115,44 L111,46 L112,42 L109,39 L113,39 Z" fill="#34d399" opacity="0.8" />
                    <path d="M45,25 L47,29 L51,29 L48,32 L49,36 L45,34 L41,36 L42,32 L39,29 L43,29 Z" fill="#22c55e" opacity="0.7" />
                  </g>
                  
                  {/* Root System (Underground Growth) */}
                  <g opacity="0.4" className="animate-pulse" style={{ animationDuration: '3s' }}>
                    <path d="M75,120 Q85,125 95,130" stroke="#92400e" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M75,120 Q65,125 55,130" stroke="#92400e" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M75,120 Q80,128 85,135" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M75,120 Q70,128 65,135" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </g>
                  
                  {/* Prosperity Aura */}
                  <circle 
                    cx="75" 
                    cy="65" 
                    r="40" 
                    fill="none" 
                    stroke="url(#glowEffect)" 
                    strokeWidth="1" 
                    opacity="0.2"
                    className="animate-pulse"
                    style={{ animationDuration: '4s' }}
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start justify-center flex-shrink min-w-0">
                <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-500 via-green-600 to-emerald-500 bg-clip-text text-transparent whitespace-nowrap">
                  Expensia
                </span>
                <span className="text-xs text-gray-500 tracking-wide whitespace-nowrap hidden sm:block">
                  "Simplify Spending. Amplify Success."
                </span>
              </div>
            </Link>
          </div>

          {/* Auth Section - Mobile Optimized */}
          <div className="flex items-center flex-shrink-0 ml-2">
            {isAuthenticated ? (
              <div className="relative z-50" ref={dropdownRef}>
                {/* User Profile Dropdown */}
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {/* User Avatar Icon with Circular Border */}
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm ring-2 ring-green-500 ring-offset-2 ring-offset-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </div>
                  {/* User Name (hidden on mobile) */}
                  <span className="hidden sm:inline text-gray-700 font-medium whitespace-nowrap">
                    {user?.name || 'User'}
                  </span>
                  {/* Dropdown Arrow - Hidden on mobile screens */}
                  <svg 
                    className={`hidden sm:block w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu - Fixed positioning and z-index */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200">
                    <div className="py-1">
                      {/* User Info Section (visible on mobile) */}
                      <div className="sm:hidden px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                      </div>
                      
                      {/* Logout Option */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Login Icon - Mobile Optimized */}
                <Link to="/login">
                  <div className="group relative cursor-pointer">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400/20 via-red-500/30 to-cyan-600/20 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-center overflow-hidden hover:scale-105">
                      {/* Glass morphism background layers */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent rounded-2xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/20 via-transparent to-cyan-400/20 rounded-2xl"></div>
                      
                      {/* Floating orbs for depth */}
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-white/60 to-emerald-300/40 rounded-full blur-[1px] animate-pulse"></div>
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-br from-cyan-300/50 to-white/30 rounded-full blur-[0.5px]"></div>
                      
                      {/* Elegant Key Icon - Responsive sizing */}
                      <svg 
                        width="18" 
                        height="18" 
                        className="sm:w-6 sm:h-6 relative z-10 text-red-800 drop-shadow-sm group-hover:text-red-600 transition-colors duration-300"
                        viewBox="0 0 24 24" 
                        fill="none"
                      >
                        {/* Key body */}
                        <circle 
                          cx="9" 
                          cy="9" 
                          r="4" 
                          stroke="currentColor" 
                          strokeWidth="2.2" 
                          strokeLinecap="round" 
                          fill="none"
                          className="group-hover:stroke-red-600 transition-colors duration-300"
                        />
                        {/* Key shaft */}
                        <path 
                          d="M13 13L20 20" 
                          stroke="currentColor" 
                          strokeWidth="2.2" 
                          strokeLinecap="round" 
                          className="group-hover:stroke-red-600 transition-colors duration-300"
                        />
                        {/* Key teeth */}
                        <path 
                          d="M17 17L19 19" 
                          stroke="currentColor" 
                          strokeWidth="2.2" 
                          strokeLinecap="round" 
                          className="group-hover:stroke-red-600 transition-colors duration-300"
                        />
                        <path 
                          d="M18 16L20 18" 
                          stroke="currentColor" 
                          strokeWidth="2.2" 
                          strokeLinecap="round" 
                          className="group-hover:stroke-red-600 transition-colors duration-300"
                        />
                      </svg>
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                    </div>
                    
                    {/* Floating ring animation */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 animate-ping opacity-20"></div>
                    
                    {/* Elegant tooltip - Hidden on mobile */}
                    <div className="hidden sm:block absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl backdrop-blur-sm border border-gray-700/50">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                      <span className="font-medium">Login</span>
                    </div>
                  </div>
                </Link>
                
                {/* Register Button - Text Button - Only visible on desktop */}
                <Link to="/register" className="hidden sm:block">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
