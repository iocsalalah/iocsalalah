import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import AddMember from "./pages/add-member/AddMember";
import Branches from "./pages/branches/Branches";
import Login from "./pages/login/Login";
import MainLayout from "./layout/main-layout/MainLayout";
import Members from "./pages/members/Members";
import theme from "./material-ui/theme/Theme";
import { ThemeProvider } from "@emotion/react";
import EditMember from "./pages/members/edit-member/EditMember";
import Member from "./pages/members/member/Member";
import ScrollToTop from "./services/scrollToTop";
import IdCardContainer from "./pages/members/member/id-card/IdCardContainer";
import ProtectedRoutes from "./services/ProtectedRoutes";

export default function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route
                path="/"
                element={
                  <MainLayout>
                    <AddMember />
                  </MainLayout>
                }
              />
              <Route
                path="/branches"
                element={
                  <MainLayout>
                    <Branches />
                  </MainLayout>
                }
              />
              <Route
                path="/members"
                element={
                  <MainLayout>
                    <Members />
                  </MainLayout>
                }
              />
              <Route
                path="/edit-member/:id"
                element={
                  <MainLayout>
                    <EditMember />
                  </MainLayout>
                }
              />
              <Route
                path="/members/:id"
                element={
                  <MainLayout>
                    <Member />
                  </MainLayout>
                }
              />
              <Route
                path="/id-card"
                element={
                  <MainLayout>
                    <IdCardContainer />
                  </MainLayout>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
