import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
         <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/admin" className="text-white hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Admin Dashboard
            </Link>
            <Link to="/" className="text-white hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              View Store
            </Link>
            <Link to="/products" className="text-white hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Products
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="text-white hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
