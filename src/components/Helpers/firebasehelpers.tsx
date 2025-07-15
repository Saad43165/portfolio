// src/utils/firebaseHelpers.ts
import { db } from './firebase';

import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { Project } from '../../types';

export const addProjectToFirestore = async (
  project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
) => {
  const timestamp = new Date().toISOString();

  const docRef = await addDoc(collection(db, 'projects'), {
    ...project,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  return docRef.id;
};

export const updateProjectInFirestore = async (
  projectId: string,
  project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
) => {
  const timestamp = new Date().toISOString();

  const docRef = doc(db, 'projects', projectId);
  await updateDoc(docRef, {
    ...project,
    updatedAt: timestamp,
  });
};
