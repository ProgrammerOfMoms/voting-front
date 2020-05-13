import React, { useState, useEffect } from 'react';
import css from './ResultPage.module.css';
import ProgressLine from './ProgressLine/ProgressLine';
import { useDispatch } from 'react-redux';
import { getCandidates, getStatus, setTotal } from '../../redux/reducers/ResultPage';
import { Redirect } from 'react-router-dom';


const ResultPage = (props) => {
    const dispatch = useDispatch();
    const [total, setTotal_] = useState(-1)


    useEffect(() => {
        const fetchData = async () => {
          if (!localStorage.getItem("voted")) getStatus()(dispatch);
          getCandidates(props.candidates)(dispatch);
          setTotal(props.candidates)(dispatch);
        }
        fetchData();
      }, [dispatch, props.candidates, props.total])
    
    useEffect(() => {
      setTotal_(props.total)
    }, [props.total, total]);

    return (
        !props.isFetching && !props.isPrevFetching?
          props.isVoted || localStorage.getItem("voted")?
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
            <Redirect to="/candidates"/>
        :
          <div>loading...</div>
        
    );
}

export default ResultPage;