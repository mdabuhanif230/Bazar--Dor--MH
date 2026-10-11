import SignUpForm from "@/components/auth/SignUpForm";
import BackToHome from "@/components/shared/BackToHome";

export const metadata = {
    title: "সাইন আপ",
};

export default function SignUpPage() {
    return (
        <section className="mx-auto mt-[18px] mb-[60px] max-w-[420px] max-[540px]:mt-3">
            <div className="mb-5 text-center">
                <h1 className="mb-1 text-2xl font-semibold">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>

                <p className="text-xs text-[#78877d]">
                    নিয়মিত বাজারদর জানতে আজই যুক্ত হোন।
                </p>
            </div>

            <SignUpForm />

            <BackToHome />
        </section>
    );
}