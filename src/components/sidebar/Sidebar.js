import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Link, useLocation } from "react-router";

const pathConfig = {
  "/": 1,
  "/members": 2,
  "/branches": 3,
};

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(1);

  const { pathname } = useLocation();
  useEffect(() => {
    setActiveTab(pathConfig[pathname]);
    // console.log(pathname);
  }, [pathname]);

  return (
    <div className="sidebar">
      <Link to="/">
        <div className={`sidebar-item ${activeTab === 1 && "active"}`}>
          Add member
        </div>
      </Link>
      <Link to="/members">
        <div className={`sidebar-item ${activeTab === 2 && "active"}`}>
          Members
        </div>
      </Link>
      <Link to="/branches">
        <div className={`sidebar-item ${activeTab === 3 && "active"}`}>
          branches
        </div>
      </Link>
    </div>
  );
}
