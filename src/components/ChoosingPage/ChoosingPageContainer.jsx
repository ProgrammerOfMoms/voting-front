import React from 'react';
import {connect} from "react-redux";
import ChoosingPage from "./ChoosingPage";
import { getCandidates } from '../../redux/reducers/ChoosingPage';


const ChoosingPageContainer = (props) =>{
        return <ChoosingPage {...props}/>
}

const mapStateToProps = (state) => {
    return {
        candidates: state.ChoosingPageReducer.candidates,
        voted_candidate: state.ChoosingPageReducer.voted_candidate,
        user: state.MainPageReducer.user,
        isFetching: state.ChoosingPageReducer.isFetching,
        isAuth: state.MainPageReducer.isAuth
    }
}

const mapDispatchToProps = {
    getCandidates,
}
export default connect(mapStateToProps, mapDispatchToProps)(ChoosingPageContainer);

