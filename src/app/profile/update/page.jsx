import { requireSession } from "@/lib/session";
import UpdateProfileForm from "@/components/auth/UpdateProfileForm";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "তথ্য আপডেট",
};

export default async function UpdatePage() {
    const session = await requireSession("/profile/update");

    return <UpdateProfileForm initialName={session.user.name} />;
}