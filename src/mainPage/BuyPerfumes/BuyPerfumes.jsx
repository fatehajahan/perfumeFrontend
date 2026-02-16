import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BuyPerfumes = () => {
  const url = import.meta.env.VITE_APP_URL;

  const [products, setProducts] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(4);
  const [count, setCount] = useState(0);

  // Fetch all categories
  useEffect(() => {
    axios
      .get(`${url}/category/getallcategory`)
      .then((res) => {
        setGetCategory(res.data.data || []);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  // Fetch paginated products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${url}/product/getallproduct?page=${currentPage}&size=${productPerPage}`
        );
        setProducts(response.data.data || []);
        setCount(response.data.totalProducts || 0);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, productPerPage]);

  // Pagination
  const pageArr = [...Array(Math.ceil(count / productPerPage)).keys()].map((btn) => btn + 1);

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="md:py-[80px]">
      <div className="container">
        {isLoading ? (
          <div className="text-center py-[400px] text-xl font-semibold ">Loading...</div>
        ) : (
          <div>
            <div>
              <p className="font-cormot text-base uppercase tracking-wide text-black pt-[50px] font-medium">
                Check out our
              </p>
              <h3 className="font-cormot md:text-[84px] text-[30px] py-[20px]">Shop</h3>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-[20px] mx-auto max-w-[1320px] px-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <Link key={product._id} to={`/product/${product._id}`} className="relative">
                    {product.discount > 0 && (
                      <div className="absolute top-[10px] left-[10px] bg-yellow-400 py-[5px] w-[60px] text-center rounded">
                        <p className="font-urbanist font-bold text-xs">Sale!!</p>
                      </div>
                    )}
                    <div className="md:my-0 my-[30px]">
                      <div className="product1 cursor-pointer">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-[534px] md:w-auto"
                        />
                        <div className="pt-[15px]">
                          <p className="text-[#9D9D9D] text-[15px]">
                            {getCategory.find((cat) => cat._id === product.category)?.categoryName ||
                              'Unknown Category'}
                          </p>
                          <p className="font-cormot text-black text-[25px] font-semibold">
                            {product.name}
                          </p>
                          <div className="flex gap-x-[10px] text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                          <p className="pt-[10px] text-[20px] font-urbanist font-bold">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="col-span-4 text-center text-lg font-medium text-gray-500">
                  No products found.
                </p>
              )}
            </div>
          </div>
        )}

        {/* pagination buttons */}
        <div className="flex justify-end pt-[50px]">
          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-gray-600 py-[4.2px] px-[5px] rounded-xl text-white font-semibold cursor-pointer'
              }`}
            >
              Prev
            </button>

            {pageArr.map((btn) => (
              <button
                key={btn}
                onClick={() => handlePageChange(btn)}
                className={`cursor-pointer ${
                  currentPage === btn
                    ? 'bg-gray-500 py-[4.2px] px-[5px] rounded-xl text-white font-semibold'
                    : 'bg-transparent'
                }`}
              >
                {btn}
              </button>
            ))}

            <button
              disabled={currentPage === pageArr.length}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`${
                currentPage === pageArr.length
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-gray-600 py-[4.2px] px-[5px] rounded-xl text-white font-semibold cursor-pointer'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPerfumes;
