"use client";

import { useEffect } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import toast from "react-hot-toast";

export default function AuthFeedback() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const reason = searchParams.get("reason");
  const authStatus = searchParams.get("auth");
  const authError = searchParams.get("error");

  useEffect(() => {
    if (reason === "protected") {
      toast.error(
        "এই পেজটি দেখতে আগে সাইন ইন করুন।",
        { id: "protected-route" }
      );
    }

    if (authStatus === "success") {
      toast.success(
        "সফলভাবে সাইন ইন হয়েছে।",
        { id: "social-auth" }
      );
    }

    if (authError) {
      toast.error(
        "সোশ্যাল সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
        { id: "social-error" }
      );
    }

    if (!reason && !authStatus && !authError) {
      return;
    }

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete("reason");
    newParams.delete("auth");
    newParams.delete("error");

    const queryString = newParams.toString();
    let newUrl = pathname;

    if (queryString) {
      newUrl = pathname + "?" + queryString;
    }

    router.replace(newUrl, { scroll: false });
  }, [reason, authStatus, authError, searchParams, pathname, router]);

  return null;
}