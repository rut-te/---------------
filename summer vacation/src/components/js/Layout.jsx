import Header from "./Header";
//import '../css/Outlet.css'
import { Outlet, useParams } from "react-router-dom";
import DefaultPage from "./DefaultPage";

export default function Layout() {

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
