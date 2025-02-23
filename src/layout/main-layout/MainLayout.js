import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import "./main-layout.scss";

export default function MainLayout(props) {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout-body">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}
