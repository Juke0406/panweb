import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppBreadcrumb2 as AppBreadcrumb,
    AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";

import navigation from "../../sidebar";
import routes from "../../routes";
import withAuth from "../../authentication";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
	
    loading = () => <div className = "animated fadeIn pt-1 text-center"> Loading... </div>
  
    routeProfile (e) {
        e.preventDefault();
        this.props.history.push("/profile");
    }

    signOut(e) {
        e.preventDefault();
        fetch("/logout", {
            method: "GET"
        })
        .then(res => {
            if (res.status === 200) {
                this.props.history.push("/login");
            } else {
                return res.text();
            }
        })
        .then(data => {
            console.error(data);
            let err = new Error();
            throw err;
        })
        .catch(err => {
            console.error(err);
        });
            
    }

    render() {
        return (
            <div className = "app">
                <AppHeader fixed>
                    <Suspense  fallback = { this.loading() }>
                        <DefaultHeader SignOut = { e => this.signOut(e) } routeProfile = { e => this.routeProfile(e) } />
                    </Suspense>
                </AppHeader>
                <div className = "app-body">
                    <AppSidebar fixed display = "lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <Suspense>
                            <AppSidebarNav navConfig = { navigation() } { ...this.props } router = { router }/>
                        </Suspense>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className = "main">
                        <AppBreadcrumb appRoutes = { routes } router = { router } />
                        <Container fluid>
                            <Suspense fallback = { this.loading() }>
                                <Switch>
                                    { routes.map((route, idx) => {
                                        return (route.component) ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                component={withAuth(route.component)}
                                            />
                                        ) : (null);
                                    }) }
                                    <Redirect from = "/" to = "/home_page" />
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
                <AppFooter>
                    <Suspense fallback = { this.loading() }>
                        <DefaultFooter />
                    </Suspense>
                </AppFooter>
            </div>
        );
    }
}

export default DefaultLayout;