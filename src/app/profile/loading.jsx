export default function ProfileLoading() {
    return (
        <div
            className="profile-page"
            role="status"
            aria-label="প্রোফাইল লোড হচ্ছে"
        >
            <div className="skeleton mb-5 h-8 w-40" />

            <div className="panel skeleton h-32" />
        </div>
    );
}