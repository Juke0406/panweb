import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import withAuth from './authentication';

const loading = () => <div className = "animated fadeIn pt-3 text-center"> Loading... </div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./pages/Login/Login'));
const Registration = React.lazy(() => import('./pages/Registration/Registration'));
const Verification = React.lazy(() => import('./pages/Verification/Verification'));
const Recovery = React.lazy(() => import('./pages/Recovery/Recover'))
const Page404 = React.lazy(() => import('./pages/Page404/Page404'));
const Page500 = React.lazy(() => import('./pages/Page500/Page500'));

class App extends Component {
	
	componentDidMount() {
		document.title = "PanWeb!";
	}
  
    render() {
        return (
            <HashRouter>
                <React.Suspense fallback = { loading() }>
                    <Switch>
                        <Route exact path = "/login" name = "Login Page" component = { Login } />
                        <Route exact path = "/registration" name = "Register Page" component = { Registration } />
                        <Route exact path = "/verification" name = "Verify Your Email" component = { Verification }/>
                        <Route exact path = "/recovery" name = "Recovery" component = { Recovery } />
                        <Route exact path = "/404" name = "Page 404" component = { Page404 } />
                        <Route exact path = "/500" name = "Page 500" component = { Page500 } />
                        <Route path = "/" name = "Home" component = { withAuth(DefaultLayout) } />
                    </Switch>
                </React.Suspense>
            </HashRouter>
        );
    }
}

export default App;