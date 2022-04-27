import { View, Text } from "react-native";
import React from "react";
import { ActionI, StateI } from "../redux";
import { ProductsI } from "../api/product";
import { connect } from "react-redux";
import { Button } from "native-base";

interface AddProductProps {
  addingStatus: {
    addingError: string;
    errorInAdding: boolean;
    isAdding: boolean;
    success: boolean;
  };
  addProduct: (product: ProductsI) => void;
}

const AddProduct: React.FC<AddProductProps> = ({
  addingStatus,
  addProduct,
}) => {
  const onSubmit = () => {
    addProduct({
      id: "jsvxjvjdxvjdvj",
      name: "Keyboard",
      image: "",
      offerPrice: 1350,
      price: 1500,
    });
  };

  if (addingStatus.isAdding) {
    return (
      <View>
        <Text>Product is adding</Text>
      </View>
    );
  } else if (addingStatus.errorInAdding) {
    return (
      <View>
        <Text>Something went wrong in adding</Text>
      </View>
    );
  } else if (addingStatus.success) {
    return (
      <View>
        <Text>Product added successfully</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>AddProduct</Text>
        <Button onPress={onSubmit}>Add Product</Button>
      </View>
    );
  }
};

const mapStateToProps = (state: StateI) => {
  return {
    addingStatus: state.products.addingStatus,
  };
};

const mapDispatchToProps = (dispatch: (action: ActionI) => void) => {
  return {
    addProduct: (product: ProductsI) =>
      dispatch({ type: "PRODUCT_ADD_REQUESTED", payload: product }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
