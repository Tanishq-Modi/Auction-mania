import { menulists } from "../../assets/data";
import { Container, CustomNavLinkList } from "./Design";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";



export const Header = () => {
  const [isOpen, setisOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const menuRef= useRef(null);

  const toggleMenu= ()=>{
    setisOpen(!isOpen);
  };

  const closeMenuOutSide = (event)=>{
    if(menuRef.current && !menuRef.current.contains(event.target)){
      setisOpen(false);
    }
  };

  const hadleScroll = ()=>{
    setIsScrolled(window.scrollY >0);
  };

  useEffect(()=>{
    document.addEventListener("mousedown",closeMenuOutSide);
    window.addEventListener("scroll",hadleScroll);

    return () => {
      document.removeEventListener("mousedown",closeMenuOutSide);
      window.removeEventListener("scroll",hadleScroll);

    };
  }, []);

  const isHomePage =location.pathname==="/";
  return (
    <header className={isHomePage ? `header py-1 bg-primary ${isScrolled ? "scrolled" : ""}` : `header bg-white shadow-s1 ${isScrolled ? "scrolled" : ""}`}>
      <Container>
        <nav className="p-4 flex justify-between items-center relative">
          <div className="flex items-center gap-14">
            <div>
              <img src="../images/common/header-logo.png" alt="logo" className="h-11" />
            </div>
            <div className="hidden lg:flex items-center justify-between gap-8">
              {menulists.map((list,index)=>(
                <li key={index} className="capitalize list-none text-white">
                  <CustomNavLinkList href={list.path}>{list.link}</CustomNavLinkList>
                </li>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-8 icons">
            <div className="hidden lg:flex lg:items-center lg:gap-8 text-white">
            <IoSearchOutline size={23} />
            <CustomNavLinkList href={"/seller/login"}>Become a seller</CustomNavLinkList>
            <CustomNavLinkList href={"/login"}>Sign in</CustomNavLinkList>
            <CustomNavLinkList href={"/register"}>Join</CustomNavLinkList>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};
