import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends React.Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name: this.state.name
        }
        // Add item via addItem action
        this.props.addItem(newItem);

        // Close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                { this.props.isAuthenticated ? <Button color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >Add Item</Button> : <h4 style={{fontWeight: "bold", marginBottom: "2rem"}}>Log in to manage items</h4> }
                
                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                >
                 <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
                 <ModalBody>
                     <Form onSubmit={this.onSubmit}>
                         <FormGroup>
                             <Label for="item">Item</Label>
                             <Input 
                                 type="text"
                                 name="name"
                                 id="item"
                                 placeholder="Add shopping item"
                                 onChange={this.onChange}
                             />
                             <Button color="dark"
                              style={{marginTop: '2rem'}}
                              block
                             >Add</Button>
                         </FormGroup>
                     </Form>
                 </ModalBody>
                </Modal>
            </div>
        );
    }
}

ItemModal.propTypes = {
    addItem: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal);