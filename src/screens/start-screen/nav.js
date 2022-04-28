import React from "react";
import PropTypes from "prop-types";
import { Container, Header, Content } from "react-dom";

const Nav = ({ nav }) => {
    <div>
        <div>
            <p>
                Battleship
            </p>
        </div>
        <div>
            {nav}
        </div>
    </div>
};

Screen.PropTypes = {
    nav: PropTypes.node.isRequired,
}

export default Nav;