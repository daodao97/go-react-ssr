import React, { useCallback, useEffect, useState } from "react";
import { Flex } from "@radix-ui/themes";
import Faq from "../blocks/faq/Faq";
import Hero from "../blocks/hero/Hero";
/**
 * Home component displays a welcome message.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.message - The initial welcome message.
 * @param {number} [props.initialCount] - Optional callback function to be called after a delay.
 */
export function Home({ message = "", initialCount = 0 }) {
	const [count, setCount] = useState(initialCount);
	const [currentMessage, setCurrentMessage] = useState(message);

	const increment = useCallback(() => setCount(count + 1), [count]);
	const decrement = useCallback(() => setCount(count - 1), [count]);

	useEffect(() => {
		setTimeout(() => {
			setCurrentMessage("Message updated after first render");
		}, 1000);
	}, []);

	return (
		<Flex gap="3" className="flex-1 flex-col">
			<Hero />
			<Faq />
		</Flex>
	);
}
