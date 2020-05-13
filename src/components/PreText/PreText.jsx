import React from 'react';
import css from './PreText.module.css';
import { Link } from "react-router-dom";


const PreText = (props) => {  
    return (
        <div style={{animation: "fadeIn 1s"}} className={css.container}>
            <div className={css.text}>{props.text}</div>
            <div className={`${css.btn} ${css.btn_con}`}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <Link onClick={props.btnEvent} className={css.main_link} to={props.link}>{props.btn}</Link>
            </div>
        </div>
    );
}

export default PreText;