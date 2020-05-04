import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

class LoginModal extends React.Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }

        // Check if registration went well and use was authenticated
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const { email, password } = this.state;

        const user = { email, password };
        
        //Attempt Login
        this.props.login(user);
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">Login</NavLink>

                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                >
                 <ModalHeader toggle={this.toggle}>User Login</ModalHeader>
                 <ModalBody>
                    {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                     <Form onSubmit={this.onSubmit}>
                         <FormGroup>
                            <Label for="email">E-mail</Label>
                             <Input 
                                 className="mb-3"
                                 type="email"
                                 name="email"
                                 id="email"
                                 placeholder="E-mail"
                                 onChange={this.onChange}
                             />
                             <Label for="password">Password</Label>
                             <Input 
                                 className="mb-3"
                                 type="password"
                                 name="password"
                                 id="password"
                                 placeholder="Password"
                                 onChange={this.onChange}
                             />
                             <Button color="dark"
                              style={{marginTop: '2rem'}}
                              block
                             >Login</Button>
                         </FormGroup>
                     </Form>
                 </ModalBody>
                </Modal>
            </div>
        );
    }
}

LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);