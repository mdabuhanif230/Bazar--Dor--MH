"use client";

import { useEffect } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import toast from "react-hot-toast";

export default function AuthFeedback() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const reason = params.get("reason");
  const status = params.get("auth");
  const error = params.get("error");

  useEffect(() => {
    if (reason === "protected") {
      toast.error(
        "এই পেজটি দেখতে আগে সাইন ইন করুন।",
        { id: "protected-route" }
      );
    }

    if (status === "success") {
      toast.success(
        "সফলভাবে সাইন ইন হয়েছে।",
        { id: "social-auth" }
      );
    }

    if (error) {
      toast.error(
        "সোশ্যাল সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
        { id: "social-error" }
      );
    }

    if (reason || status || error) {
      const cleanParams = new URLSearchParams(
        params.toString()
      );

      cleanParams.delete("reason");
      cleanParams.delete("auth");
      cleanParams.delete("error");

      let cleanPath = pathname;

      if (cleanParams.size) {
        cleanPath = `${pathname}?${cleanParams.toString()}`;
      }

      router.replace(cleanPath, {
        scroll: false,
      });
    }
  }, [reason, status, error, params, pathname, router]);

  return null;
}