import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Results from "./Results";

const AppRoutes = () => {
    const paths = ["/search", "/images", "/news", "/videos"];

    return (
        <div className="p-4">
            <Routes>
                <Route 
                    exact path="/" 
                    element={<Navigate to="/search" />}>                    
                </Route>

                {paths.map(path => (
                    <Route
                        key={path}
                        exact path={path}
                        element={<Results />}>
                    </Route>
                ))}
            </Routes>
        </div>
    );
}

export default AppRoutes;