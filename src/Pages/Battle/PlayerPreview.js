import { Children } from "react"

const PlayerPreview =({avatar, userName, children})=>{
    return(
        <div className="column">
                <img src={avatar} alt ='Avatar' className="avatar"/>
                <h3>{userName}</h3>
                {children}
                {/* у Children есть методы с помощбю которых, мы можем вносить изменения и выполнять различные перациис элементами, сделать жизнь проще */}
                {/* {Children.map(children, child=>{
                    return cloneElement(child, {children: 'reset123'})})} */}
            </div>
    )
}

export default PlayerPreview