import React, { Component } from "react";
import { BrowserRouter as Router,  Switch, Route } from "react-router-dom";
import Browser from "./browse";
import EditEvent from "./editEvent";

const Home = () => {
    return (
        <div>
            <div className="pricing-header px-3 py-3 pt-md-6 pb-md-6 mx-auto text-center">
                <h1 className="display-1">Welcome to FindMeEvent</h1>
                <p className="lead">Here you can look up the events in a particular region and browse the events using the keywords.</p>
            </div>
        </div>
    )
}

class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                        <h4 href="/" className="my-0 mr-md-auto font-weight-Bold">FindMeEvent</h4>
                        <nav className="my-2 my-md-0 mr-md-3">
                            <a className="p-2 text-dark" href="/">Home</a>
                            <a className="p-2 text-dark" href="/browse">Browse</a>
                            <a className="p-2 text-dark" href="/about">About</a>
                            <a className="p-2 text-dark" href="/support">Support</a>
                        </nav>
                    </div>

                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/browse" component={Browser} />
                        <Route path="/edit-event/:id" component={EditEvent}/>
                    </Switch>

                </div>
            </Router>
        )
    }

}

export default Main;