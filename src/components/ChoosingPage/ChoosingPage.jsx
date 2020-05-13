import React, { useState, useEffect } from 'react';
import css from './ChoosingPage.module.css';
import { useDispatch } from 'react-redux';
import VoteLine from './VoteLine/VoteLine';
import PreText from '../PreText/PreText';
import { getCandidates, changeVotedCandidate, sendVote, getStatus } from '../../redux/reducers/ChoosingPage';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../redux/reducers/MainPage';

const ChoosingPage = (props) => { 
    const dispatch = useDispatch();
    const [isShowed, setShowed] = useState(false);
    const [isAllow, setAllow] = useState(true);
    
    const onVKClick = (e) => {
        e.preventDefault();
        window.open(e.target.href, "_blank");
    }

    const text = 
        <>
            Ознакомиться с предвыборными кампаниями кандидатов вы можете по 
            <a onClick={onVKClick} className="link" href="https://vk.com/47sosh.chita"> ссылке</a>
        </>

    const onShowed = () => {
        setShowed(true);
        localStorage.setItem("showed", true);
    }
    const onChangeCandidate = (id) => {
        changeVotedCandidate(id)(dispatch );
    }

    const onVoteClick = (id) => {
        sendVote(id)(dispatch);
    }

    useEffect(() => {
      if (props.user === {}) setAllow(false);  
      const fetchData = async () => {
        let showed = localStorage.getItem("showed");
        if(showed!==null) setShowed(showed);
        else {
            localStorage.setItem("showed", true);
            setShowed(true);
        }
        getUser(props.user.id)(dispatch);
        getCandidates(props.candidates)(dispatch);
      }
      fetchData();
    }, [dispatch, props.user])

    return (
        !isAllow?
            <Redirect to="/start"/>
        :
            props.user.isVoted?
                <Redirect to="/results"/>
            :    
                isShowed?
                    <div style={{animation: "fadeIn 1s"}} className={css.container}>
                        {!props.isFetching?
                            <>
                                {props.candidates.map((value, index) => {
                                    return <VoteLine key={index} 
                                            onClick={onChangeCandidate} 
                                            fullName={`${value.first_name} ${value.last_name}`} 
                                            id={value.id}/>
                                })}
                                <div onClick={() => onVoteClick(props.voted_candidate)} className={css.btn}>проголосовать</div>
                            </>
                        :
                            <div>Loading...</div>
                        }
                    </div>
                :
                    <PreText text={text} 
                            link="/candidates"
                            btn="понятно!"
                            btnEvent={onShowed}/>
        );
}

export default ChoosingPage;