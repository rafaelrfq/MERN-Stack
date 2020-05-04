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
import { editItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class EditItemModal extends React.Component {
    state = {
        modal: false,
        name: `${this.props.name}`
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
        const editedItem = {
            name: this.state.name
        }
        // Edit item via editItem action
        this.props.editItem(this.props.id, editedItem);

        // Close modal
        this.toggle();
    }

    render() {
        return(
            <div className="shopping-btn">
                { this.props.isAuthenticated ? <Button color="primary"
                size="sm"
                className="shopping-btn"
                onClick={this.toggle}
                >Edit</Button> : ''}

                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                >
                 <ModalHeader toggle={this.toggle}>Edit Item from Shopping List</ModalHeader>
                 <ModalBody>
                     <Form onSubmit={this.onSubmit}>
                         <FormGroup>
                             <Label for="item">Item</Label>
                             <Input 
                                 type="text"
                                 name="name"
                                 id="item"
                                 placeholder="Edit shopping item"
                                 value={this.state.name}
                                 onChange={this.onChange}
                             />
                             <Button color="dark"
                              style={{marginTop: '2rem'}}
                              block
                             >Update</Button>
                         </FormGroup>
                     </Form>
                 </ModalBody>
                </Modal>
            </div>
        );
    }
}

EditItemModal.propTypes = {
    editItem: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { editItem })(EditItemModal);