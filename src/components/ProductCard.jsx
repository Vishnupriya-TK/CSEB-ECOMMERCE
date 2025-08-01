import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  const defaultImg = 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image || defaultImg}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImg;
          }}
          alt={product.name}
          className="h-60 w-full object-contain p-4"
        />
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 flex-1">{product.description}</p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-blue-600 font-bold text-xl">${parseFloat(product.price).toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;