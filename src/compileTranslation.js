import getLocale from './global_locale';

export default translations => () => {
	const locale = getLocale();

  const localeTranslation = {};
  for (const key in translations){
    if(translations.hasOwnProperty(key))
      localeTranslation[key] = translations[key][locale];
  }
  return localeTranslation;
}
