import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, LayoutGrid, Package, Layers, ShoppingCart, ClipboardList } from 'lucide-react';

const Sidebar = () => {
  const url = import.meta.env.VITE_APP_URL;
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${url}/authentication/currentuser`, { withCredentials: true })
      .then((res) => setUser(res.data));
  }, [url]);

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-[280px] h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-700">
        <h1 className="text-2xl font-bold tracking-wide">Inessa Admin</h1>
        <p className="text-sm text-slate-400">Management Panel</p>
      </div>

      {/* Admin Menu */}
      {user?.role === 'admin' && (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <LayoutGrid size={18} /> E‑Commerce
            </span>
            <ChevronDown
              size={18}
              className={`transition ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isOpen && (
            <div className="space-y-5 pl-2">
              {/* Category */}
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Category</p>
                <nav className="space-y-1">
                  <Link to="/createcategory" className={`sidebar-link ${isActive('/createcategory') && 'active'}`}>
                    <Layers size={16} /> Create Category
                  </Link>
                  <Link to="/categorylist" className={`sidebar-link ${isActive('/categorylist') && 'active'}`}>
                    <Layers size={16} /> Category List
                  </Link>
                </nav>
              </div>

              {/* SubCategory */}
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Subcategory</p>
                <nav className="space-y-1">
                  <Link to="/createsubcategory" className="sidebar-link">
                    <Layers size={16} /> Create SubCategory
                  </Link>
                  <Link to="/subCategoryList" className="sidebar-link">
                    <Layers size={16} /> SubCategory List
                  </Link>
                </nav>
              </div>

              {/* Product */}
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Products</p>
                <nav className="space-y-1">
                  <Link to="/createproduct" className="sidebar-link">
                    <Package size={16} /> Create Product
                  </Link>
                  <Link to="/productList" className="sidebar-link">
                    <Package size={16} /> Product List
                  </Link>
                </nav>
              </div>

              {/* Orders */}
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Orders</p>
                <nav className="space-y-1">
                  <Link to="/orderList" className="sidebar-link">
                    <ClipboardList size={16} /> Order List
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Non‑admin */}
      {user?.role === 'user' && (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
          Admin access only
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700 text-xs text-slate-400">
        © 2025 Inessa
      </div>
    </aside>
  );
};

export default Sidebar;

/* Tailwind helper classes (add in global CSS)
.sidebar-link {
  @apply flex items-center gap-2 px-4 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition;
}
.active {
  @apply bg-slate-800 text-white;
}
*/
