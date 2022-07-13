import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import ProductCard from "../../common/ProductCard";
import plus from "../../../styles/img/plus.png";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SellerLanding = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      // .get(`http://localhost:4000/sellers/1/products`)
      .get(`https://store64-backend.herokuapp.com/sellers/1/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addProductCard = {
    image: plus,
    title: "add product to stock",
  };

  return (
    <>
      <h2> seller dashboard </h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 18 }}
          alignItems="center"
          justifyContent="center"
        >
          {products.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item.id}>
              <Item style={{ backgroundColor: "azure" }}>
                <ProductCard item={item} key={item.id} />
              </Item>
            </Grid>
          ))}
          <Item style={{ backgroundColor: "azure" }}>
            <Link to={'addProduct'}>
              <img src={addProductCard.image} />
              <h3>Add Product</h3>
            </Link>
          </Item>
        </Grid>
      </Box>
    </>
  );
};

export default SellerLanding;
