import React from 'react';
import {connect} from "react-redux";
import ResultPage from './ResultPage';


const ResultPageContainer = (props) =>{  
    return <ResultPage {...props}/>
}

const mapStateToProps = (state) => {
    return {
        candidates: state.ResultPageReducer.candidates,
        isFetching: state.ResultPageReducer.isFetching,
        total: state.ResultPageReducer.total,
        isPrevFetching: state.ChoosingPageReducer.isFetching,
        user: state.MainPageReducer.user,
        isAuth: state.MainPageReducer.isAuth
    }
}

export default connect(mapStateToProps, null)(ResultPageContainer);

