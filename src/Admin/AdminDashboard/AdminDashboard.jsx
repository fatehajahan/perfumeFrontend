import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';

const LayoutForAdmin = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {/* <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </div> */}
      </div>
    </div>
  );
};

export default LayoutForAdmin;
