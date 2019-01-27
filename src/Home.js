import React, {Component} from 'react';
import { withRouter } from 'react-router';
import {Button, Carousel, Thumbnail, Col, Grid, Row} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {inject, observer} from 'mobx-react';

import products from './data/products'

@withRouter
@inject('CartStore')
@observer
class Home extends Component {
    addToCart = (product) => {
        this.props.CartStore.addProduct(product);
    };
    render() {
        const productsList = products.map((product) =>
            <Col md={3} key={product._id}>
                <Thumbnail src={`https://via.placeholder.com/242x200/E40066/fff.png?text=${product.name}`} alt="242x200">
                    <Link to={`/product/${product._id}`}>
                        <h3>{product.name}</h3>
                    </Link>
                    <h5>${product.price}</h5>
                    <p>{product.about.substring(1, 40)}...</p>
                    <p>
                        <Button bsStyle="primary" onClick={(e) => this.addToCart(product)}>Add to Cart</Button>                    </p>
                </Thumbnail>
            </Col>
        );
        return (
            <div>
                <div className="section-title">
                    <h3>Top Products</h3>
                </div>
                <Grid className="products">
                    <Row>
                        {productsList}
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default Home;
