
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { createRequestDoc } from "~/server/route-logic/requests";
import { RequestDoc } from "~/server/route-logic/requests/types";
import { getTestFormById, getTestFormQuestionDoc, getTestFormQuestions } from "~/server/route-logic/test-requests";



export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);

  const formId = formValues.formId as string;

  const formQuestions = await getTestFormQuestions(params)

  const testForm = await getTestFormById(params);
  if (!testForm) {
    throw new Response("how did that happen", { status: 401 })
  }

  const profileHeaderData = {
    avatar: "https://firebasestorage.googleapis.com/v0/b/component-sites.appspot.com/o/user%2Fpq1caOfoOYMMljX8AXEmPQZEDij2%2FpublicImages%2F873759E5-B8C9-448C-9F4D-E98AC7F45366.png?alt=media&token=7b6a6b35-3dd4-49c4-9195-ea0aeda5183d",
    bannerImage: "https://firebasestorage.googleapis.com/v0/b/component-sites.appspot.com/o/user%2Fpq1caOfoOYMMljX8AXEmPQZEDij2%2FpublicImages%2FBanner%2012-11-2021.png?alt=media&token=835043c2-00d8-4f71-b8e0-b330c3ae44b6",
    displayName: "milachu92",
    profileHeadline: " Just a headline"
  };

  const questionStatus = testForm.questionOrder.reduce((acc, questionId) => ({ ...acc, [questionId]: false }), {})

  const questionResponses = testForm.questionOrder.reduce((acc, questionId)=>({...acc, [questionId]:{}}), {})

  const questionsObj = testForm.questionOrder.reduce()



  const newRequestDoc = {
    profileHeaderData,
    questionOrder: testForm.questionOrder,
    questionResponses,
    questionStatus,
    questionsObj,
    status: "in-progress"
  } 

  const writeRequest = await createRequestDoc({...newRequestDoc, status:"in-progress"});




  return json({});
}



export async function loader({ params }: LoaderArgs) {
  const testForms = await getTestForms();
  const testFormsOptions = testForms.map((formDoc) => ({ label: formDoc.formName, value: formDoc.formId }))

  const chooseForm: Field = {
    type: "select",
    label: "Choose Form",
    fieldId: "formId",
    options: testFormsOptions,
  }

  const questionDisplayData = {
    questionName: "Select Form to make a request",
    questionText: "text not really needed",
    fields: [chooseForm]
  }

  return { questionDisplayData, };
}




export default function MakeTestRequest() {
  const { questionDisplayData } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const displayQuestion: {
    questionName: string;
    questionText: string;
    fields: Field[];
  } = {
    questionName: questionDisplayData.questionName,
    questionText: questionDisplayData.questionText,
    fields: []
  }

  return (
    <Form method="post">
      <QuestionPanel
        questionDisplayData={questionDisplayData}
        actionData={actionData}
      />

    </Form>
  );
}
