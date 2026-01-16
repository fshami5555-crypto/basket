
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { AppState } from './types';
import { INITIAL_STATE } from './constants';

const DOC_ID = 'main_store';
const COLLECTION = 'app_config';

export const loadData = async (): Promise<AppState> => {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Merge with INITIAL_STATE to ensure all properties (like 'ads') exist 
      // even if the stored document is from an older version of the app.
      return { ...INITIAL_STATE, ...docSnap.data() } as AppState;
    } else {
      // If no data exists yet, initialize it
      await saveData(INITIAL_STATE);
      return INITIAL_STATE;
    }
  } catch (error) {
    console.error("Error loading data from Firebase:", error);
    return INITIAL_STATE;
  }
};

export const saveData = async (data: AppState) => {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    await setDoc(docRef, data);
  } catch (error) {
    console.error("Error saving data to Firebase:", error);
  }
};
