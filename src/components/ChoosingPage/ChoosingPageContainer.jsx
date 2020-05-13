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
        isVoted: state.ChoosingPageReducer.isVoted,
        isFetching: state.ChoosingPageReducer.isFetching,
    }
}

const mapDispatchToProps = {
    getCandidates,
}
export default connect(mapStateToProps, mapDispatchToProps)(ChoosingPageContainer);

