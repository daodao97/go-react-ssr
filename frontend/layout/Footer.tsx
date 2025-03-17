import React from "react";
import { getWebsite, t } from "../lib/i18n";

import { FaGithub, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const socialIcons = {
    twitter: FaTwitter,
    facebook: FaFacebook,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    github: FaGithub,
}

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
                                <a target="_blank" key={social.Text + " " + social.Icon} href={social.URL} className="text-gray-600">
                                    {social.Icon ? React.createElement(socialIcons[social.Icon as keyof typeof socialIcons]) : social.Text}
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
                                    <h2 className="text-white font-medium">{t(group.Title, group.Title)}</h2>
                                    <ul className="mt-4 space-y-2">
                                        {group.Links.map((link) => (
                                            <li key={link.Text}>
                                                <a
                                                    href={link.URL.startsWith('#') ? link.URL : link.URL}
                                                    target={link.URL.startsWith('#') ? '_self' : '_blank'}
                                                    className="text-gray-600"
                                                >
                                                    {link.Text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 pt-8 border-t pb-4 border-gray-700 dark:border-gray-900">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">{t(website.Footer.Copyright, website.Footer.Copyright)}</p>
                        <div className="mt-4 md:mt-0">
                            {website.Footer.Policy?.map((policy, index) => (
                                <React.Fragment key={policy.URL}>
                                    <a href={policy.URL}
                                        className="text-gray-500 text-sm">{t(policy.Text, policy.Text)}</a>
                                    {index < website.Footer.Policy.length - 1 && <span className="mx-2 text-gray-500">|</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
