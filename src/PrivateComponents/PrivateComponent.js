import React, {Component} from "react";
import { Route, Redirect } from "react-router-dom";
import { checkLogin } from "../helpers/check";

const PrivateComponent = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={props =>
            (!checkLogin()) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/"
                    }}
                />
            )
        }
    />
);

export default PrivateComponent;

