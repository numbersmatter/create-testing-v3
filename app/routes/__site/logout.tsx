import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { destroySession, getSession } from "~/server/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

