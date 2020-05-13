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

    useEffect(() => {
        debugger;
        const fetchData = async () => {
            if (id !== -1)
                getUser(id)(dispatch)
            else dispatch(setAuth(false));
        }
        fetchData();
      }, [dispatch])

    return (
        !props.isFetching?
            <div className={css.container}>
                <div className={css.img}></div>
                <div className={css.btn}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    {props.isAuth?
                        <Link className={css.main_link} to="/candidates">проголосовать</Link>
                    :
                        <a href={url} className={css.main_link}>авторизироваться</a>
                    }
                    </div>
            </div>
        :
            <div className={css.container}>loading...</div>
    );
}

export default MainPage;