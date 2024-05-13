export const useDark = () => {
	const isDark = ref<boolean>(false);
	const theme = ref<string>('');

	const loadCurrentTheme = (themeName: string): void => {
		theme.value = themeName;
		if (
			localStorage[themeName] === 'dark' ||
			(!(themeName in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			localStorage.setItem(themeName, 'dark');
			isDark.value = true;
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem(themeName, 'light');
			isDark.value = false;
		}
	};

	const changeTheme = (): void => {
		isDark.value = !isDark.value;
		document.documentElement.classList.toggle('dark');

		if (isDark.value) {
			localStorage.setItem(theme.value, 'dark');
		} else {
			localStorage.setItem(theme.value, 'light');
		}
	};

	return {
		isDark,

		loadCurrentTheme,
		changeTheme,
	};
};
