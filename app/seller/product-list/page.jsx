'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { formatNaira } from "@/utils/nairaprice/FormatPrice";

const ProductList = () => {

  const { router, getToken, user } = useAppContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSellerProduct = async () => {
    try {
      
      const token = await getToken()

      const { data } = await axios.get('/api/product/seller-list', {headers: {Authorization: `Bearer ${token}`}})

      if (data.success){
        setProducts(data.products)
        setLoading(false)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user){
      fetchSellerProduct();
    }
  }, [user])

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? <Loading /> : <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Product</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                <th className="px-4 py-3 font-medium truncate">
                  Price
                </th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-500/10 rounded p-2 flex-shrink-0">
                        <Image
                          src={product.image[0]}
                          alt="product Image"
                          className="w-12 sm:w-16"
                          width={1280}
                          height={720}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {product.name}
                        </div>
                        {/* Mobile: Show category and action below product name */}
                        <div className="sm:hidden space-y-2">
                          <div className="text-xs text-gray-500">
                            {product.category}
                          </div>
                          <button onClick={() => router.push(`/product/${product._id}`)} className="flex items-center gap-1 px-2 py-1 bg-orange-600 text-white rounded text-xs">
                            <span>Visit</span>
                            <Image
                              className="h-2.5"
                              src={assets.redirect_icon}
                              alt="redirect_icon"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                  <td className="px-2 sm:px-4 py-3 text-right sm:text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {formatNaira(product.offerPrice)}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    <button onClick={() => router.push(`/product/${product._id}`)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md">
                      <span className="hidden md:block">Visit</span>
                      <Image
                        className="h-3.5"
                        src={assets.redirect_icon}
                        alt="redirect_icon"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  );
};

export default ProductList;