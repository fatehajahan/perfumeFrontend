import React, { useState } from 'react';
import logo from '../../../assets/homepage/logo1.png';
import profileImg from '../../../assets/noImg.jpg'
import { FaCartArrowDown, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { FaCircleUser, FaCommentDots, FaMoon } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosMenu } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../../slices/userSlice';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { clearCart } from '../../../slices/cartSlice';

const Navbar = ({ setCartOpen }) => {
  const url = import.meta.env.VITE_APP_URL;
  const data = useSelector((state) => state.cartDetails.cartItems)
  const user = useSelector((state) => state.userDetails.currentUser)
  // console.log(user.firstName)
  console.log(data.length)
  const [dropdown, setDropdown] = useState(false);
  const [profile, setProfile] = useState(false);
  console.log(user)

  const toggleMenu = (item) => {
    if (item === "profile") {
      setProfile((item) => !item);
      setDropdown(false);
    } else if (item === "dropdown") {
      setDropdown((item) => !item);
      setProfile(false);
    }
  };


  // logout
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${url}/authentication/logout`, {}, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      dispatch(removeUser()); // clear redux
      dispatch(clearCart()); // clear cart
      navigate("/login"); // or home
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };
  return (
    <div className='py-[20px] fixed bg-white top-0 left-0 w-full z-50'>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="container">
        <div className='flex justify-between items-center'>

          <IoIosMenu onClick={() => toggleMenu("dropdown")} className='text-black text-[30px] md:hidden block cursor-pointer ml-[10px]' />

          <Link to="/">
            <div className="middleLogo">
              <img src={logo} alt="" className='cursor-pointer w-[85px] md:hidden block ' onClick={() => {
                setCartOpen(false);
                setDropdown(false);
                setProfile(false);
              }} />
            </div>
          </Link>

          <div className='flex items-center text-[25px] gap-x-[20px] cursor-pointer md:hidden mr-[10px]'>
            <FaCartArrowDown className='hover:text-[#6a6a6a] transition duration-300' onClick={() => {
              setCartOpen(true);
              setDropdown(false);
              setProfile(false);
            }} />
            <FaCircleUser className='hover:text-[#6a6a6a] transition duration-300' onClick={() => toggleMenu("profile")} />

            {profile && (
              <div className='absolute right-0 md:right-[250px] top-[90px] z-50'>
                <div className='bg-white flex flex-col gap-y-[30px] py-[30px] px-[20px] rounded-lg shadow-lg'>
                  <Link to="/login" className='bg-black text-white hover:bg-transparent hover:text-black transition duration-500 px-[15px] text-center'>Login</Link>
                  <Link to="/registration" className='bg-black text-white hover:bg-transparent hover:text-black transition duration-500 px-[15px] text-center'>Registration</Link>
                </div>
              </div>
            )}
          </div>
        </div>


        <div className={`transition duration-300 ${dropdown ? 'translate-x-0' : "md:flex justify-between items-center hidden"}`}>
          <div className="leftNavitems md:flex items-center gap-x-[20px] font-urbanist text-[13px] cursor-pointer">
            <Link to="/buyPerfumes"><p className='md:pt-0 pt-[11px] md:px-0 px-[15px]' onClick={() => { setCartOpen(false), setDropdown(false) }}>BUY PERFUMES</p></Link>
            <Link to="/buyExclusive"><p className='md:pt-0 pt-[11px] md:px-0 px-[15px]' onClick={() => { setCartOpen(false), setDropdown(false) }}>EXCLUSIVE</p></Link>
            <Link to="/womenPerfumes"><p className='md:pt-0 pt-[11px] md:px-0 px-[15px]' onClick={() => { setCartOpen(false), setDropdown(false) }}>WOMEN</p></Link>
            <Link to="/menPerfumes"><p className='md:pt-0 pt-[11px] md:px-0 px-[15px]' onClick={() => { setCartOpen(false), setDropdown(false) }}>MEN</p></Link>
          </div>

          {/* Logo */}
          <Link onClick={() => { setCartOpen(false), setDropdown(false) }} to="/homePage">
            <div className="middleLogo">
              <img src={logo} alt="" className='cursor-pointer md:block hidden' />
            </div>
          </Link>

          {/* Desktop Profile & Cart */}
          <div className="rightnavitems md:flex items-center gap-x-[20px] font-urbanist text-[13px] cursor-pointer">
            <div className='md:pt-0 pt-[11px]'>
              <Link to="/aboutUs" className='md:px-0 px-[15px] uppercase' onClick={() => setDropdown(false)}>About Us</Link>
            </div>
            <div className='md:pt-0 pt-[11px]'>
              <Link to="/contact" className='md:px-0 px-[15px] ' onClick={() => setDropdown(false)}>CONTACT</Link>
            </div>
            <div className='md:flex items-center text-[25px] gap-x-[20px] cursor-pointer hidden relative'>
              <div className='relative'>
                <FaCartArrowDown className='hover:text-[#6a6a6a] transition duration-300' onClick={() => {
                  setCartOpen(true);
                  setDropdown(false);
                  setProfile(false);
                }} />

                {
                  data.length > 0 && <div onClick={() => setCartOpen(true)} className='bg-red-500 rounded-full w-[16px] h-[16px] absolute top-[-3px] right-[-4px]'>
                    {data.length > 9 ? <p className='text-[12px] font-semibold text-white text-center'>9+</p> : <p className='text-[12px] text-white font-semibold text-center'>{data.length}</p>}
                  </div>
                }

              </div>
              <FaCircleUser className='hover:text-[#6a6a6a] transition duration-300' onClick={() => toggleMenu("profile")} />

              {profile && (
                <div className='absolute right-0 top-[50px] z-50'>
                  {user ? (
                    <div className='w-[300px] bg-[#1c1e21] text-white rounded-lg shadow-lg p-4 font-sans'>
                      <div className='flex flex-col items-center mb-4'>
                        <img
                          src={profileImg}
                          alt='Profile'
                          className='w-[40px] h-[40px] rounded-full'
                        />
                        <p className='mt-2 font-semibold'>{user.firstName || 'User Name'}</p>
                        <button className='mt-2 text-sm text-gray-300 hover:underline'>{user.email}</button>
                      </div>

                      <hr className='border-gray-600 mb-4' />

                      <div className='space-y-3'>
                        <div className='flex items-center gap-3 hover:bg-[#3a3b3c] px-3 py-2 rounded cursor-pointer'>
                          <FaSignOutAlt />
                          <p onClick={handleLogout}>Log Out</p>
                        </div>
                      </div>

                      <div className='mt-4 text-xs text-gray-500 text-center'>
                        <p>Privacy · Terms · Advertising · Ad choices · Cookies · More</p>
                        <p className='mt-1'>Meta © 2025</p>
                      </div>
                    </div>
                  ) : (
                    <div className=' bg-white flex flex-col gap-y-[30px] py-[30px] px-[20px] rounded-lg shadow-lg'>
                      <Link to='/login' className='bg-black text-white hover:bg-transparent hover:text-black transition duration-500 px-[15px] text-center'>Login</Link>
                      <Link to='/' className='bg-black text-white hover:bg-transparent hover:text-black transition duration-500 px-[15px] text-center'>Registration</Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
