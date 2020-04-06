import React from 'react';

const PageButton = (props)=>{

    const changePage = props.changePage

    return(
        <div onClick={()=>changePage(props.number)} className="pageButton">
            {props.number}
        </div>
    )

}

export default PageButton