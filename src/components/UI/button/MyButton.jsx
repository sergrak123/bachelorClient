import React from 'react';
import classes from "./MyButton.module.css"
const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {/*чтобы сразу считывал из тега вложенный элемент props.children*/}
            {children}
        </button>
    );
};

export default MyButton;