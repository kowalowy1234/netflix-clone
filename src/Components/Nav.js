/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import '../Styles/Nav.css';
import { MdSearch, MdOutlineNotificationsNone, MdArrowDropDown } from "react-icons/md";


function Nav() {

  const iconStyle={color: 'white', fontSize: '25px', marginRight: '10px'};

  const [show, handeShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handeShow(true)
      } else handeShow(false)
    });
    return () => {
      window.removeEventListener("scroll");
    }
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>

      <div className='nav__leftColumn'>
        <img 
          className='nav__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg'
          alt=''
        />
        <div className='nav__links'>
          <a href=''>Home page</a>
          <a href=''>Series and programmes</a>
          <a href=''>Movies</a>
          <a href=''>My list</a>
          <a href=''>New and popular</a>
        </div>
      </div>

      <div className='nav__rightColumn'>
        <MdSearch style={iconStyle}/>
        <MdOutlineNotificationsNone style={iconStyle}/>
        <img 
          className='nav__profilePicture'
          src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'
          alt=''
        />
        <MdArrowDropDown style={{color: 'white', fontSize: '25px', marginRight: '0'}}/>
      </div>

    </div>
  )
}

export default Nav