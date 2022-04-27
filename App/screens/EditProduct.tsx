import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as DocumentPicker from "expo-document-picker";
import { ActionI, StateI } from "../redux";
import { getProduct, ImageI, ProductsI } from "../api/product";
import { connect } from "react-redux";
import { Button, Image, Input, Spinner } from "native-base";

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
  resetToInitial: () => void;
}
const EditProduct: React.FC<EditProductI> = ({
  route,
  editStatus,
  editProduct,
  resetToInitial,
}) => {
  const { productId } = route.params;
  const { control, setValue, handleSubmit } = useForm<ProductsI>();
  const [imageUri, setImageUri] = useState<ImageI | null>();

  useEffect(() => {
    getProductIntialState();
  }, []);

  const getProductIntialState = () => {
    getProduct(productId).then((response) => {
      setValue("name", response.name);
      setValue("price", response.price);
      setValue("offerprice", response.offerprice);
      setValue("image", response.image);
      setValue("id", response.id);
      setImageUri({ name: "", changed: false, uri: response.image });
    });
  };

  const pickPicture = () => {
    DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "image/*",
    }).then((response) => {
      if (response.type == "success") {
        setImageUri({ name: response.name, uri: response.uri, changed: true });
      }
    });
  };

  const onSubmit = (data: ProductsI) => {
    if (imageUri) {
      editProduct({ ...data, imageBlob: imageUri });
    }
  };

  const editAgain = () => {
    resetToInitial();
    getProductIntialState();
  };

  if (editStatus.isEditing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size={"lg"} accessibilityLabel="Please wait while uploading product" />
        <Text style={{ fontSize: 18 }}>Please wait while uploading product</Text>
      </View>
    );
  } else if (editStatus.errorInEditing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.errorText}>{editStatus.editingError}</Text>
      </View>
    );
  } else if (editStatus.success) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>Successfully Edited</Text>
        <Button onPress={editAgain}>Edit Again</Button>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 12,
            marginBottom: 12,
          }}
        >
          Edit Product
        </Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter Product name"
              />
            )}
            name="name"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Price</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter Product Price"
              />
            )}
            name="price"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Offer Price</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter Product Offer Price"
              />
            )}
            name="offerprice"
          />
        </View>

        <View style={{ paddingTop: 12, paddingBottom: 12 }}>
          {imageUri && (
            <Image
              source={{ uri: imageUri.uri }}
              alt="Product Image"
              size={"xl"}
            />
          )}
          <Button style={{ marginTop: 12 }} onPress={pickPicture}>
            Change Image
          </Button>
        </View>

        <Button onPress={handleSubmit(onSubmit)} colorScheme={"info"}>
          Save
        </Button>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    padding: 12,
  },
  formContainer: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  label: {
    paddingBottom: 6,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff0000",
    textAlign: "center",
  },
});

const mapStateToProps = (state: StateI) => {
  return {
    editStatus: state.products.edit,
  };
};

const mapDispatchToProps = (dispatch: (action: ActionI) => void) => {
  return {
    editProduct: (product: ProductsI) =>
      dispatch({ type: "PRODUCT_EDIT_REQUESTED", payload: product }),
    resetToInitial: () =>
      dispatch({ type: "RESET_PRODUCT_EDIT", payload: null }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
