export default function Footer() {
    return (
        <footer className="border-t border-[#e4ece6] bg-[#fcfefc]">
            <div className="mx-auto flex min-h-[66px] w-[calc(100%-48px)] max-w-[1120px] items-center justify-between gap-6 py-4 text-[11px] text-[#637269] max-[767px]:w-[calc(100%-32px)] max-[767px]:flex-col max-[767px]:gap-1 max-[767px]:text-center">
                <p>
                    <strong className="font-semibold text-[#1d3024]">
                        বাজার দর
                    </strong>{" "}
                    — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                <p>
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
}