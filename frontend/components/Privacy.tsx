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
        <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <h1>{title}</h1>
            {content.map((item, index) => (
                <Flex key={index} direction="column" gap="2">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                </Flex>
            ))}
        </Flex>
    );
}
