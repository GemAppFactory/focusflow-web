import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { Task } from '../types';

export interface FirestoreTask extends Omit<Task, 'lastActive'> {
  lastActive: Timestamp;
  userId: string;
}

// Convert Firestore task to app task
const firestoreToTask = (data: any): Task => ({
  ...data,
  lastActive: data.lastActive?.toMillis() || Date.now()
});

// Convert app task to Firestore task
const taskToFirestore = (task: Task, userId: string): Omit<FirestoreTask, 'lastActive'> & { lastActive: any } => ({
  ...task,
  lastActive: Timestamp.fromMillis(task.lastActive),
  userId
});

// Subscribe to user's tasks
export const subscribeToTasks = (userId: string, callback: (tasks: Task[]) => void) => {
  const tasksRef = collection(db, 'users', userId, 'tasks');

  return onSnapshot(tasksRef, (snapshot) => {
    const tasks: Task[] = [];
    snapshot.forEach((doc) => {
      tasks.push(firestoreToTask({ id: doc.id, ...doc.data() }));
    });
    // Sort by lastActive descending
    tasks.sort((a, b) => b.lastActive - a.lastActive);
    callback(tasks);
  });
};

// Save or update a task
export const saveTask = async (userId: string, task: Task) => {
  const taskRef = doc(db, 'users', userId, 'tasks', task.id);
  await setDoc(taskRef, taskToFirestore(task, userId), { merge: true });
};

// Delete a task
export const deleteTask = async (userId: string, taskId: string) => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  await deleteDoc(taskRef);
};

// Get user settings
export const getUserSettings = async (userId: string) => {
  const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
  const snapshot = await getDoc(settingsRef);
  return snapshot.exists() ? snapshot.data() : null;
};

// Save user settings
export const saveUserSettings = async (userId: string, settings: any) => {
  const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
  await setDoc(settingsRef, {
    ...settings,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

// Subscribe to user settings
export const subscribeToSettings = (userId: string, callback: (settings: any) => void) => {
  const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');

  return onSnapshot(settingsRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    }
  });
};
