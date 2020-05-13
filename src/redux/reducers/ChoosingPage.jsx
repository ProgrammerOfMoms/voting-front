import Cookie from 'js-cookie';
import { setTotalVote } from './ResultPage';
import { getUser } from './MainPage';

const IS_FETCHING = "IS_FETCHING";
const SET_CANDIDATES = "SET_CANDIDATES";
const SET_VOTED_CANDIDATE = "SET_VOTED_CANDIDATE";
const SET_IS_VOTED = "SET_IS_VOTED";

export const toggleIsFetching = (value) => ({type: IS_FETCHING, value: value});
export const setCandidates = (candidates) => ({type: SET_CANDIDATES, candidates: candidates});
export const setVotedCandidate = (id) => ({type: SET_VOTED_CANDIDATE, id: id});
export const setVoted = (value) => ({type: SET_IS_VOTED, value: value});

export const getStatus = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        fetch(`/api/get_status/`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json;charset=utf-8',
            },
        })
        .then(response => response.json())
        .then((commits) => {
            if (commits.status){
                localStorage.setItem("voted", true);
                dispatch(setVoted(true));
            }
            dispatch(toggleIsFetching(false));
        })
        .catch(err => {console.log(err)});
    }
}

export const sendVote = (candidate_id, voter_id) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        fetch(`https://voting-school47-back.herokuapp.com/api/candidates/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRFToken': Cookie.get('csrftoken')
            },
            body: JSON.stringify({"candidate_id": candidate_id,
                                    "voter_id": voter_id})
        })
        .then(response => response.json())
        .then((commits) => {
            if (!commits.error) {
                getUser(voter_id)(dispatch);
                dispatch(setCandidates(commits));
            } 
            dispatch(toggleIsFetching(false));
        })
        .catch(err => {console.log(err)});
    }
}

export const changeVotedCandidate = (id) => {
    return (dispatch) => {
        dispatch(setVotedCandidate(id));
    }
}

export const getCandidates = (candidates) => {
    return (dispatch) => {
        if (candidates.length === 0){
            dispatch(toggleIsFetching(true));
            fetch(`https://voting-school47-back.herokuapp.com/api/candidates/`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                }
            })
            .then(response => response.json())
            .then((commits) => {
                dispatch(setCandidates(commits));
                dispatch(toggleIsFetching(false));
            })
            .catch(err => {console.log(err)});
        }
    }
}

let initialState = {
    candidates: [],
    voted_candidate: -1,
    isVoted: false,
    isFetching: false
}

const ChoosingPageReducer = (state=initialState, action) =>{
    let newState = {...state};
    switch (action.type){
        case SET_CANDIDATES:
            newState.candidates = action.candidates;
            return newState;
        case SET_VOTED_CANDIDATE:
            newState.voted_candidate = action.id;
            return newState;
        case SET_IS_VOTED:
            newState.isVoted = action.value;
            return newState;
        case IS_FETCHING:
            newState.isFetching = action.value;
            return newState;
        default:
            return newState;
    }
}

export default ChoosingPageReducer;