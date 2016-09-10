import getLocale from './global_locale';

const compileTranslation = locale => translations => {
	const localeTranslation = {};
	for (const key in translations){
		if(translations.hasOwnProperty(key))
			localeTranslation[key] = translations[key][locale];
	}
	return localeTranslation;
}

export default compileTranslation(getLocale);