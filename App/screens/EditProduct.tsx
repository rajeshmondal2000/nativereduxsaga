import { View, Text } from "react-native";
import React from "react";
import { ActionI, StateI } from "../redux";
import { ProductsI } from "../api/product";
import { connect } from "react-redux";
import { Button } from "native-base";

interface EditProductI {
  route: any;
  editStatus: {
    product: ProductsI | null;
    isEditing: boolean;
    errorInEditing: boolean;
    editingError: string;
    success: boolean;
  };
  editProduct: (product: ProductsI) => void;
}
const EditProduct: React.FC<EditProductI> = ({
  route,
  editStatus,
  editProduct,
}) => {
  const { productId } = route.params;

  const onSubmit = () => {
    editProduct({
      id: "jsvxjvjdxvjdvj",
      name: "Keyboard",
      image: "",
      offerPrice: 1350,
      price: 1500,
    });
  };

  if (editStatus.isEditing) {
    return (
      <View>
        <Text>Please wait while editing</Text>
      </View>
    );
  } else if (editStatus.errorInEditing) {
    return (
      <View>
        <Text>{editStatus.editingError}</Text>
      </View>
    );
  } else if (editStatus.success) {
    return (
      <View>
        <Text>Successfully Edited</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>{productId}</Text>
        <Button onPress={onSubmit}>Edit</Button>
      </View>
    );
  }
};

const mapStateToProps = (state: StateI) => {
  return {
    editStatus: state.products.edit,
  };
};

const mapDispatchToProps = (dispatch: (action: ActionI) => void) => {
  return {
    editProduct: (product: ProductsI) =>
      dispatch({ type: "PRODUCT_EDIT_REQUESTED", payload: product }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
