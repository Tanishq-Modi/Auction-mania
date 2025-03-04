import { Caption, CustomNavLink, Title } from "../common/Design";
import { CiGrid41 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { RiAuctionLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { User1 } from "../hero/Hero";
import { IoIosLogOut } from "react-icons/io";
import { CgProductHunt } from "react-icons/cg";
import { TbCurrencyDollar } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  const role = "admin";
  const className = "flex items-center gap-2 mb-2 p-2 rounded-md text-sm";

  return (
    <>
      <section className="sidebar flex flex-col justify-between h-full max-w-[200px] bg-white p-3">
        <div className="profile flex items-center text-center justify-center gap-4 flex-col mb-4">
          <img src={User1} alt="" className="w-20 h-20 rounded-full object-cover" />
          <div>
            <Title className="capitalize text-sm">Sunil B.K</Title>
            <Caption className="text-xs text-gray-500">example@gmail.com</Caption>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <CustomNavLink href="/dashboard" isActive={location.pathname === "/dashboard"} className={className}>
            <CiGrid41 size={18} />
            <span>Dashboard</span>
          </CustomNavLink>

          {(role === "seller" || role === "admin") && (
            <>
              <CustomNavLink href="/product" isActive={location.pathname === "/product"} className={className}>
                <MdOutlineCategory size={18} />
                <span>Products</span>
              </CustomNavLink>
              <CustomNavLink href="/add" isActive={location.pathname === "/add"} className={className}>
                <FaPlusCircle size={18} />
                <span>Add Product</span>
              </CustomNavLink>
            </>
          )}

          {role === "admin" && (
            <>
              <CustomNavLink href="/userlist" isActive={location.pathname === "/userlist"} className={className}>
                <FiUser size={18} />
                <span>Users</span>
              </CustomNavLink>

              <CustomNavLink href="/product/admin" isActive={location.pathname === "/product/admin"} className={className}>
                <CgProductHunt size={18} />
                <span>All Products</span>
              </CustomNavLink>

              <CustomNavLink href="/category" isActive={location.pathname === "/category"} className={className}>
                <MdOutlineCategory size={18} />
                <span>Categories</span>
              </CustomNavLink>

              <CustomNavLink href="/admin/income" isActive={location.pathname === "/admin/income"} className={className}>
                <TbCurrencyDollar size={18} />
                <span>Income</span>
              </CustomNavLink>
            </>
          )}

          <CustomNavLink href="/winning-products" isActive={location.pathname === "/winning-products"} className={className}>
            <RiAuctionLine size={18} />
            <span>Bids</span>
          </CustomNavLink>

          <CustomNavLink href="/favorites" isActive={location.pathname === "/favorites"} className={className}>
            <IoIosHeartEmpty size={18} />
            <span>Favorites</span>
          </CustomNavLink>

          <CustomNavLink href="/profile" isActive={location.pathname === "/profile"} className={className}>
            <IoSettingsOutline size={18} />
            <span>Profile</span>
          </CustomNavLink>

          <button className="flex items-center w-full gap-2 mt-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-md text-sm transition">
            <IoIosLogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </section>
    </>
  );
};

