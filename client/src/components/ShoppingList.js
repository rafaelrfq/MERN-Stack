import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import EditItemModal from './EditItemModal';
import PropTypes from 'prop-types';

class ShoppingList extends React.Component {

    componentDidMount() {
        this.props.getItems();
    };

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    };

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                {/* <Button color="dark" style={{marginBottom: '2rem'}} 
                onClick={() => {
                    const name = prompt('Enter Item');
                    if(name) {
                        // this.setState(state => ({
                        //     items: [...state.items, { id: uuid(), name }]
                        // }));
                    }
                }}>Add Item</Button> */}
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    { this.props.isAuthenticated ? <Button className="shopping-btn" 
                                    color="danger" 
                                    size="sm" 
                                    onClick={this.onDeleteClick.bind(this, _id)}>
                                    Delete
                                    </Button> : ''}
                                    <EditItemModal id={_id} name={name} />
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }

}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);