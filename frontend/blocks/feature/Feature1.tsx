import React from 'react';

interface Feature1Props {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt?: string;
    isReversed?: boolean; // 控制图片和文字的位置
    features?: {
        icon: React.ReactNode;
        title: string;
        description: string;
    }[];
}

export const Feature1: React.FC<Feature1Props> = ({
    title,
    description,
    imageUrl,
    imageAlt = '特性展示',
    isReversed = false,
    features = [],
}) => {
    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
                    {/* 左侧图片区域 */}
                    <div className="w-full md:w-1/2">
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover"
                                onError={(e) => {
                                    e.currentTarget.onerror = null; // 防止无限循环
                                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%236b7280'%3E图片加载失败%3C/text%3E%3C/svg%3E";
                                    const imgElement = e.currentTarget;
                                    imgElement.classList.add("bg-gray-100", "border", "border-gray-200");
                                }}
                            />
                        </div>
                    </div>

                    {/* 右侧文字区域 */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">{title}</h2>
                        <p className="text-gray-600 mb-8">{description}</p>

                        {/* 特性列表 */}
                        {features.length > 0 && (
                            <div className="space-y-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 text-primary">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                                            <p className="text-gray-500">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};