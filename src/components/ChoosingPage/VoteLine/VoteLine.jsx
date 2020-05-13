import React from 'react';
import css from './VoteLine.module.css';


const VoteLine = (props) => {
    const changeCandidate = () => {
        props.onClick(props.id)
    }
    return (
        <div className={css.container}>
            <label onClick={changeCandidate} className={css.label} name="vote">
                <input className={css.checkbox} type="radio" name="vote" id={props.id}/>
                <span className={css.text}>{props.fullName}</span>
            </label>
        </div>
    );
}

export default VoteLine;