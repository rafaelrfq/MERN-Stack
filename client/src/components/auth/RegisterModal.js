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
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

class RegisterModal extends React.Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'REGISTER_FAIL') {
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

        const { name, email, password} = this.state;

        // Create a new User object
        const newUser = { name, email, password };

        // Attempt to register
        this.props.register(newUser);
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">Register</NavLink>

                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                >
                 <ModalHeader toggle={this.toggle}>User Register</ModalHeader>
                 <ModalBody>
                    {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                     <Form onSubmit={this.onSubmit}>
                         <FormGroup>
                             <Label for="name">Name</Label>
                             <Input 
                                 className="mb-3"
                                 type="text"
                                 name="name"
                                 id="name"
                                 placeholder="Name"
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
                             <Label for="email">E-mail</Label>
                             <Input 
                                 className="mb-3"
                                 type="email"
                                 name="email"
                                 id="email"
                                 placeholder="E-mail"
                                 onChange={this.onChange}
                             />
                             <Button color="dark"
                              style={{marginTop: '2rem'}}
                              block
                             >Register</Button>
                         </FormGroup>
                     </Form>
                 </ModalBody>
                </Modal>
            </div>
        );
    }
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);