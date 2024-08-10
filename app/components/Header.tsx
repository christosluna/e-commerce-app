import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CartTab from './CartTab';

import { HeaderProps } from '../interface';

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  const count = useSelector((state: RootState) => state.counter.value);
  const items = useSelector((state: RootState) => state.counter.items);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Calculate the total amount price
  const totalAmount = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <>
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <a href="/" className="text-blue-600">MyStore</a>
          </div>

          <nav className="flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            {/* <a href="/products" className="text-gray-600 hover:text-blue-600">Products</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600">About</a> */}
          </nav>

          <div className="relative flex items-center">
            <FaShoppingCart
              className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={toggleCart}
            />
            <span className="absolute -top-2 left-3 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {count}
            </span>
            <div className="ml-4">
              <p className="text-gray-600">Total: ${totalAmount.toFixed(2)}</p>
            </div>
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
