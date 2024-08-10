import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/slice';

interface CartTabProps {
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartTab: React.FC<CartTabProps> = ({ setIsCartOpen }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.counter.items);
  console.log("cartItems", cartItems);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className="fixed top-0 right-0 max-w-xs w-full h-full bg-white shadow-lg z-50 border-l border-gray-200 overflow-y-auto">
      <button
        className="absolute top-4 right-4 text-red-500 text-2xl"
        onClick={toggleCart}
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold p-4">Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map(product => (
            <div key={product.id} className="flex items-center justify-between p-4 border-b border-gray-200">
              <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-md" />
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-800 font-bold">${product.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                    onClick={() => dispatch(decrementQuantity(product.id))}
                  >
                    -
                  </button>
                  <p className="mx-3 text-lg">{product.quantity}</p>
                  <button
                    className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                    onClick={() => dispatch(incrementQuantity(product.id))}
                  >
                    +
                  </button>
                </div>
                <button
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md w-full text-sm hover:bg-red-600"
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
          </div>
        </>
      ) : (
        <p className="p-4">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartTab;
    