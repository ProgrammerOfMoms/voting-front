import React from 'react';
import css from './ProgressLine.module.css';


const ProgressLine = (props) => {

    let p = -100;
    if (props.total !== 0) 
        p = -100 + (props.votes/props.total)*100
    return (
            <li className={css.li}>
                <span className={css.text}>{props.fullName}</span>
                <span className={css.bar}>
                    <span className={css.per}>{`${(p+100).toFixed(2)}%`}</span>
                    <span style={{"left": `${p}%`}} className={css.html}></span>
                </span>
            </li>
    );
}

export default ProgressLine;