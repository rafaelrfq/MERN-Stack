import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Logout extends React.Component {
    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} href="#">Logout</NavLink>
            </Fragment>
        );
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout);