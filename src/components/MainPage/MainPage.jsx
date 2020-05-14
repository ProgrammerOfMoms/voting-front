import React, { useEffect } from 'react';
import css from './MainPage.module.css';
import { Link } from "react-router-dom";
import "./MainPage.css";
import { useDispatch } from 'react-redux';
import { getUser, setAuth } from '../../redux/reducers/MainPage';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const MainPage = (props) => {
    const url = "https://oauth.vk.com/authorize?client_id=7462552&redirect_uri=https://voting-school47-back.herokuapp.com/user/login&scope=12&display=page"
    const dispatch = useDispatch(); 
    let query = useQuery();
    let id = query.get("id");
    id = id? parseInt(id): -1;
    let redirect = query.get("redirect")
    let access = query.get("access");

    useEffect(() => {
        const fetchData = async () => {
            if (id !== -1)
                getUser(id)(dispatch)
            else dispatch(setAuth(false));
            if(redirect) dispatch(setAuth(false));
        }
        fetchData();
      }, [dispatch])

    return (
        !props.isFetching?
            access?
                <div className={css.denied_container}>
                    <div className={css.denied}>У вас нет прав для голосования.</div>
                </div>
            :    
                <div className={css.container}>
                    <div className={css.img}></div>
                    <div className={css.btn}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        {props.isAuth?
                            <Link className={props.isFetching? `${css.disabled} ${css.main_link}`: css.main_link}
                            to={`/candidates?id=${id}`}>проголосовать</Link>
                        :
                            <a href={url} className={props.isFetching? `${css.disabled} ${css.main_link}`: css.main_link}>
                                авторизироваться
                            </a>
                        }
                        </div>
                </div>
        :
            <div className={css.container}>loading...</div>
    );
}

export default MainPage;