"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const routesToPrefetch = ["/explorer", "/admin/login", "/admin/dashboard"];

export default function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    routesToPrefetch.forEach((route) => router.prefetch(route));
  }, [router]);

  return null;
}
