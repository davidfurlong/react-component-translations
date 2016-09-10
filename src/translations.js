import compileTranslation from './compileTranslation';

const translations = {
	something: {
		'en': 'something',
		'de': 'irgendwas',
		'pl': 'czos'
	}
}

export default compileTranslation(translations);