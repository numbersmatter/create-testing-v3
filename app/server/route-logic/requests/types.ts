export interface RequestDoc {
  profileHeaderData: HeaderData;
  questionStatus: QuestionStatus;
  questionOrder: string[];
  status: "submitted" | "in-progress";
  questionsObj: { [questionId: string]: Question };
  questionResponses: QuestionResponses;
}
interface HeaderData {
  bannerImage: string;
  avatar: string;
  displayName: string;
  profileHeadline: string;
}

interface QuestionStatus {
  [key: string]: boolean;
}

export interface StringIndexObj {
  [key:string]: string
}

export interface QuestionResponses {
  [questionId: string]:{[key:string]: string} ;
}

export type FieldTypes =
  | "select"
  | "date"
  | "currency"
  | "longText"
  | "email"
  | "shortText"
  | "imageUpload";

export type Field = {
  type: FieldTypes;
  label: string;
  fieldId: string;
  options?: { value: string; label: string }[];
  schema? : {
    optional: boolean,
    minLength:number,
    maxLenght: number,
   }
};
interface Question {
  fields: Field[];
  questionName: string;
  questionText: string;

}

interface UserQuestionResponse {
  [index:string]: string;
}

