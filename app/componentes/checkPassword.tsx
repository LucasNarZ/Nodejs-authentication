import React from "react";


interface checkPasswordProps{
    value:string;
    state:boolean;
}

import { CheckCircleOutline }from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const CheckPassword = ({ value, state }:checkPasswordProps) => {
    console.log(state)
    return(
        <React.Fragment>
            <div className="flex max-w-[800px] w-[90%]">
                
                {state === true && <CheckCircleOutline color="success"/>}
                {state === false && <HighlightOffIcon  color="error"/>}
                <p className="text-black">{value}</p>
            </div>
        </React.Fragment>
    )
}