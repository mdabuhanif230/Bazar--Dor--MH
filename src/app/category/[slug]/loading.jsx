import Loading from "@/components/shared/Loading";

export default function CategoryLoading() {
    return (
        <>
            <div className="panel skeleton mb-5 h-24" />

            <Loading />
        </>
    );
}