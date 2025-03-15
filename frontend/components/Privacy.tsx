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
        <Flex direction="column" gap="4" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">{title}</h1>
            {content.map((item, index) => (
                <Flex key={index} direction="column" gap="2" className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.content}</p>
                </Flex>
            ))}
        </Flex>
    );
}
