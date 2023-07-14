import { collection, getDocs, getFirestore } from "firebase/firestore";

import { app } from "../config/firebase";

const db = getFirestore(app);

const packagesCollectionRef = collection(db, "packages");

const getPackageList = async () => {
  const data = await getDocs(packagesCollectionRef);
  const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return filteredData;
};

export { getPackageList };
