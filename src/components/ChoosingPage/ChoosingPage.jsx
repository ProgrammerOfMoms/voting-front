import React, { useState, useEffect } from 'react';
import css from './ChoosingPage.module.css';
import { useDispatch } from 'react-redux';
import VoteLine from './VoteLine/VoteLine';
import PreText from '../PreText/PreText';
import { getCandidates, changeVotedCandidate, sendVote, getStatus } from '../../redux/reducers/ChoosingPage';
import { Redirect } from 'react-router-dom';

const ChoosingPage = (props) => { 
    const dispatch = useDispatch();
    const [isShowed, setShowed] = useState(false);
    const [isVoted, setVoted] = useState(false);
    
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
      const fetchData = async () => {
        let showed = localStorage.getItem("showed");
        if(showed!==null) setShowed(showed);
        let voted = localStorage.getItem("voted");
        if(voted!==null) setVoted(true);
        getStatus()(dispatch);
        getCandidates(props.candidates)(dispatch);
      }
      fetchData();
    }, [dispatch, props.candidates, isVoted])

    return (
        props.isVoted?
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