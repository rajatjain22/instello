import { useEffect, useState } from 'react';

const useResponsive = () => {
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 0
	);

	useEffect(() => {
		const updateWindowWidth = () => {
			setWindowWidth(window.innerWidth);
		};
		updateWindowWidth();

		window.addEventListener('resize', updateWindowWidth);

		return () => {
			window.removeEventListener('resize', updateWindowWidth);
		};
	}, []);

	const isMobile = windowWidth <= 480;
	const isTablet = windowWidth > 480 && windowWidth <= 767;
	const isMini = windowWidth >= 768 && windowWidth <= 1024;
	const isDesktop = windowWidth > 1024;

	return { windowWidth, isMobile, isTablet, isMini, isDesktop };
};

export default useResponsive;
