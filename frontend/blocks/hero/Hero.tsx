import React from "react";

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold  mb-6 tracking-tight">
                    WanX 2.1 (WanX2.1) - Tongyi Wanxiang
                </h1>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <a
                        href="https://x.com/Alibaba_Wan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-white/20  px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1"
                    >
                        Follow WanX on X (Twitter)
                    </a>
                    <a
                        href="https://fas.st/t/hnFpHs52"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600  px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg font-medium"
                    >
                        Generate Video with Pollo.ai
                    </a>
                </div>
                <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                    Alibaba Cloud's Leading AI Video Generation Model - Ranked #1 on VBench with 84.7%
                    overall score. Transform your ideas into high-quality videos with state-of-the-art AI technology.
                </p>
                <p className="text-lg text-white/80 mb-6">
                    This site collects videos from public networks for your reference.
                </p>
                <p className="text-lg text-white/80">
                    Note: This is not the official website of WanX2.1, please visit
                    <a
                        href="https://tongyi.aliyun.com/wanxiang/videoCreation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white transition-colors"
                    >tongyi wanxiang</a>
                </p>
            </div>
        </section>
    );
}
