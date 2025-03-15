import React from "react";
import { getWebsite, t } from "../lib/i18n";
import { getIcon } from "../lib/icons";
export function Footer() {
    const website = getWebsite()
    if (!website) {
        return null;
    }
    return (
        <footer className="py-12 w-full bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                    {/* Logo and Description Section */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center">
                            {website.Footer.Logo && (
                                <img src={website.Footer.Logo} alt={t(website.Footer.Title, website.Footer.Title)} className="h-8 w-8" />
                            )}
                            <span className="ml-2 text-xl text-amber-600 font-semibold">{t(website.Footer.Title, website.Footer.Title)}</span>
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            {t(website.Footer.Desc, website.Footer.Desc)}
                        </p>
                        <div className="flex space-x-4 mt-4">
                            {website.Footer.Social.map((social) => (
                                <a target="_blank" key={social.Text + " " + social.Icon} href={social.URL} className="text-gray-600 hover:text-gray-900">
                                    {social.Icon ? getIcon(social.Icon) : social.Text}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="mt-8 md:mt-0 md:col-span-6 md:col-start-7 text-center md:text-right">
                        <div className="flex flex-row justify-center md:justify-end overflow-x-auto md:grid md:grid-cols-3 gap-4">
                            {/* Column 1 */}
                            {website.Footer.Links.map((group) => (
                                <div key={group.Title} className="text-center md:text-right min-w-max px-3">
                                    <h3 className="text-white font-medium">{t(group.Title, group.Title)}</h3>
                                    <ul className="mt-4 space-y-2">
                                        {group.Links.map((link) => (
                                            <li key={link.Text}><a target="_blank" href={link.URL}
                                                className="text-gray-600 hover:text-gray-900">{link.Text}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{t(website.Footer.Copyright, website.Footer.Copyright)}</p>
                        <div className="mt-4 md:mt-0">
                            {website.Footer.Policy?.map((policy, index) => (
                                <React.Fragment key={policy.URL}>
                                    <a href={policy.URL}
                                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 text-sm">{t(policy.Text, policy.Text)}</a>
                                    {index < website.Footer.Policy.length - 1 && <span className="mx-2 text-gray-500 dark:text-gray-400">|</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
