import SignInForm from "@/components/auth/SignInForm";
import BackToHome from "@/components/shared/BackToHome";

export const metadata = {
    title: "সাইন ইন",
};

export default function SignInPage() {
    return (
        <section className="mx-auto mt-[18px] mb-[60px] max-w-[420px] max-[540px]:mt-3">
            <div className="mb-5 text-center">
                <h1 className="mb-1 text-2xl font-semibold">
                    সাইন ইন
                </h1>

                <p className="text-xs text-[#78877d]">
                    বিস্তারিত বাজারদর দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।
                </p>
            </div>

            <SignInForm />

            <BackToHome />
        </section>
    );
}