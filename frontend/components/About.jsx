import React from "react";
import { Flex, Text, Button } from "@radix-ui/themes";
import { t } from "../lib/i18n";

export function About() {
	return (
		<Flex direction="column" gap="2" className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-12">
			<Text>{t("about.title")}</Text>
			<Text>{t("about.description")}</Text>
		</Flex>
	);
}
