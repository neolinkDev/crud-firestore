// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  limit,
  query,
  orderBy,
  serverTimestamp,
  startAfter,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// DB conection
export const db = getFirestore(app);

// obtengo la data de firebase
// const customersC = collection(db,'customers');

// uso query para el limite
// const q = query(customersC, limit(1))

// Ejecutar la consulta y obtener todos los documentos
// getDocs(q)
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       // Aquí puedes acceder a los datos de cada documento utilizando doc.data()
//       const data = doc.data();
//       console.log(data);
//     });
//   })
//   .catch((error) => {
//     console.error('Error al obtener los documentos:', error);
//   });

//
export const saveCustomer = (customer, email, phone, company) => {
  addDoc(collection(db, 'customers'), {
    customer,
    email,
    phone,
    company,
    createdAt: serverTimestamp(),
  });
};

export const getCustomers = () => {
  return getDocs(collection(db, 'customers'));
};

// export const getCustomers = async () => {
//   const querySnapshot = await getDocs(query(collection(db, 'customers'), limit(10)));
//   return querySnapshot;
// };

// export const onGetCustomers = (fn) => {
//   return onSnapshot(query(collection(db, 'customers'), orderBy('createdAt'), limit(3)), fn);
// }

// Función para obtener clientes en función de la página actual, tamaño de página y función de callback
export const onGetCustomers = async (currentPage, pageSize, fn) => {
  
  // Referencia a la colección 'customers'
  const customersRef = collection(db, 'customers');

  // Consulta de referencia para ordenar los documentos por 'createdAt'
  const queryRef = query(customersRef, orderBy('createdAt'));

  // Obtener el snapshot de la consulta inicial
  const snapshot = await getDocs(queryRef);

  // Calcular el total de documentos y el número de páginas
  const totalDocs = snapshot.size;
  const totalPages = Math.ceil(totalDocs / pageSize);

  // Asegurarse de que la página actual no sea mayor o igual al número total de páginas
  if (currentPage >= totalPages) {
    currentPage = totalPages - 1;
  }

  // Obtener el documento de inicio para la paginación
  const startAfterDoc = snapshot.docs[currentPage * pageSize];

  // Si hay un documento de inicio, realizar la consulta con startAfter para obtener los siguientes documentos
  if (startAfterDoc) {
    const paginatedQuery = query(
      customersRef,
      orderBy('createdAt'),
      startAfter(startAfterDoc),
      limit(pageSize)
    );
    
    // Escuchar los cambios en la consulta paginada y llamar a la función de callback
    onSnapshot(paginatedQuery, fn);
  }
  // Si no hay documento de inicio, realizar la consulta sin startAfter para obtener los primeros documentos
  else {
    const paginatedQuery = query(
      customersRef,
      orderBy('createdAt'),
      limit(pageSize)
    );
    onSnapshot(paginatedQuery, fn);
  }
};
