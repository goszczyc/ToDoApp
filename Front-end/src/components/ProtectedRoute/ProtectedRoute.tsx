import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/auth";
import { ReactNode } from "react";

// get id from session storage

function ProtectedRoute({ children }: { children: ReactNode }) {
    if (!isAuthenticated()) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the protected component if authenticated
    return children;
}

export default ProtectedRoute;
