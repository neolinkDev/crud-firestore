

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, limit, query, orderBy, serverTimestamp } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.  VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// DB conection
const db = getFirestore();

// 
export const saveCustomer = (customer, email, phone, company) => {
  addDoc(collection(db, 'customers'), {
    customer,
    email,
    phone,
    company,
    createdAt: serverTimestamp()
  })
}

//
// export const getCustomers = () => {
//    return getDocs(collection(db, 'customers'))
// }
export const getCustomers = async () => {
  const querySnapshot = await getDocs(query(collection(db, 'customers'), limit(10)));
  return querySnapshot;
};



//
// export const onGetCustomers = (fn) => {
//   return onSnapshot(collection(db, 'customers'), fn)
// }

// export const onGetCustomers = (fn) => {
//   return onSnapshot(query(collection(db, 'customers'), limit(10)), fn);
// }

export const onGetCustomers = (fn) => {
  return onSnapshot(query(collection(db, 'customers'), orderBy('createdAt'), limit(10)), fn);
}


