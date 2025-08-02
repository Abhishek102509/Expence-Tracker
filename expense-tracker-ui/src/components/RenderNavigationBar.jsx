import { useLocation } from "react-router-dom"
import { NavigationBar } from "./NavigationBar";

export function RenderNavigationBar(){
    const location = useLocation();
    return (
        <div>
            {
                location.pathname !== "/" && location.pathname !== "/login"  ? <NavigationBar/> : null
            }
        </div>
    )
}