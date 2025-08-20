"use client"
import React, { useEffect } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router, user } = useAppContext();
  const { openSignIn} = useClerk();

  // Auto-prompt sign in after 5 seconds if user is not authenticated
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        openSignIn();
      }
    }, 6000); 

    return () => clearTimeout(timer);
  }, [user, openSignIn]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-100 text-gray-700">
      {/* <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      /> */}
      <div className="logo text-1xl font-bold">
  <span className="text-yellow-700">G</span>EO GADGETS
</div>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition text-sm">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition text-sm">
          Shop
        </Link>
        {/* <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link> */}
        <a href="#contact" className="hover:text-gray-900 transition text-sm">
          Contact
        </a>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        { user 
        ? <>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="Gadgets" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')}/>
          </UserButton.MenuItems>
        </UserButton>
        </> : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition text-sm">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button> }
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
          { user 
        ? <>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')}/>
          </UserButton.MenuItems>
        </UserButton>
        </> : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button> }
      </div>
    </nav>
  );
};

export default Navbar;