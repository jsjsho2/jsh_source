import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Login from "./pages/LoginFunctionComponent";
import OtherPage from "./pages/OtherPage";

import SeconDocTest from './pages/SeconDocTest';

class App extends Component {
    render() {
        return (
            <>
                <Router>
                    {/*<Route path='/' component={Header}/>*/}
                    {/*<Route path='/' component={SideMenu}/>*/}
                    <Switch>
                        <Route path='/test' exact component={SeconDocTest}/>
                        <Route path='/' exact component={Login}/>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/other' component={OtherPage}/>
                        <Route render={() => <div className='error'>에러 페이지</div>}/>
                    </Switch>
                </Router>
            </>
        );
    }
}


export default App;