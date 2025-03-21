import React, { useCallback, useEffect, useState } from "react";
import Faq from "../blocks/faq/Faq";
import Hero from "../blocks/hero/Hero";
import { getTranslations } from "../lib/i18n";
import { GenVideo } from "../blocks/submit/GenVideo";
import { Feature1 } from '../blocks/feature/Feature1';
import { Feature2 } from '../blocks/feature/Feature2';
import { FiBox, FiSettings, FiCloud } from 'react-icons/fi'; // 需要安装 react-icons

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


	useEffect(() => {
		setTimeout(() => {
			setCurrentMessage("Message updated after first render");
		}, 1000);
	}, []);

	const featureProps = [
		{
			title: "什么是 Go React SSR",
			description: "Go React SSR 是一个用于构建 AI SaaS 创业项目的 NextJS 模板，内置多种模板和组件。",
			imageUrl: "https://plus.unsplash.com/premium_photo-1670426500778-80d177da0973?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw4cGZvUFQ4S0VNY3x8ZW58MHx8fHx8",
			imageAlt: "Go React SSR 代码预览",
			features: [
				{
					icon: <FiBox size={24} />,
					title: "即用型模板",
					description: "从数十个生产就绪的 AI SaaS 模板中选择，快速启动您的项目。"
				},
				{
					icon: <FiSettings size={24} />,
					title: "基础设施配置",
					description: "立即获取内置最佳实践的可扩展基础设施。"
				},
				{
					icon: <FiCloud size={24} />,
					title: "快速部署",
					description: "在几小时内将您的 AI SaaS 应用部署到生产环境，而不是几天。"
				}
			]
		},
		{
			title: "什么是 Go React SSR",
			description: "Go React SSR 是一个用于构建 AI SaaS 创业项目的 NextJS 模板，内置多种模板和组件。",
			imageUrl: "https://plus.unsplash.com/premium_photo-1670426500778-80d177da0973?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw4cGZvUFQ4S0VNY3x8ZW58MHx8fHx8",
			imageAlt: "Go React SSR 代码预览",
			features: [
				{
					icon: <FiBox size={24} />,
					title: "即用型模板",
					description: "从数十个生产就绪的 AI SaaS 模板中选择，快速启动您的项目。"
				},
				{
					icon: <FiSettings size={24} />,
					title: "基础设施配置",
					description: "立即获取内置最佳实践的可扩展基础设施。"
				},
				{
					icon: <FiCloud size={24} />,
					title: "快速部署",
					description: "在几小时内将您的 AI SaaS 应用部署到生产环境，而不是几天。"
				}
			]
		}
	]

	const feature2Props = [
		{
			title: "Go React SSR 特性",
			description: "Go React SSR 提供多种特性，帮助您快速构建 AI SaaS 应用。",
			features: [
				{
					icon: <FiBox size={24} />,
					title: "即用型模板",
					description: "从数十个生产就绪的 AI SaaS 模板中选择，快速启动您的项目。",
					imageUrl: "https://plus.unsplash.com/premium_photo-1670426500778-80d177da0973?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw4cGZvUFQ4S0VNY3x8ZW58MHx8fHx8",
					imageAlt: "Go React SSR 代码预览"
				},
				{
					icon: <FiBox size={24} />,
					title: "即用型模板",
					description: "从数十个生产就绪的 AI SaaS 模板中选择，快速启动您的项目。",
					imageUrl: "https://plus.unsplash.com/premium_photo-1670426500778-80d177da0973?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw4cGZvUFQ4S0VNY3x8ZW58MHx8fHx8",
					imageAlt: "Go React SSR 代码预览"
				},
				{
					icon: <FiBox size={24} />,
					title: "即用型模板",
					description: "从数十个生产就绪的 AI SaaS 模板中选择，快速启动您的项目。",
					imageUrl: "https://plus.unsplash.com/premium_photo-1670426500778-80d177da0973?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw4cGZvUFQ4S0VNY3x8ZW58MHx8fHx8",
					imageAlt: "Go React SSR 代码预览"
				},

			]
		}
	]

	return (
		<div className="flex-1 flex-col bg-gray-900">
			<Hero hero={hero} />

			<GenVideo />

			{featureProps.map((feature, index) => (
				<Feature1
					key={index}
					{...feature}
					isReversed={index % 2 === 1}
				/>
			))}

			{feature2Props.map((feature, index) => (
				<Feature2
					key={index}
					{...feature}
					isReversed={index % 2 === 1}
				/>
			))}

			<Faq faqs={faqs} />
		</div>
	);
}
