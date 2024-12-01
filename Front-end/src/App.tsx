import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ToDoList from "./components/ToDo/ToDoList";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/sign-up", element: <SignUp />},
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
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
