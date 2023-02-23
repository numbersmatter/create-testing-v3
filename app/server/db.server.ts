import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";
import type { RequestDoc } from "./route-logic/requests/types";
import { FieldDoc, FormDoc, FormQuestion } from "./route-logic/test-requests/types";

// helper function to convert firestore data to typescript
const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

// helper to apply converter to multiple collections
const dataPoint = <T extends FirebaseFirestore.DocumentData>(
  collectionPath: string
) => getFirestore().collection(collectionPath).withConverter(converter<T>());


export type Note = {
  title: string;
  body: string;
}

export const db = {
  userNotes: (uid: string) => dataPoint<Note>(`users/${uid}/notes`),
  requests: () => dataPoint<RequestDoc>(`requests`),
  testFormQuestions: (formId: string) => dataPoint<FormQuestion>(
    `testCollection/version1/testForms/${formId}/testFormQuestions/`),
  testForms: () => dataPoint<FormDoc>(`testCollection/version1/testForms`),
  questionFields : (formId:string, questionId:string)=> dataPoint<FieldDoc>(
    `testCollection/version1/testForms/${formId}/testFormQuestions/${questionId}/fields`)
};
