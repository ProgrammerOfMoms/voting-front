import React from 'react';
import css from './MainPage.module.css';
import { Link } from "react-router-dom";
import "./MainPage.css";
import {
    useLocation
  } from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }


const MainPage = (props) => {

    let query = useQuery()
    const url = "https://oauth.vk.com/authorize?client_id=7462552&redirect_uri=https://voting-school47-back.herokuapp.com/user/login&scope=12&display=page"

    let auth = props.auth
    console.log(query.get("id"))

    return (
        <div className={css.container}>
            <div className={css.img}></div>
            <div className={css.btn}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {auth?
                    <Link className={css.main_link} to="/candidates">проголосовать</Link>
                :
                    <a href={url} className={css.main_link}>авторизироваться</a>
                }
                </div>
        </div>
    );
}

export default MainPage;