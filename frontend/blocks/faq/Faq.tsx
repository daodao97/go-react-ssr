import React, { useState } from "react";
import { Badge } from "@radix-ui/themes";
type FaqItem = {
    question: string;
    answer: string;
};

export default function Faq() {
    const [faqs] = useState<FaqItem[]>([
        {
            question: "ShipAny 究竟是什么，它是如何工作的?",
            answer: "ShipAny 是一个专门为构建 AI SaaS 创业项目设计的综合性 NextJS 模板。它提供即用型模板、基础设施设置和部署工具，帮助您在几小时内而不是几天内启动 AI 业务。"
        },
        {
            question: "使用 ShipAny 需要高级技术技能吗?",
            answer: "虽然基本的编程知识会有帮助，但 ShipAny 设计得非常开发者友好。我们的模板和文档使您即使不是 AI 或云基础设施专家也能轻松入门。"
        },
        {
            question: "我可以用 ShipAny 构建什么类型的 AI SaaS?",
            answer: "ShipAny 支持广泛的 AI 应用，从内容生成到数据分析工具。我们的模板涵盖流行用例，如 AI 聊天机器人、内容生成器、图像处理应用等。"
        },
        {
            question: "使用 ShipAny 通常需要多长时间才能启动?",
            answer: "使用 ShipAny，您可以在几小时内完成工作原型，并在几小时内完成生产就绪的应用。我们的一键部署和预配置基础设施显著缩短了传统的数月开发周期。"
        },
        {
            question: "ShipAny 的基础设施包括什么?",
            answer: "ShipAny 提供完整的基础设施栈，包括身份验证、数据库设置、API 集成、支付处理和可扩展的云部署。一切都按照行业最佳实践预先配置。"
        },
        {
            question: "我可以自定义模板以匹配我的品牌吗?",
            answer: "当然可以！所有 ShipAny 模板都完全可定制。您可以修改设计、功能和功能性以匹配您的品牌标识和特定业务需求，同时保持强大的底层基础设施。"
        }
    ]);

    return (
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-12 bg-gray-900">
            <div className="text-center mb-12">
                <span className="inline-block bg-amber-500 px-3 py-1 rounded-full text-sm font-medium mb-4">常见问题</span>
                <h1 className="text-3xl font-bold sm:text-4xl mb-4">关于 ShipAny 的常见问题</h1>
                <p className="max-w-2xl mx-auto ">还有其他问题? 通过 Discord 或电子邮件联系我们。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg shadow-sm p-6 relative">
                        <div className="flex items-start">
                            <Badge color="orange" className="mr-2">{index + 1}</Badge>
                            <div>
                                <h3 className="text-lg font-medium text-gray-100 mb-2">{faq.question}</h3>
                                <p className="text-gray-400">{faq.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
