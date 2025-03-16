import React, { useCallback, useEffect, useState } from "react";
import { Button, Flex } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface PrivacyProps {
    title: string;
    content: PrivacyContent[];
}

interface PrivacyContent {
    title: string;
    content: string;
}

export function Privacy({ title = "", content = [] }: PrivacyProps) {

    return (
        <Flex direction="column" gap="4" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold text-white mb-8 pb-4">{title}</h1>
            {content.map((item, index) => (
                <Flex key={index} direction="column" gap="2" className="mb-8 rounded-lg p-4 transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-100 dark:text-gray-50">{item.title}</h3>
                    <p className="text-gray-300 dark:text-gray-200 leading-relaxed">{item.content}</p>
                </Flex>
            ))}
        </Flex>
    );
}
