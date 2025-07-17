import React from "react";
import logo from "../assets/logo.webp"; 
import CustomConnectButton from "../customConnectButton";

const Header: React.FC = () => {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center justify-center ">
          
        <img src={logo} alt="Logo" className="h-15 w-auto" />
        <h1 className="text-2xl font-bold text-[#0C4E86] tracking-wide ml-[-50px]">
          NFT
        </h1>
        </div>
       
        <CustomConnectButton />
      </div>
    </header>
  );
};

export default Header;