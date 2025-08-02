// import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import { getToken } from "../services/UserService";

// export function PrivateRoute(){
//     // every component either it is class or function, it should return UI element 
//     const token = getToken();
//     if(token){
//         // rende the child component
//         return (
//             <Outlet></Outlet>
//         )
//     }
//     else{
//         return (
//             <Navigate to={"/login"}></Navigate>
//         )
//     }
// }




import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/UserService";
import { useEffect, useState } from "react";
import { Spinner, Container } from "react-bootstrap";

export function PrivateRoute() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = getToken();

        // Simulate delay or token verification (you can call an API here if needed)
        setTimeout(() => {
            if (token) {
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        }, 1000); // 1-second delay to simulate async token check
    }, []);

    if (isLoading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Checking authentication...</p>
            </Container>
        );
    }

    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}
