import Image from "next/image";

export default function Hero() {
    const date = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date());

    return (
        <section className="mb-[38px] flex min-h-[255px] items-center justify-between gap-7 rounded-xl border border-[#e7eee9] bg-[#ffffffba] px-[26px] py-8 max-[767px]:p-6 max-[540px]:mb-[25px] max-[540px]:flex-col max-[540px]:items-start max-[540px]:gap-[15px] max-[540px]:p-[22px]">
            <div className="flex-1">
                <span className="mb-2.5 inline-block rounded-[20px] bg-[#e7f4eb] px-[9px] py-[3px] text-[11px] text-[#008d3d]">
                    {date}
                </span>

                <h1 className="mb-3 text-[clamp(25px,3vw,36px)] leading-[1.25] font-bold tracking-[-0.5px] max-[900px]:text-[28px] max-[767px]:text-[25px] max-[540px]:text-[29px]">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="mb-5 text-[13px] text-[#78877d]">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলা —
                    প্রয়োজনীয় জিনিসের দাম জানুন,
                    <br className="max-[900px]:hidden" />
                    বাজেট ঠিক রাখুন এবং সচেতনভাবে বাজার করুন।
                </p>

                <a
                    href="#সব-পণ্য"
                    className="inline-flex h-8 items-center justify-center rounded-md border border-[#008d3d] bg-[#008d3d] px-3 text-sm font-medium text-white hover:border-[#007833] hover:bg-[#007833] sm:h-10 sm:px-4"
                >
                    সব পণ্য দেখুন
                </a>
            </div>

            <Image
                src="/images/bazar-hero.png"
                alt="ঝুড়িতে তাজা ফল ও সবজি"
                width={280}
                height={220}
                className="h-[190px] w-[240px] shrink-0 object-contain max-[900px]:h-[165px] max-[900px]:w-[200px] max-[767px]:w-[160px] max-[540px]:h-[155px] max-[540px]:w-[205px] max-[540px]:self-center"
            />
        </section>
    );
}