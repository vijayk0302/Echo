import { useState } from "react"

export const useToggle=()=>{

    const [show,setShow]=useState(false)

    const Toggle=()=>{
        setShow((prev)=>!prev)
    }

    return{setShow,show,Toggle}

}