import SignInForm from "@/components/auth/SignInForm";
import BackToHome from "@/components/shared/BackToHome";

export const metadata = {
    title: "সাইন ইন",
};

export default function SignInPage() {
    return (
        <section className="auth-page">
            <div className="auth-heading">
                <h1>সাইন ইন</h1>

                <p>
                    বিস্তারিত বাজারদর দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।
                </p>
            </div>

            <SignInForm />

            <BackToHome />
        </section>
    );
}