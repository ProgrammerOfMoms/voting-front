import React from 'react';
import {connect} from "react-redux";
import MainPage from './MainPage';


const MainPageContainer = (props) =>{  
    return <MainPage {...props}/>
}

const mapStateToProps = (state) => {
    return {
        user: state.MainPageReducer.user,
        isAuth: state.MainPageReducer.isAuth,
        isFetching: state.MainPageReducer.isFetching,
        isVoted: state.MainPageReducer.isVoted
    }
}

export default connect(mapStateToProps, null)(MainPageContainer);

