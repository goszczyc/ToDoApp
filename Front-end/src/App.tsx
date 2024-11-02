import { useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./components/Login/Login";
import ToDoList from "./components/ToDo/ToDoList";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <ToDoList />
            </ProtectedRoute>
        ),
    },
]);

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
        <>
            <RouterProvider router={router} />
            {/* <Routes>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="to-do-list" element={<ToDoList />} />
            </Routes> */}
        </>
    );
}

export default App;
