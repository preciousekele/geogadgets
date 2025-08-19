"use client";
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { formatNaira } from "@/utils/nairaprice/FormatPrice";

const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
  } = useAppContext();

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 md:px-6 lg:px-16 xl:px-32 pt-8 lg:pt-14 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 lg:mb-8 border-b border-gray-500/30 pb-4 lg:pb-6">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-500">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-base md:text-lg lg:text-xl text-gray-500/80">
              {getCartCount()} {getCartCount() === 1 ? "Item" : "Items"}
            </p>
          </div>

          {/* Mobile Card Layout */}
          <div className="block md:hidden space-y-4">
            {Object.keys(cartItems).map((itemId) => {
              const product = products.find(
                (product) => product._id === itemId
              );

              if (!product || cartItems[itemId] <= 0) return null;

              return (
                <div key={itemId} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover mix-blend-multiply"
                          width={64}
                          height={64}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 truncate mb-2">
                        {product.name}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Price:</span>
                          <span className="text-sm font-medium text-gray-700">
                            {formatNaira(product.offerPrice)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Quantity:</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  product._id,
                                  cartItems[itemId] - 1
                                )
                              }
                              className="p-1"
                            >
                              <Image
                                src={assets.decrease_arrow}
                                alt="decrease"
                                className="w-3 h-3"
                              />
                            </button>
                            <input
                              onChange={(e) =>
                                updateCartQuantity(
                                  product._id,
                                  Number(e.target.value)
                                )
                              }
                              type="number"
                              value={cartItems[itemId]}
                              className="w-8 h-6 border text-center text-xs appearance-none rounded"
                            />
                            <button 
                              onClick={() => addToCart(product._id)}
                              className="p-1"
                            >
                              <Image
                                src={assets.increase_arrow}
                                alt="increase"
                                className="w-3 h-3"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-500">Total:</span>
                          <span className="text-sm font-semibold text-gray-800">
                            {formatNaira(product.offerPrice * cartItems[itemId])}
                          </span>
                        </div>
                      </div>
                      <button
                        className="text-xs text-orange-600 mt-3 hover:text-orange-700"
                        onClick={() => updateCartQuantity(product._id, 0)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find(
                    (product) => product._id === itemId
                  );

                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <tr key={itemId}>
                      <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                        <div>
                          <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              className="w-16 h-auto object-cover mix-blend-multiply"
                              width={1280}
                              height={720}
                            />
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-800">{product.name}</p>
                          <button
                            className="text-xs text-orange-600 mt-1"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-gray-600">
                        {formatNaira(product.offerPrice)}
                      </td>
                      <td className="py-4 md:px-4 px-1">
                        <div className="flex items-center md:gap-2 gap-1">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                product._id,
                                cartItems[itemId] - 1
                              )
                            }
                          >
                            <Image
                              src={assets.decrease_arrow}
                              alt="decrease_arrow"
                              className="w-4 h-4"
                            />
                          </button>
                          <input
                            onChange={(e) =>
                              updateCartQuantity(
                                product._id,
                                Number(e.target.value)
                              )
                            }
                            type="number"
                            value={cartItems[itemId]}
                            className="w-8 border text-center appearance-none"
                          />
                          <button onClick={() => addToCart(product._id)}>
                            <Image
                              src={assets.increase_arrow}
                              alt="increase_arrow"
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-gray-600">
                        {formatNaira(product.offerPrice * cartItems[itemId])}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => router.push("/all-products")}
            className="group flex items-center mt-6 gap-2 text-orange-600 hover:text-orange-700 transition-colors"
          >
            <Image
              className="group-hover:-translate-x-1 transition-transform"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
            />
            Continue Shopping
          </button>
        </div>
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;