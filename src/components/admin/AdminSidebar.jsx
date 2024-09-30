import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="sidebar-out-container">
      <div>
        <button
          className="jewel-admin-side-btn btn btn-icon btn-aside-show"
          onClick={toggleMenu}
        >
          <i className="aside-show-icon fas fa-stream"></i>
          <p className="aside-btn-menu-text">Menu</p>
        </button>
        <aside
          className={`navbar-aside ${showMenu ? "show" : "hide"}`}
          id="offcanvas_aside"
        >
          <div className="sidebar-container">
            <div className="aside-top">
              <div>
                <button
                  onClick={toggleMenu}
                  className="btn btn-icon btn-aside-minimize btn-aside-hide"
                >
                  <i className="text-muted fas fa-stream"></i>
                </button>
              </div>
            </div>

            <nav>
              <ul className="menu-aside">
                <li className="menu-item">
                  <NavLink className="menu-link" to="/admin/">
                    <i className="icon fas fa-home"></i>
                    <span className="text">Dashboard</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink className="menu-link" to="/admin/items">
                    <i className="icon fas fa-edit"></i>
                    <span className="text">View/Edit Items</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink className="menu-link" to="/admin/additem">
                    <i className="icon fas fa-cart-plus"></i>
                    <span className="text">Add New Item</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink className="menu-link" to="/admin/editbannerimages">
                    <i className="icon fas fa-book"></i>
                    <span className="text">Edit Banner Images</span>
                  </NavLink>
                </li>
                {/*<li className="menu-item">
                  <NavLink className="menu-link" to="/admin/catagories">
                    <i className="icon fas fa-list"></i>
                    <span className="text">Site Values</span>
                  </NavLink>
  </li>
                <li className="menu-item">
                  <NavLink className="menu-link" to="/admin/messages">
                    <i className="icon fas fa-mailbox"></i>
                    <span className="text">Messages</span>
                  </NavLink>
                </li>*/}
              </ul>
              <br />
              <br />
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminSidebar;
