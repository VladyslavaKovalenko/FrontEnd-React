import { FC, ReactElement } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navLinks:string[] =['Home', 'Popular', 'Battle']

const Nav:FC=():ReactElement=>{
    return(
        <>
            <ul className="nav">
                {navLinks.map((navLink:string, index:number)=>(
                    <li key={index}>
                        <NavLink to={navLink === 'Home'?'/':navLink.toLowerCase()}>
                            {navLink}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <Outlet/>
        </>
    )
}

export default Nav;