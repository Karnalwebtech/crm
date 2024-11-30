"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the CRM page
    router.push('/crm'); // Change this to your actual CRM page route
  }, [router]);

  return null;
}
