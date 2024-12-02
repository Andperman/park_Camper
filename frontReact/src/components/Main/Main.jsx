
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MapProvider } from "../../context/MapContext";
import AuthProvider from "../../context/AuthContext.jsx";
import { FavoritesProvider } from "../../context/FavoritesContext.jsx";
import MapPage from "./MapPage";
import Card from "./Card";
import ManualLocations from "./ManualLocations";
import Login from "./Login";
import ProtectedRoutes from "../../utils/ProtectedRoutes";
import Favorites from "./Favorites";
import Rules from "./Rules";

const Main = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <MapProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <MapPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/location/:id"
              element={
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <Card />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/manual-locations"
              element={
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <ManualLocations />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <Favorites />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/rules"
              element={
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <Rules />
                </ProtectedRoutes>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </MapProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default Main;
