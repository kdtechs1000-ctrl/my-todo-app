import { Outlet } from "react-router";
import Header from "./Header";
import { Toaster } from "@/components/ui/sonner"


function Root() {
  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
    </>
  )
}

export default Root;