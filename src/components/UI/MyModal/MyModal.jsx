import React from 'react';
import classes from "./MyModal.module.css"

const MyModal = ({children, visible, setVisible}) => {

    const rootCLasses = [classes.myModal]
    if (visible){
        rootCLasses.push(classes.active)
    }

    return (
        <div className={rootCLasses.join(" ")} onClick={()=> setVisible(false)}>
            <div className={classes.myModalContent} onClick={e=> e.stopPropagation() }>
                {children}
            </div>
        </div>
    );
};

export default MyModal;