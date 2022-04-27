import { View, Text, StyleSheet, StatusBar, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Image, Input, Spinner } from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

import { ActionI, StateI } from "../redux";
import { ImageI, ProductsI } from "../api/product";

interface AddProductProps {
  addingStatus: {
    addingError: string;
    errorInAdding: boolean;
    isAdding: boolean;
    success: boolean;
  };
  reset: () => void;
  addProduct: (product: ProductsI) => void;
}

const AddProduct: React.FC<AddProductProps> = ({
  addingStatus,
  addProduct,
  resetToInitial,
}) => {
  const { control, handleSubmit, reset } = useForm<ProductsI>();
  const [imageUri, setImageUri] = useState<ImageI | null>();

  const onSubmit = (data: ProductsI) => {
    if (imageUri) {
      addProduct({ ...data, imageBlob: imageUri });
    } else {
      ToastAndroid.show("Please select image", ToastAndroid.SHORT);
    }
  };

  const pickPicture = () => {
    DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "image/*",
    }).then((response) => {
      if (response.type == "success") {
        setImageUri({ name: response.name, uri: response.uri, changed: false });
      }
    });
  };

  const addAnother = () => {
    reset();
    setImageUri(null);
    resetToInitial();
  };

  if (addingStatus.isAdding) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner accessibilityLabel="Please wait while uploading product" />
      </View>
    );
  } else if (addingStatus.errorInAdding) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.errorText}>Something went wrong in adding</Text>
      </View>
    );
  } else if (addingStatus.success) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="checkmark-done-circle" size={64} color="#36B37E" />
        <Text style={{ fontSize: 18 }}>Product added successfully</Text>
        <Button style={{ marginBottom: 12 }} onPress={addAnother}>
          Add Another Product
        </Button>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Add Product</Text>
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
            Select Image
          </Button>
        </View>

        <Button onPress={handleSubmit(onSubmit)}>Add Product</Button>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: StatusBar.currentHeight,
  },
  formContainer: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  label: {
    paddingBottom: 6,
    fontWeight: "600",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },
  errorText: {
    color: "#ff0000",
    textAlign: "center",
  },
});

const mapStateToProps = (state: StateI) => {
  return {
    addingStatus: state.products.addingStatus,
  };
};

const mapDispatchToProps = (dispatch: (action: ActionI) => void) => {
  return {
    addProduct: (product: ProductsI) =>
      dispatch({ type: "PRODUCT_ADD_REQUESTED", payload: product }),
    resetToInitial: () =>
      dispatch({ type: "RESET_PRODUCT_ADD", payload: null }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
