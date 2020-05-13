import React, { useState, useEffect } from 'react';
import css from './ChoosingPage.module.css';
import { useDispatch } from 'react-redux';
import VoteLine from './VoteLine/VoteLine';
import PreText from '../PreText/PreText';
import { getCandidates, changeVotedCandidate, sendVote, getStatus } from '../../redux/reducers/ChoosingPage';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../redux/reducers/MainPage';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const ChoosingPage = (props) => { 
    const dispatch = useDispatch();
    const [isShowed, setShowed] = useState(false);
    let query = useQuery();
    let id = query.get("id");
    id = id? id: -1;
    
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

    const onVoteClick = (candidate_id, voter_id) => {
        sendVote(candidate_id, voter_id)(dispatch);
    }

    useEffect(() => {
      console.log(props) 
      const fetchData = async () => {
        let showed = localStorage.getItem("showed");
        if(showed!==null) setShowed(showed);
        getUser(id)(dispatch);
        getCandidates(props.candidates)(dispatch);
      }
      fetchData();
    }, [dispatch, props.candidates])

    return (
        !props.isAuth?
            <Redirect to="/start?redirect=true"/>
        :
            props.user.is_voted?
                <Redirect to={`/results?id=${id}`}/>
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
                                <div onClick={() => onVoteClick(props.voted_candidate, id)}
                                    className={props.isFetching? `${css.disabled} ${css.btn}`: css.btn}>проголосовать</div>
                            </>
                        :
                            <div>Loading...</div>
                        }
                    </div>
                :
                    <PreText text={text} 
                            link={`/candidates?id=${id}`}
                            btn="понятно!"
                            btnEvent={onShowed}/>
        );
}

export default ChoosingPage;