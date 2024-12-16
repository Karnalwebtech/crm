"use client";
import DashboardWrapper from "../dashboardWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setWorkspace } from "@/state";
import { useRouter } from "next/navigation"; // Adjusted import
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role !== "admin") {
      toast.error("You don't have access to this route");
      dispatch(setWorkspace("/crm"));
      router.push("/crm");
    }
  }, [user, dispatch, router]);

  return (
    <>
      <DashboardWrapper>{children}</DashboardWrapper>
    </>
  );
}
