import SignUpForm from "@/components/auth/SignUpForm";
import BackToHome from "@/components/shared/BackToHome";

export const metadata = {
    title: "সাইন আপ",
};

export default function SignUpPage() {
    return (
        <section className="auth-page">
            <div className="auth-heading">
                <h1>অ্যাকাউন্ট তৈরি করুন</h1>

                <p>
                    নিয়মিত বাজারদর জানতে আজই যুক্ত হোন।
                </p>
            </div>

            <SignUpForm />

            <BackToHome />
        </section>
    );
}