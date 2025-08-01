import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart, updateQuantity, createOrder }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset order placed message when cart items change
    setOrderPlaced(false);
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    try {
      // Create the order
      createOrder(cartItems);
      
      // Show success message
      setOrderPlaced(true);
      
      // Navigate to orders page after a short delay
      setTimeout(() => {
        navigate('/orders');
      }, 1500);
    } catch (error) {
      console.error('Error during checkout:', error);
      // You might want to show an error message to the user here
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>

      {orderPlaced ? (
        <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">Order Placed Successfully!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Your order has been received and is being processed.</p>
                <p className="mt-1">Redirecting to your orders...</p>
              </div>
            </div>
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
          <p className="mt-1 text-sm text-gray-500">You don't have any items in your cart yet.</p>
          <div className="mt-6 space-x-4">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue Shopping
            </Link>
            {cartItems.length > 0 && (
              <button
                onClick={handleCheckout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="px-4 py-6 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">Order summary</h3>
            </div>
            <div className="mt-6">
              <div className="overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="px-4 py-6 sm:px-6">
                      <div className="flex space-x-6">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="flex-none w-20 h-20 object-contain p-1"
                            onError={(e) => {
                              console.error('Error loading cart item image:', item.image, e);
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-400 text-center">No image</span>
                          </div>
                        )}
                        <div className="flex-auto space-y-2">
                          <div className="flex justify-between items-start space-x-3">
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm font-medium text-gray-900">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                          <div className="flex space-x-4">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-sm text-gray-600">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Review your items and proceed to complete your purchase.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Proceed to Checkout
              </button>
            </div>
            
            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
              <p>
                or{' '}
                <button
                  type="button"
                  className="text-blue-600 font-medium hover:text-blue-500"
                  onClick={() => window.history.back()}
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
