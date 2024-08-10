import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CartTab from './CartTab';

interface HeaderProps {
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  const count = useSelector((state: RootState) => state.counter.value);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  return (
    <>
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <a href="/" className="text-blue-600">MyStore</a>
          </div>

          <nav className="flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/products" className="text-gray-600 hover:text-blue-600">Products</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
          </nav>

          <div className="relative">
            <FaShoppingCart
              className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={toggleCart}
            />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {count}
            </span>
          </div>
        </div>
      </header>

      {isCartOpen && (
        <CartTab setIsCartOpen={setIsCartOpen} />
      )}
    </>
  );
};

export default Header;
