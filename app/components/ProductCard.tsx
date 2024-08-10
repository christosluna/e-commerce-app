import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { ProductCardProps } from '../interface';
import { addToCart } from '../store/slice';

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, description, price, rating }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col border rounded-lg shadow-sm overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{description.length > 100 ? `${description.substring(0, 100)}...` : description}</p>
        <p className="text-lg font-semibold mb-2">${price.toFixed(2)}</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500">{'⭐'.repeat(Math.round(rating))}</span>
          <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
        </div>
        <button
          onClick={() => dispatch(addToCart({
            id, image, title, description, price, rating,
            currency: '', quantity: 1
          }))}
          className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
