import Cookie from 'js-cookie';
import { setTotalVote } from './ResultPage';

const IS_FETCHING = "IS_FETCHING";
const SET_USER = "SET_USER";

export const toggleIsFetching = (value) => ({type: IS_FETCHING, value: value});
export const setUser = (user) => ({type: SET_USER, value: user})

export const getUser = (id) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        fetch(`https://voting-school47.herokuapp.com/user/login/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"id": id})
        })
        .then(response => response.json())
        .then((commits) => {
            dispatch(setUser(commits));
            dispatch(toggleIsFetching(false));
        })
        .catch(err => {console.log(err)});
    }
}

let initialState = {
    isAuth: false,
    user: {},
    isFetching: false,
    isVoted: null
}

const MainPageReducer = (state=initialState, action) =>{
    let newState = {...state};
    switch (action.type){
        case SET_USER:
            if (commits.error)
                newState.user = {};
            else 
                newState.user = commits;
            return newState;
        case IS_FETCHING:
            newState.isFetching = action.value;
            return newState;
        default:
            return newState;
    }
}

export default MainPageReducer;