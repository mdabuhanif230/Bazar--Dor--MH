import { requireSession } from "@/lib/session";
import ProfileCard from "@/components/auth/ProfileCard";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "আমার প্রোফাইল",
};

export default async function ProfilePage() {
    const session = await requireSession("/profile");

    return (
        <ProfileCard
            initialUser={session.user}
        />
    );
}