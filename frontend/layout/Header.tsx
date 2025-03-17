import React, { useState, useEffect } from 'react';
import { DropdownMenu, Button } from '@radix-ui/themes';
import { showLoginModal } from './Login';
import { getWebsite, t, getUrlWithLang, matchPath } from '../lib/i18n';
import { getUser, isAuthenticated, logout } from '../lib/auth';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

const switchLang = (lang: string, supportedLangs: string[]) => {
    // 更新 HTML lang 属性
    document.documentElement.lang = lang;

    // 重定向到相应语言的页面
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);

    // 移除路径中可能存在的语言代码
    if (pathSegments.length > 0 && supportedLangs.includes(pathSegments[0])) {
        pathSegments.shift();
    }

    // 构建新的 URL 路径，去除末尾的斜线
    let newPath = '';
    if (pathSegments.length > 0) {
        newPath = `/${lang}/${pathSegments.join('/')}`;
    } else {
        newPath = `/${lang}`;
    }

    // 确保 URL 不以斜线结尾
    if (newPath.endsWith('/') && newPath.length > 1) {
        newPath = newPath.slice(0, -1);
    }

    window.location.href = newPath;
}

export function Header() {
    const [language, setLanguage] = useState('');
    const [currentLang, setCurrentLang] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const website = getWebsite();
    const supportedLangs = website.SupportLang || [];
    const supportedLangsMap = website.LangMap || {};
    const multiLang = supportedLangs.length > 1;

    useEffect(() => {
        if (multiLang) {
            const htmlLang = document.documentElement.lang || 'en';
            setCurrentLang(htmlLang);
            setLanguage(supportedLangsMap[htmlLang] || 'English');
        }

        const authenticated = isAuthenticated();
        setIsLoggedIn(authenticated);

        if (authenticated) {
            const user = getUser();
            setUserInfo(user);
        }
    }, []);

    const changeLanguage = (lang: string) => {
        // 更新语言状态
        setLanguage(supportedLangsMap[lang] || 'English');
        setCurrentLang(lang);
        switchLang(lang, supportedLangs);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserInfo(null);
        logout();
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="md:!hidden flex justify-between h-16 items-center px-4">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="flex items-center">
                            {website.Header.Logo && <img src={website.Header.Logo} alt="logo" className="h-8 w-8" />}
                            <span className="ml-2 text-xl font-bold text-amber-600">{t(website.Header.Title, website.Header.Title)}</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <Button variant="outline" color="gray" onClick={toggleMobileMenu}>
                            <HamburgerMenuIcon />
                        </Button>
                    </div>
                </div>

                {/* 移动端菜单 */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-black shadow-lg fixed left-0 right-0 z-50 py-4 px-6">
                        <div className="flex flex-col space-y-4">
                            {/* 导航链接 */}
                            {website.Header.Nav.map((nav) => (
                                <a key={nav.Text} href={getUrlWithLang(nav.URL)}
                                    className={`hover:text-amber-600 py-2 font-medium text-sm transition-colors ${matchPath(nav.URL, window.location.pathname) ? 'text-amber-600' : 'text-gray-100'}`}>
                                    {t(nav.Text, nav.Text)}
                                </a>
                            ))}

                            {website.Header.Nav.length > 0 && (
                                <div className="border-t border-gray-200 my-2"></div>
                            )}

                            {/* 语言切换 */}
                            {multiLang && (
                                <div className="py-2">
                                    <p className="text-sm text-gray-500 mb-2">{t('language', 'Language')}</p>
                                    <div className="flex flex-col space-y-2">
                                        {supportedLangs.map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => changeLanguage(lang)}
                                                className={`text-left py-1 ${currentLang === lang ? 'text-amber-600 font-medium' : 'text-gray-700'}`}
                                            >
                                                {supportedLangsMap[lang]}
                                                {currentLang === lang && (
                                                    <span className="ml-2">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {multiLang && (
                                <div className="border-t border-gray-200 my-2"></div>
                            )}

                            {isLoggedIn ? (
                                <div className="flex flex-col space-y-2">
                                    <button
                                        onClick={handleLogout}
                                        className="text-left text-gray-100 hover:text-amber-600 py-1"
                                    >
                                        {t('root.logout', 'Logout')}
                                    </button>
                                </div>
                            ) : (
                                <Button
                                    variant="outline"
                                    color="gray"
                                    onClick={() => showLoginModal()}
                                    className="w-full mt-2"
                                >
                                    {t('root.login', 'Login')}
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                <div className="hidden md:flex justify-between h-16 items-center px-4">
                    {/* 左侧站点名称和图标 */}
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="flex items-center">
                            {website.Header.Logo && <img src={website.Header.Logo} alt="logo" className="h-8 w-8" />}
                            <span className="ml-2 text-xl font-bold text-amber-600">{t(website.Header.Title, website.Header.Title)}</span>
                        </a>
                    </div>

                    {/* 中间导航 - 桌面端显示 */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-8">
                            {website.Header.Nav.map((nav) => (
                                <a key={nav.Text} href={getUrlWithLang(nav.URL)}
                                    className={`px-3 py-2 font-medium text-sm transition-colors rounded-md
                                    ${matchPath(nav.URL, window.location.pathname)
                                            ? 'text-amber-500 bg-white/5'
                                            : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'}`}>
                                    {t(nav.Text, nav.Text)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 右侧按钮组 */}
                    <div className="flex items-center space-x-4">
                        {/* 语言选择按钮 - 使用 Radix UI DropdownMenu */}
                        {multiLang && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <button
                                        type="button"
                                        className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
                                    >
                                        <span>{language}</span>
                                        <DropdownMenu.TriggerIcon />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content variant="soft" align="end">
                                    {supportedLangs.map((lang) => (
                                        <DropdownMenu.Item
                                            key={lang}
                                            onClick={() => changeLanguage(lang)}
                                        >
                                            <div className='flex w-full justify-end'>
                                                {currentLang === lang && (
                                                    <svg className="inline-block h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                                {supportedLangsMap[lang]}
                                            </div>
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}

                        {/* 用户登录/个人信息按钮 */}
                        {isLoggedIn ? (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <button
                                        type="button"
                                        className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
                                    >
                                        {userInfo?.avatar_url ? (
                                            <img
                                                src={userInfo.avatar_url}
                                                alt="avatar"
                                                className="h-8 w-8 rounded-full"
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center text-white">
                                                {(userInfo?.user_name || '').charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content variant="soft" align="end">
                                    {/* <DropdownMenu.Item>
                                        <a href="/profile" className="w-full block">个人资料</a>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item>
                                        <a href="/orders" className="w-full block">我的订单</a>
                                    </DropdownMenu.Item> */}
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item onClick={handleLogout}>
                                        {t('root.logout', 'Logout')}
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        ) : (
                            <Button variant="outline" color="gray" onClick={() => showLoginModal()}>
                                {t('root.login', 'Login')}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
