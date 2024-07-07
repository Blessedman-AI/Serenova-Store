'use client';

import useCart from '@/hooks/UseCart';

import { UserButton, useUser } from '@clerk/nextjs';

import { CircleUserRound, Menu, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const cart = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => handleClickOutside(event);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false); // Close dropdown on pathname change
  }, [pathname]);

  return (
    <div className="sticky top-0 z-10 py-8 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <div className="max-w-[1440px] w-full flex gap-2 justify-between items-center">
        <Link href="/">
          <Image src="/icon.png" alt="logo" width={200} height={24} />
        </Link>

        <div className="flex gap-4 text-base-bold max-lg:hidden">
          <Link
            href="/"
            className={`hover:text-orange-1 ${
              pathname === '/' && 'text-orange-1'
            }`}
          >
            Home
          </Link>
          <Link
            href={user ? '/wishlist' : '/sign-in'}
            className={`hover:text-orange-1 ${
              pathname === '/wishlist' && 'text-orange-1'
            }`}
          >
            Wishlist
          </Link>
          <Link
            href={user ? '/orders' : '/sign-in'}
            className={`hover:text-orange-1 ${
              pathname === '/orders' && 'text-orange-1'
            }`}
          >
            Orders
          </Link>
        </div>

        <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
          <input
            className="outline-none max-sm:max-w-[120px]"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            disabled={query === ''}
            onClick={() => router.push(`/search/${query}`)}
          >
            <Search className="cursor-pointer h-4 w-4 hover:text-orange-1" />
          </button>
        </div>

        <div ref={dropdownRef} className="relative flex gap-3 items-center">
          <Link
            href="/cart"
            className="flex items-center gap-3 border rounded-lg 
          px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
          >
            <ShoppingCart />
            <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
          </Link>

          {user && (
            <Menu
              className="cursor-pointer lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}

          {isOpen && (
            <div
              className="absolute top-12 right-5 flex flex-col gap-4
           p-3 rounded-lg border bg-white text-base-bold lg:hidden"
            >
              <Link href="/" className="hover:text-orange-1">
                Home
              </Link>
              <Link
                href={user ? '/wishlist' : '/sign-in'}
                className="hover:text-orange-1"
              >
                Wishlist
              </Link>
              <Link
                href={user ? '/orders' : '/sign-in'}
                className="hover:text-orange-1"
              >
                Orders
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
              >
                <ShoppingCart />
                <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
                {/* <p className="text-base-bold">Cart 0</p> */}
              </Link>
            </div>
          )}

          {user ? (
            <UserButton afterSignOutUrl="/sign-in" />
          ) : (
            <Link href="/sign-in">
              <CircleUserRound />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
