import React from 'react';
import {connect} from "react-redux";
import ResultPage from './ResultPage';


const ResultPageContainer = (props) =>{  
    return <ResultPage {...props}/>
}

const mapStateToProps = (state) => {
    return {
        candidates: state.ResultPageReducer.candidates,
        isVoted: state.ChoosingPageReducer.isVoted,
        isFetching: state.ResultPageReducer.isFetching,
        total: state.ResultPageReducer.total,
        isPrevFetching: state.ChoosingPageReducer.isFetching
    }
}

export default connect(mapStateToProps, null)(ResultPageContainer);

