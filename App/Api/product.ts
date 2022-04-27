import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getId, uriToBlob } from "./utils";
export interface ProductsI {
  id: string;
  name: string;
  image: string;
  imageBlob: ImageI;
  price: string;
  offerprice: string;
}

export interface ImageI {
  uri: string;
  name: string;
  changed: boolean;
}

export interface ApiResponseI {
  statusCode: number;
  message: string;
  description: string;
}

export function getProducts(): Promise<ProductsI[]> {
  return new Promise(async (resolve, reject) => {
    const db = getFirestore();
    const products: ProductsI[] = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((child: any) => {
      products.push(child.data());
    });
    resolve(products);
  });
}

export function addProduct(product: ProductsI): Promise<ApiResponseI> {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const id = getId(12);
    uploadToStorage(product.imageBlob)
      .then((imageUrl) => {
        setDoc(doc(db, "products", id), { ...product, image: imageUrl, id: id })
          .then(() => {
            resolve({
              statusCode: 200,
              message: "Product Added",
              description: "",
            });
          })
          .catch((err) => {
            reject(err.code);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const uploadToStorage = (imageUri: ImageI) => {
  return new Promise((resolve, reject) => {
    uriToBlob(imageUri.uri).then((blob: any) => {
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + imageUri.name);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          reject(error.code);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        }
      );
    });
  });
};

export function editProduct(product: ProductsI): Promise<ApiResponseI> {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const productRef = doc(db, "products", product.id);
    if (product.imageBlob.changed) {
      uploadToStorage(product.imageBlob)
        .then((imageUrl) => {
          updateDoc(productRef, { ...product, image: imageUrl }).then(() => {
            resolve({
              statusCode: 200,
              message: "Product Updated",
              description: "",
            });
          });
        })
        .catch((err) => {
          reject(err.code);
        });
    } else {
      updateDoc(productRef, { ...product })
        .then(() => {
          resolve({
            statusCode: 200,
            message: "Product Updated",
            description: "",
          });
        })
        .catch((err) => {
          reject(err.code);
        });
    }
  });
}

export function getProduct(productId: string): Promise<ProductsI> {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const docRef = doc(db, "products", productId);
    getDoc(docRef).then((snapshot: any) => {
      if (snapshot.exists()) {
        resolve(snapshot.data());
      }
    });
  });
}

export function deleteProduct(productId: string): Promise<ApiResponseI> {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    deleteDoc(doc(db, "products", productId))
      .then((response) => {
        resolve({
          statusCode: 200,
          message: "Product Deleted",
          description: "",
        });
      })
      .catch((err) => {
        reject(err.code);
      });
  });
}
