import { useState, useParams } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({ products, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  const handleBack = () => {
    navigate('/products');
  };

  const handleOrder = () => {
    addToCart({ ...product, quantity });
    // Show success message
    alert(`${product.name} has been added to your cart!`);
    // Don't navigate away, just update the cart
  };

  return product ? (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 min-h-screen py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
        </div>
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-gray-500">${product.price}</p>
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                className="px-3 py-1 border rounded-md"
              >
                -
              </button>
              <span className="px-3 py-1 border rounded-md">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1 border rounded-md"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleOrder}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-8">Loading product...</div>
  );
};

export default ProductDetails;
