import React, {Component} from 'react';
import { withRouter } from 'react-router';
import {Button, Col, Grid, Row} from 'react-bootstrap';
import {inject, observer} from "mobx-react";
import ReactImageZoom from 'react-image-zoom';

import products from './data/products';

@withRouter
@inject('CartStore')
@observer
class Product extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedThumbnail: 0
        };
    };
    addToCart = (product) => {
        product.quantity = this.refs.product_quantity.valueAsNumber;
        this.props.CartStore.addProduct(product);
    };

    incQty = () => {
        this.refs.product_quantity.value = this.refs.product_quantity.valueAsNumber + 1;
    };

    decQty = () => {
        if(this.refs.product_quantity.valueAsNumber !== 1)
            this.refs.product_quantity.value = this.refs.product_quantity.valueAsNumber - 1;
    };

    toggleThumb = (index) => this.setState({selectedThumbnail: index});

    render() {
        const product = products.find( (product) => product._id ===  this.props.match.params.id);
        const imageZoomProps = {"width":400, "height": 400, "zoomWidth": 400, "offset":{"vertical":0,"horizontal":10}, "zoomStyle":"opacity: 0.75; z-index: 100;", "img": `${product.images[this.state.selectedThumbnail]}?text=${product.name}`};
        return (
            <div>
                <Grid className="products">
                    <Row>
                        <Col md={4}>
                            <Grid className="full-width">
                                <Row>
                                    <Col sm={3}>
                                        <ul className="product-images-list">
                                            {
                                                product.thumbImages.map( (image, index) => (
                                                    <li key={index} onClick={(e) => this.toggleThumb(index)}>
                                                        <img className={"thumb " + (this.state.selectedThumbnail === index ? 'selected' : '')} src={`${image}?text=${product.name}`} alt={product.name} />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </Col>
                                    <Col sm={9}>
                                        <ReactImageZoom {...imageZoomProps} />
                                    </Col>
                                </Row>
                            </Grid>
                        </Col>
                        <Col mdOffset={2} md={6} className="text-left">
                            <h3>{product.name}</h3>
                            <h5>${product.price}</h5>
                            <p>{product.about}</p>
                            <hr />

                            <Grid>
                                <Col sm={1}>
                                    <Button onClick={(e) => this.decQty()}>-</Button>
                                </Col>
                                <Col sm={3}>
                                    <input type="number" defaultValue="1" placeholder="Quantity" ref="product_quantity" />
                                </Col>
                                <Col sm={1}>
                                    <Button onClick={(e) => this.incQty()}>+</Button>
                                </Col>
                                <Col sm={3}>
                                    <Button bsStyle="primary" onClick={(e) => this.addToCart(product)}>Add to Cart</Button>
                                </Col>
                            </Grid>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default Product;
