import React from "react";
import { twMerge } from 'tailwind-merge'

type Button = {
    text: string;
    href: string;
    target?: string;
    rel?: string;
    className?: string;
    overwirteClassName?: string;
}

type Hero = {
    title: string;
    description: string;
    buttons: Button[];

}

export default function Hero({ hero }: { hero: Hero }) {
    return (
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold  mb-6 tracking-tight">
                    {hero.title}
                </h1>
                {hero.buttons && (
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {(hero.buttons || []).map((button, index) => (
                            <a
                                key={index}
                                href={button.href}
                                target={button.target}
                                rel={button.rel}
                                className={
                                    button.overwirteClassName ? button.overwirteClassName :
                                        twMerge(
                                            "bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1",
                                        )
                                }
                            >
                                {button.text}
                            </a>
                        ))}
                    </div>
                )}
                <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                    {hero.description}
                </p>
            </div>
        </section>
    );
}
