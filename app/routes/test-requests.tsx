import { Outlet } from "@remix-run/react";
import LeftSideBarLayout from "~/server/route-logic/test-requests/ui/left-side-column-layout";



export default function TestRequestLayout() {

  return <LeftSideBarLayout>

    <Outlet />
  </LeftSideBarLayout>
}