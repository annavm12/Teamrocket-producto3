import React, { createContext, useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import firestore from '../utils/Firebase'; // Asegúrate de que la ruta sea correcta

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(firestore, "misviajes"), orderBy("dayNumber", "asc"));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const daysArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDays(daysArray);
      setLoading(false);
    });

    return () => unsubscribe(); // Se asegura de desuscribirse del snapshot al desmontar
  }, []);

  const addDay = async day => {
    const docRef = await addDoc(collection(firestore, "misviajes"), day);
    return docRef.id; // Devuelve el ID del nuevo documento
  };

  const updateDay = async (dayId, day) => {
    const dayRef = doc(firestore, `misviajes/${dayId}`);
    await updateDoc(dayRef, day);
  };

  const deleteDay = async dayId => {
    const dayRef = doc(firestore, `misviajes/${dayId}`);
    await deleteDoc(dayRef);
  };

  return (
    <DataContext.Provider value={{ days, loading, addDay, updateDay, deleteDay }}>
      {children}
    </DataContext.Provider>
  );
};
