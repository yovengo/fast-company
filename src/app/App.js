import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

const App = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path="/users/:userId?/:edit?" component={Users}/>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/" exact component={Main}/>
            </Switch>
        </div>

    );
};
export default App;
