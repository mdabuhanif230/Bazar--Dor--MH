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
        <section className="panel hero-panel">
            <div className="hero-copy">
                <span className="eyebrow">
                    {date}
                </span>

                <h1>আজকের বাজারের দাম এক নজরে</h1>

                <p>
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলা —
                    প্রয়োজনীয় জিনিসের দাম জানুন,
                    <br className="desktop-break" />
                    বাজেট ঠিক রাখুন এবং সচেতনভাবে বাজার করুন।
                </p>

                <a
                    href="#সব-পণ্য"
                    className="btn btn-primary btn-sm sm:btn-md"
                >
                    সব পণ্য দেখুন
                </a>
            </div>

            <Image
                className="hero-image"
                src="/images/bazar-hero.png"
                alt="ঝুড়িতে তাজা ফল ও সবজি"
                width={280}
                height={220}
            />
        </section>
    );
}