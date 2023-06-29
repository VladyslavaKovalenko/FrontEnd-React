import Tab from "./Tab";
import Repositories from "./Repositories";
import { FC, ReactElement } from "react";

const Popular:FC = ():ReactElement =>{
    return(
        <>
            <Tab />
            <Repositories/>
        </>
    )
}

export default Popular;