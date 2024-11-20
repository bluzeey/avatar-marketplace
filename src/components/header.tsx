import { useState } from "react";
import {
  Search,
  Sliders,
  Globe,
  Menu,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data/products"; // Import the product data

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (subcategory: string | null) => void;
};

export function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}: HeaderProps) {
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter popup
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to toggle mobile menu

  // Generate categories and subcategories dynamically from the products data
  const categories: { [key: string]: string[] } = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      if (!acc[product.category].includes(product.subcategory)) {
        acc[product.category].push(product.subcategory);
      }
      return acc;
    },
    {} as { [key: string]: string[] }
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null); // Reset subcategory when category changes
    setSearchQuery(""); // Reset search query
    setShowFilters(false); // Close filter popup
    setMobileMenuOpen(false); // Close mobile menu
  };

  const handleSubCategoryClick = (subcategory: string) => {
    setSelectedSubCategory(subcategory); // Filter directly on subcategory
    setShowFilters(false); // Close filter popup
    setMobileMenuOpen(false); // Close mobile menu
  };

  return (
    <header className="bg-[#0D0D0D] text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <>
          <Link href="/" className="text-2xl font-bold sm:hidden lg:block">
            <Image src="/logo.svg" alt="Logo" width={150} height={40} />
          </Link>

          <div className="lg:hidden lg:flex items-center flex-grow mx-8">
            {/* Search Bar and Category */}
            <div className="relative flex-grow">
              <div className="flex items-center bg-[#333333] px-4 py-1 rounded-full gap-4">
                {/* Keyword Search */}
                <div className="flex flex-1 flex-col">
                  <label className="text-xs text-gray-400">Keyword</label>
                  <input
                    type="text"
                    placeholder="Search Avatar"
                    className="bg-transparent border-none text-sm text-white placeholder-gray-500 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Divider */}
                <div className="h-6 w-[1px] bg-gray-600"></div>

                {/* Category Dropdown */}
                <div className="flex flex-1 flex-col">
                  <label className="text-xs text-gray-400">Category</label>
                  <select
                    className="bg-transparent border-none text-sm text-white focus:outline-none"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All</option>
                    {Object.keys(categories).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Icon */}
              <button className="absolute top-1 right-0 -translate-x-1/8 translate-y-1/8 bg-red-600 text-white rounded-full p-3">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
        <div className="hidden lg:flex items-center flex-grow mx-8">
          {/* Search Bar and Category */}
          <div className="relative flex-grow">
            <div className="flex items-center bg-[#333333] px-4 py-1 rounded-full gap-4">
              {/* Keyword Search */}
              <div className="flex flex-1 flex-col">
                <label className="text-xs text-gray-400">Keyword</label>
                <input
                  type="text"
                  placeholder="Search Avatar"
                  className="bg-transparent border-none text-sm text-white placeholder-gray-500 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Divider */}
              <div className="h-6 w-[1px] bg-gray-600"></div>

              {/* Category Dropdown */}
              <div className="flex flex-1 flex-col">
                <label className="text-xs text-gray-400">Category</label>
                <select
                  className="bg-transparent border-none text-sm text-white focus:outline-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All</option>
                  {Object.keys(categories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Icon */}
            <button className="absolute top-1 right-0 -translate-x-1/8 translate-y-1/8 bg-red-600 text-white rounded-full p-3">
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Filter Icon */}
          <button
            className="p-2 ml-4 rounded-full border border-white hover:bg-gray-700 relative"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Sliders className="h-4 w-4" />
            {showFilters && (
              <div className="absolute top-10 right-0 w-64 bg-[#222222] rounded-lg shadow-lg p-4 z-50">
                {/* Categories */}
                <ul className="text-sm text-gray-300">
                  {Object.keys(categories).map((cat) => (
                    <li
                      key={cat}
                      className="flex justify-between items-center py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleCategoryClick(cat)}
                    >
                      {cat}
                      <span className="text-gray-500">&gt;</span>
                    </li>
                  ))}
                </ul>

                {/* Subcategories */}
                {selectedCategory !== "all" && (
                  <div className="mt-4">
                    <h3 className="text-gray-400 text-sm mb-2">
                      Subcategories in {selectedCategory}
                    </h3>
                    <ul className="text-sm text-gray-300">
                      {categories[selectedCategory]?.map((subCat) => (
                        <li
                          key={subCat}
                          className="py-1 hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleSubCategoryClick(subCat)}
                        >
                          {subCat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </button>

          {/* User Actions */}
          <div className="flex items-center gap-4 ml-4">
            <Link
              href="/create"
              className="text-sm font-medium hover:text-gray-400"
            >
              List your creation
            </Link>
            <button className="p-2 rounded-full hover:bg-gray-700">
              <Globe className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700">
              <Menu className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 rounded-full border border-white hover:bg-gray-700">
              <User className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 rounded-full border border-white hover:bg-gray-700">
              <ShoppingCart className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center">
          {/* Hamburger Menu Icon */}
          <button
            className="p-2 rounded-full hover:bg-gray-700"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed top-0 right-0 h-full w-4/5 bg-[#0D0D0D] text-white shadow-lg transform transition-transform duration-300 z-50"
          style={{
            transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Navigation Items */}
          <nav className="mt-12 px-4 space-y-4 text-center flex flex-col justify-center h-full">
            <Link
              href="/"
              className="block text-sm font-medium hover:text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              List your creation
            </Link>
            <button
              className="block text-sm font-medium hover:text-gray-400"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              Filters
            </button>
            {/* Filters Dropdown */}
            {showFilters && (
              <div className="text-sm text-gray-300 text-left">
                <ul>
                  {Object.keys(categories).map((cat) => (
                    <li
                      key={cat}
                      className="py-2 hover:text-white cursor-pointer"
                      onClick={() => handleCategoryClick(cat)}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* User Actions */}
            <div className="flex flex-col items-center gap-4 mt-4">
              <button className="flex items-center p-2 rounded-full hover:bg-gray-700">
                <Globe className="h-5 w-5 text-white" />
                <span className="ml-2 text-white">Explore</span>
              </button>
              <button className="flex items-center p-2 rounded-full hover:bg-gray-700">
                <User className="h-5 w-5 text-white" />
                <span className="ml-2 text-white">Profile</span>
              </button>
              <button className="flex items-center p-2 rounded-full hover:bg-gray-700">
                <ShoppingCart className="h-5 w-5 text-white" />
                <span className="ml-2 text-white">Cart</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
