

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './animation.css';

const DEFAULT_ACTIVE_LINK = '/home';

const links = [
  { to: '/home', icon: 'icon-home', label: 'Home', fill:'currentColor', svgPath: 'M21.6 8.2l-9-7c-0.4-0.3-0.9-0.3-1.2 0l-9 7c-0.3 0.2-0.4 0.5-0.4 0.8v11c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-11c0-0.3-0.1-0.6-0.4-0.8zM14 21h-4v-8h4v8zM20 20c0 0.6-0.4 1-1 1h-3v-9c0-0.6-0.4-1-1-1h-6c-0.6 0-1 0.4-1 1v9h-3c-0.6 0-1-0.4-1-1v-10.5l8-6.2 8 6.2v10.5z', svgPath2: '' },
  { to: '/search', icon: 'icon-search', label: 'Search', fill:'currentColor', svgPath: 'M21.7 20.3l-3.7-3.7c1.2-1.5 2-3.5 2-5.6 0-5-4-9-9-9s-9 4-9 9c0 5 4 9 9 9 2.1 0 4.1-0.7 5.6-2l3.7 3.7c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4zM4 11c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-0.8 3.7-2 4.9 0 0 0 0 0 0s0 0 0 0c-1.3 1.3-3 2-4.9 2-4 0.1-7.1-3-7.1-6.9z' , svgPath2: '' },

  { to: '/add', icon: 'icon-add', label: 'Item', fill:'none', svgPath: 'M0 0h24v24H0z', svgPath2: 'M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  { to: '/account', icon: 'icon-profile', label: 'Account', fill:'currentColor', svgPath: 'M16 14h-8c-2.8 0-5 2.2-5 5v2c0 0.6 0.4 1 1 1s1-0.4 1-1v-2c0-1.7 1.3-3 3-3h8c1.7 0 3 1.3 3 3v2c0 0.6 0.4 1 1 1s1-0.4 1-1v-2c0-2.8-2.2-5-5-5z' , svgPath2: 'M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zM12 4c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z'
 },
  

];

const BottomNavbar = () => {
  const [activeLink, setActiveLink] = useState(() => localStorage.getItem('activeLink') || DEFAULT_ACTIVE_LINK);

  useEffect(() => {
    localStorage.setItem('activeLink', activeLink);
  }, [activeLink]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className=''>
      <nav className="nav nav--icons bg-pink-300 py-4 px-2 md:hidden">
        <ul>
          {links.map(({ to, icon, label, fill, svgPath, svgPath2 }) => (
            <li key={to}>
              <Link
                to={to}
                className={`nav-link ${activeLink === to ? 'is-active' : ''}`}
                onClick={() => handleLinkClick(to)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                className={`icon ${icon}`} viewBox="0 0 24 24" width="24" height="24">
                  <path fill={fill} d={svgPath} />
                  <path fill="currentColor" d={svgPath2} />
                </svg>
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BottomNavbar;



