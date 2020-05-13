import React, { useEffect } from 'react';
import css from './MainPage.module.css';
import { Link } from "react-router-dom";
import "./MainPage.css";
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/reducers/MainPage';


const MainPage = (props) => {
    const url = "https://oauth.vk.com/authorize?client_id=7462552&redirect_uri=https://voting-school47-back.herokuapp.com/user/login&scope=12&display=page"
    const dispatch = useDispatch(); 

    useEffect(() => {
        const fetchData = async () => {
          getUser()
        }
        fetchData();
      }, [dispatch])

    return (
        props.isFetching?
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