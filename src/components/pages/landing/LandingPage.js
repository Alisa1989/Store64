import React from "react";
import { useEffect } from "react";
import { getProducts } from "../../../state/actions/productsActions";
import { connect } from "react-redux";
import ProductList from './ProductList'
import CartList from "../cart/CartList";

const LandingPage = (props) => {
  useEffect(() => {
    props.getProducts();
  }, [getProducts]);
  
  return (
    <>
        <ProductList />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    stores: state,
    isFetching: state.products.isFetching,
    listings: state.products,
    cart: state.cart
  };
};

const mapDispatchToProps = {
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
