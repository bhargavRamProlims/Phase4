import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Browser from "./browse";
import EditEvent from "./editEvent";
import Support from "./support";
import LogoImage from "../images/home.jpg";

var sectionStyle = {
    backgroundImage: `url(${LogoImage})`,
    width: 1366,
    height: 633
}

const Home = () => {
    return (
        <div className=" text-white bg-white" style={sectionStyle}>
                <div className="pricing-header px-10 py-10 pt-md-5 pb-md-5 mx-auto text-center">
                    <h1 className="display-1">Welcome to FindMeEvent</h1>
                    <p className="lead">Here you can look up the events in a particular region and add Events. Browse the events using the keywords.</p>
                </div>
            
        </div>
    )
}

class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 border-bottom shadow-sm">
                        <h4 href="/" className="my-0 mr-md-auto font-weight-Bold">FindMeEvent</h4>
                        <nav className="my-2 my-md-0 mr-md-3">
                            <a className="p-2 text-dark" href="/">Home</a>
                            <a className="p-2 text-dark" href="/browse">Browse</a>
                            <a className="p-2 text-dark" href="/support">Support</a>
                        </nav>
                    </div>

                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/browse" component={Browser} />
                        <Route path="/edit-event/:id" component={EditEvent} />
                        <Route path="/support" component={Support} />
                    </Switch>

                </div>
            </Router>
        )
    }

}

export default Main;