import { LoaderArgs, ActionArgs, redirect} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Field } from "~/server/route-logic/requests/types";
import QuestionPanel from "~/server/route-logic/requests/ui/forms/QuestionPanel";
import { handleUserRequestToCreateForm, writeFormToDb } from "~/server/route-logic/test-requests/test-requests.server";


export async function action({params, request}:ActionArgs) {
  const checkDataShape =await handleUserRequestToCreateForm(params, request);

    if(!checkDataShape.success){
    return checkDataShape.error;
  }else{
    const formDoc = { ...checkDataShape.data, questionOrder:[], questionsObj: {}}
    const formWrite = await writeFormToDb(formDoc);
    return redirect(`/test-requests/forms/${formWrite.formId}`)
  }

}



export async function loader({params}:LoaderArgs) {


  const questionName = "Create Form";
  const questionText = "Name your form and give it a description"
  const formName: Field = {
    fieldId: "formName",
    type: "shortText",
    label: "FormName",
  };
  const formText: Field = {
    fieldId: "formText",
    type: "longText",
    label: "Form Text",
  };
  const fields= [formName, formText];

  const questionDisplayData = { questionName, questionText, fields};

  return json({ questionDisplayData });  
}


export default function CreateForm() {
  const { questionDisplayData} = useLoaderData<typeof loader>();
  return (
      <Form method="post" >
        <QuestionPanel
          questionDisplayData={questionDisplayData} 
          actionData={{}}
        />
      </Form>
    );
}