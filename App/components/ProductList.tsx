import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { ActionI, StateI } from "../redux";
import { connect } from "react-redux";
import { ProductsI } from "../api/product";
import { Button } from "native-base";

interface ProductListProps {
  products: ProductsI[];
  fetchingError: boolean;
  fetchingErrorMsg: string;
  fetchProducts: () => void;
  navigation: {
    navigate: any;
  };
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  fetchProducts,
  fetchingError,
  fetchingErrorMsg,
  navigation,
}) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  const _editProduct = (productId: string) => {
    navigation.navigate("editproduct", { productId });
  };

  if (fetchingError) {
    return (
      <View>
        <Text>{fetchingErrorMsg}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>{products.length}</Text>
        <Button onPress={() => _editProduct("jvgjvjv")}>Edit Product</Button>
      </View>
    );
  }
};

const mapStateToProps = (state: StateI) => {
  return {
    products: state.products.products,
    fetchingError: state.products.fetchingError,
    fetchingErrorMsg: state.products.fetchingErrorMsg,
  };
};

const mapDispatchToProps = (dispatch: (action: ActionI) => void) => {
  return {
    fetchProducts: () =>
      dispatch({ type: "PRODUCT_FETCHING_REQUEST", payload: null }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
