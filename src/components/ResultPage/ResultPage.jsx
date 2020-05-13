import React, { useState, useEffect } from 'react';
import css from './ResultPage.module.css';
import ProgressLine from './ProgressLine/ProgressLine';
import { useDispatch } from 'react-redux';
import { getCandidates, getStatus, setTotal } from '../../redux/reducers/ResultPage';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../redux/reducers/MainPage';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const ResultPage = (props) => {
    const dispatch = useDispatch();
    const [total, setTotal_] = useState(-1);
    let query = useQuery();
    let id = query.get("id");
    id = id? id: -1;


    useEffect(() => {
        const fetchData = async () => {
          getUser(id)(dispatch);
          if (props.user.is_voted) localStorage.setItem("voted", true);
          getCandidates(props.candidates)(dispatch);
          setTotal(props.candidates)(dispatch);
        }
        fetchData();
      }, [dispatch, props.candidates, props.total])
    
    useEffect(() => {
      setTotal_(props.total)
    }, [props.total, total]);

    return (
      props.isAuth || localStorage.getItem("voted")?
        !props.isFetching && !props.isPrevFetching?
          props.user.is_voted || localStorage.getItem("voted")?
            <div style={{animation: "fadeIn 1s"}} className={css.container}>
                {props.candidates.map((value, index) => {
                    return <ProgressLine key={index}  
                            fullName={`${value.last_name} ${value.first_name[0]}.`}
                            votes={value.votes}
                            total={props.total}
                            />})
                }
            </div>
          :
            <Redirect to={`/candidates?id=${id}`}/>
        :
          <div>loading...</div>
      :
        <Redirect to="/start?redirect=true"/>
    );
}

export default ResultPage;