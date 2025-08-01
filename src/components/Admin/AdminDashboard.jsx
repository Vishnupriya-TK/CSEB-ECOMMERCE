import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(savedProducts);
  }, []);

  const saveProducts = (productsToSave) => {
    localStorage.setItem('products', JSON.stringify(productsToSave));
    setProducts(productsToSave);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(product => 
        product.id === editingProduct.id 
          ? { ...newProduct, id: editingProduct.id }
          : product
      );
      saveProducts(updatedProducts);
      setSuccessMessage('Product updated successfully!');
      setEditingProduct(null);
    } else {
      // Add new product
      const newProducts = [...products, {
        ...newProduct,
        id: Date.now(),
        quantity: 0
      }];
      saveProducts(newProducts);
      setSuccessMessage('Product added successfully!');
    }
    setNewProduct({ name: '', description: '', price: '', image: '' });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      saveProducts(updatedProducts);
      setSuccessMessage('Product deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  // Filter out any cart-related properties from products before displaying
  const adminProducts = products.map(({ id, name, description, price, image }) => ({
    id,
    name,
    description,
    price,
    image
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setNewProduct({ name: '', description: '', price: '', image: '' });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          
          {/* Products List */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
            {adminProducts.length === 0 ? (
              <p className="text-gray-500">No products found. Add your first product above.</p>
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {adminProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex-shrink-0">
                            {product.image ? (
                              <div className="h-24 w-24 overflow-hidden rounded-md bg-white border border-gray-200 flex items-center justify-center">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="max-h-full max-w-full object-contain p-1"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                                    e.target.className = 'max-h-full max-w-full object-contain p-2';
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="h-24 w-24 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-xs text-center p-2">No image available</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                          <div className="mt-1 text-sm text-gray-500">{product.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-semibold text-gray-900">${parseFloat(product.price).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
