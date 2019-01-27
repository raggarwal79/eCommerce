import React, {Component} from 'react';
import {Button, Col, Grid, Row, Table, Glyphicon} from 'react-bootstrap';
import {withRouter} from "react-router";
import {inject} from "mobx-react";

@withRouter
@inject('CartStore')
class Cart extends Component {
    updateProduct = (product) => {
        product.quantity = this.refs[product._id + '_quantity'].value;
        this.props.CartStore.updateProduct(product);
    };
    render() {
        const cartItems = this.props.CartStore.products;
        return (
            <div>
                <h3>Shopping Cart</h3>
                <Grid className="products">
                    <Row>
                        <Col mdOffset={2} md={8}>
                            <Table striped bordered condensed hover>
                                <thead>
                                <tr>
                                    <th className="text-center">Product</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Item Total</th>
                                    <th className="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    cartItems.length ? cartItems.map(product =>
                                        (
                                            <tr key={product._id}>
                                                <td>{product.name}</td>
                                                <td>${product.price}</td>
                                                <td>
                                                    <input type="number" defaultValue={product.quantity} ref={`${product._id}_quantity`} />
                                                    &nbsp;&nbsp;
                                                    <Button bsStyle="danger" onClick={(e) => this.updateProduct(product)}>
                                                        <Glyphicon glyph="refresh" />
                                                    </Button>
                                                </td>
                                                <td>${product.price * product.quantity}</td>
                                                <td>
                                                    <Button bsStyle="danger" onClick={(e) => this.props.CartStore.removeProduct(product)}>
                                                        <Glyphicon glyph="trash" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    ) : (

                                        <tr className="text-center">
                                            <td colSpan="5">No Products in Cart</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default Cart;
