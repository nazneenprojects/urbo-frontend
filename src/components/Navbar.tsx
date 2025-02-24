import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="mt-4">
      <ul className="flex space-x-8">
        <li>
          <NavLink
            to="/features"
            className={({ isActive }) =>
              `text-green-700 hover:text-green-900 ${isActive ? 'font-semibold' : ''}`
            }
          >
            Features
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `text-green-700 hover:text-green-900 ${isActive ? 'font-semibold' : ''}`
            }
          >
            How it Works
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `text-green-700 hover:text-green-900 ${isActive ? 'font-semibold' : ''}`
            }
          >
            FAQ
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;