import React, { useState } from "react";
import { Badge } from "@radix-ui/themes";

type Faq = {
    tips: string;
    title: string;
    subtitle: string;
    list: FaqItem[];
    anchor: string;
};

type FaqItem = {
    question: string;
    answer: string;
};

export default function Faq({ faqs }: { faqs: Faq }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <div className="text-center mb-12" id={faqs.anchor}>
                {faqs.tips && <span className="inline-block bg-amber-500 px-3 py-1 rounded-full text-sm font-medium mb-4">{faqs.tips}</span>}
                <h1 className="text-3xl font-bold sm:text-4xl mb-4">{faqs.title}</h1>
                {faqs.subtitle && <p className="max-w-2xl mx-auto ">{faqs.subtitle}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {(faqs.list || []).map((faq, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg shadow-sm p-6 relative">
                        <div className="flex items-start">
                            <Badge color="orange" className="mr-2">{index + 1}</Badge>
                            <div>
                                <h2 className="text-lg font-medium text-gray-100 mb-2">{faq.question}</h2>
                                <p className="text-gray-400">{faq.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
