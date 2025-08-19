'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { formatNaira } from "@/utils/nairaprice/FormatPrice";

const Orders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSellerOrders = async () => {
        try {
            const token = await getToken()
            
            const { data } = await axios.get('/api/order/seller-orders', {headers:{Authorization:`Bearer ${token}`}})

            if (data.success) {
                setOrders(data.orders)
                setLoading(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchSellerOrders();
        }
    }, [user]);

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {loading ? <Loading /> : <div className="md:p-10 p-4 space-y-5">
                <h2 className="text-lg font-medium">Orders</h2>
                <div className="max-w-4xl rounded-md">
                    {orders.map((order, index) => (
                        <div key={index} className="flex flex-col gap-5 p-5 border-t border-gray-300 bg-white rounded-lg mb-4 shadow-sm">
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row gap-5 justify-between">
                                <div className="flex-1 flex gap-5">
                                    <Image
                                        className="max-w-16 max-h-16 object-cover flex-shrink-0"
                                        src={assets.box_icon}
                                        alt="box_icon"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <span className="font-medium text-gray-900">Order {index + 1}</span>
                                        <span className="text-gray-600">Items: {order.items.length}</span>
                                    </div>
                                </div>
                                
                                {/* Customer Address */}
                                <div className="md:max-w-60">
                                    <p className="text-sm">
                                        <span className="font-medium text-gray-900">{order.address.fullName}</span>
                                        <br />
                                        <span className="text-gray-600">{order.address.area}</span>
                                        <br />
                                        <span className="text-gray-600">{`${order.address.city}, ${order.address.state}`}</span>
                                        <br />
                                        <span className="text-gray-600">{order.address.phoneNumber}</span>
                                    </p>
                                </div>

                                {/* Order Info */}
                                <div className="md:max-w-40">
                                    <p className="flex flex-col gap-1 text-sm">
                                        <span className="text-gray-600">Method: COD</span>
                                        <span className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</span>
                                        <span className="text-gray-600">Payment: <span className="text-orange-600 font-medium">Pending</span></span>
                                    </p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="border-t pt-4">
                                <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                                <div className="space-y-2">
                                    {order.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md">
                                            <div className="flex-1">
                                                <span className="text-sm text-gray-900">{item.product.name}</span>
                                                <span className="text-xs text-gray-500 ml-2">x{item.quantity}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {formatNaira((item.price || item.offer || item.product.offerPrice || 0) * item.quantity)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {formatNaira(item.price || item.offer || item.product.offerPrice || 0)} each
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Order Total */}
                                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                                    <span className="font-semibold text-gray-900">Order Total</span>
                                    <span className="font-semibold text-lg text-gray-950">
                                        {formatNaira(order.amount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    );
};

export default Orders;