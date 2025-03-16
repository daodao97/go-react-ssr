import React, { useCallback, useEffect, useState } from "react";
import Faq from "../blocks/faq/Faq";
import Hero from "../blocks/hero/Hero";
import { getTranslations } from "../lib/i18n";
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

	const faqs = getTranslations("home.faq", {})

	const hero = getTranslations("home.hero", {})

	console.log(faqs)

	useEffect(() => {
		setTimeout(() => {
			setCurrentMessage("Message updated after first render");
		}, 1000);
	}, []);

	return (
		<div className="flex-1 flex-col bg-gray-900">
			<Hero hero={hero} />
			<Faq faqs={faqs} />
		</div>
	);
}
