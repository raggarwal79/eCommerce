import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, FormGroup, FormControl, Glyphicon, Grid, Row, Col} from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from './Home';
import './App.css';
import Product from "./Product";
import Cart from "./Cart";

import {inject, observer} from 'mobx-react';

@withRouter
@inject('CartStore')
@observer
class App extends Component {
    gotoCart = () => {
        this.props.history.push('/cart');
    };
    render() {
        let cartSubTotal = 0;
        this.props.CartStore.products.forEach(product=> cartSubTotal += (product.price * product.quantity));
        return (
            <div className="App">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <NavItem componentClass={Link} href="/" to="/">React eCommerce</NavItem>
                        </Navbar.Brand>
                    </Navbar.Header>

                    <Nav pullRight>
                        <NavItem componentClass={Link} href="/" to="/">Home</NavItem>


                        <NavDropdown eventKey={3} title={"Cart(" + this.props.CartStore.cartCount + ")"} id="cart-dropdown">
                            <div className="cart-dropdown-body">
                                <ul className="mini-cart">
                                    {
                                        this.props.CartStore.products.map( product =>
                                            (
                                            <li key={product._id}>
                                                <Grid className="product-grid">
                                                    <Row>
                                                        <Col sm={3}>
                                                            <img src="https://via.placeholder.com/50x50/F3B61F/fff.png?text=product" alt={product.name} />
                                                        </Col>
                                                        <Col sm={6}>
                                                            {product.name}({product.quantity})
                                                        </Col>
                                                        <Col sm={6}>
                                                            ${product.price * product.quantity}
                                                        </Col>
                                                    </Row>
                                                </Grid>
                                            </li>
                                            )
                                        )
                                    }
                                    {
                                        this.props.CartStore.products.length ? null : (<div className="text-center cart-empty">No items in cart</div>)
                                    }
                                </ul>
                            </div>
                            <MenuItem divider />
                            <div className="text-center">
                                <div className="text-center">
                                    Cart Sub Total: <b>${cartSubTotal}</b>
                                </div>
                                <Button bsStyle="primary" componentClass={Link} to="/cart">
                                    Checkout
                                </Button>
                                &nbsp;
                                <Button bsStyle="danger">
                                    Checkout
                                </Button>
                            </div>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <Route exact path="/" component={Home} />
                <Route path="/product/:id" component={Product} />
                <Route path="/cart" component={Cart} />
            </div>
        );
    }
}

export default App;
