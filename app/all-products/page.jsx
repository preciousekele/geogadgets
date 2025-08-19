"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { assets } from "@/assets/assets";

const ProductsContent = () => {
  const { products } = useAppContext();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch = searchQuery === "" || [
      product.name,
      product.category,
      product.brand,
      product.model,
      product.description,
    ]
      .filter(Boolean) 
      .some(field => 
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const categories = [
    "All",
    "Smartphone",
    "Laptop",
    "Earphone",
    "Camera",
    "Headphone",
    "Watch",
    "Gaming Console",
    "Accessories",
  ];

  return (
    <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full pt-12">
        <div className="flex flex-col items-start md:items-end">
          <p className="text-2xl font-medium">All Gadgets</p>
          <div className="w-16 mt-1 h-0.5 bg-orange-600 rounded-full"></div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center border px-3 py-2 rounded-full mt-4 md:mt-0 max-w-md w-full md:w-72"
        >
          <input
            type="text"
            placeholder="Search gadgets, devices, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm"
          />
          <button type="submit">
            <Image
              src={assets.search_icon}
              alt="search"
              className="w-4 h-4 cursor-pointer"
            />
          </button>
        </form>
      </div>

      {/* Category Filter */}
      <div className="w-full mt-8">
        <div className="flex flex-wrap gap-2 justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-8 pb-14 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery ? `No products found for "${searchQuery}"` : "No products found"}
            </p>
            {searchQuery && (
              <p className="text-gray-400 text-sm mt-2">
                Try searching for different keywords or check the spelling
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Loading fallback component
const ProductsLoading = () => (
  <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full pt-12">
      <div className="flex flex-col items-start md:items-end">
        <p className="text-2xl font-medium">All Gadgets</p>
        <div className="w-16 mt-1 h-0.5 bg-orange-600 rounded-full"></div>
      </div>
      <div className="flex items-center border px-3 py-2 rounded-full mt-4 md:mt-0 max-w-md w-full md:w-72">
        <div className="flex-1 h-4 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
    
    <div className="w-full mt-8">
      <div className="flex flex-wrap gap-2 justify-start">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="px-4 py-2 bg-gray-200 animate-pulse rounded-full w-20 h-8"></div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8 pb-14 w-full">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-gray-200 animate-pulse rounded-lg aspect-square"></div>
      ))}
    </div>
  </div>
);

const AllProducts = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<ProductsLoading />}>
        <ProductsContent />
      </Suspense>
    </>
  );
};

export default AllProducts;