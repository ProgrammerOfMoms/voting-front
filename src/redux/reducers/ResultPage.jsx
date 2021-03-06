const IS_FETCHING = "IS_FETCHING";
const SET_CANDIDATES = "SET_CANDIDATES";
const SET_TOTAL_SUM = "SET_TOTAL_SUM";
const SET_IS_VOTED = "SET_IS_VOTED";

export const toggleIsFetching = (value) => ({type: IS_FETCHING, value: value});
export const setCandidates = (candidates) => ({type: SET_CANDIDATES, candidates: candidates});
export const setTotalVote = (s) => ({type: SET_TOTAL_SUM, total: s})
export const setVoted = (value) => ({type: SET_IS_VOTED, value: value});

export const setTotal = (candidates) => {
    return (dispatch) => {
        let s = 0
        candidates.map((value)=>{
               s += value.votes;
            return false;
        })
        dispatch(setTotalVote(s));
    }
}

export const getStatus = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        fetch(`https://voting-school47-back.herokuapp.com/api/get_status/`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json;charset=utf-8',
            },
        })
        .then(response => response.json())
        .then((commits) => {
            if (commits.status){
                localStorage.setItem("voted", true);
                dispatch(setVoted(true))    
            }
            dispatch(toggleIsFetching(false));
        })
        .catch(err => {console.log(err)});
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
    total: 0,
    isFetching: false
}

const ResultPageReducer = (state=initialState, action) =>{
    let newState = {...state};
    switch (action.type){
        case SET_CANDIDATES:
            newState.candidates = action.candidates;
            return newState;
        case SET_TOTAL_SUM:
            newState.total = action.total;
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

export default ResultPageReducer;