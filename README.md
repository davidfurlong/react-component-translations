# React local translations

## UPDATE HALF A YEAR LATER - THIS IS A BAD IDEA, dont do this.
## Look at https://github.com/DeedMob/react-local-translations instead

The idea behind this project is to build a lightweight, low-code-overhead, component-scoped "local" translation method for react.

Each component has it's own translations.js file which is imported into that component under a namespace t10s and compiled is a simple javascript Object which maps from key to value. The value can be anything: string, number or a function

Design decisions: 
- importing the current language: in order to connect the current locale into every part of the code we would have to either connect a global state (for example redux), pass the locale through the Component hierarchy, Use (React Contexts)[https://facebook.github.io/react/docs/context.html], Use a Higher order component, or use a decorator. 
None of these seem even remotely minimal when it comes to lines of code added to each file to add translations. Thus the biggest drawback and a major design decision behind this system is to *require a refresh to update a change in the language*. The reasons I see for this not being a tragic flaw are that the language should change very rarely, and the savings in the # of extra lines of code per component are huge. 
- Local translations scope. There are great reasons to use local CSS for react components, and the reasons for using local translations are quite similar. The easy of changing parts of the code and quickly reflecting changes to the translations is liberating. However the drawbacks of doing this must be acknowledged aswell a) duplicate translations b) when getting translated there are many different files to update. However a) can be handled by an optional global translations file which holds common phrases and is imported into local translation files if needed, and b) can be handled by writing a build tool to make the process of translating phrases in multiple files easier.


```javascript

// Login.js
const t10s = require('./translations')();

class Login extends Component {
  render(){
    return (
      <div>{t10s.title}</div>
    )
  }
}

// translations.js
import compileTranslation from 'compileTranslation.js';

const translations = {
  title: {
    'en': 'Login',
    'de': 'Einloggen',
    'nl': 'Inloggen'
  }
}
export default compileTranslation(translations);



// compileTranslation.js
import { languageInterface } from '../interfaces';

export default translations => () => {
	const locale = languageInterface.locale; // "en" 

  const localeTranslation = {};
  for (const key in translations){
    if(translations.hasOwnProperty(key))
      localeTranslation[key] = translations[key][locale];
  }
  return localeTranslation;
}



// languageInterface
import platformInterface from './platformInterface';
import { supportedLanguages, defaultLanguage, getCookieOptions } from '../constants';

class Language extends platformInterface {
  constructor(){
    super();
    this.implemented = false;
    this._locale = undefined;
  }

  implements({getLanguageCandidates, store, load, destroy, platform}){
    this.getLanguageCandidates = getLanguageCandidates;
    this.store = store;
    this.load = load;
    this.destroy = destroy;

    super.platform = platform;
    this.implemented = true;

    this.loadLocale();
  }

  isSupported(locale){
    for(let lang of supportedLanguages){
      if(lang.value == locale)
        return true
    }
    return false
  }

  loadLocale(){
    const localeCandidates = this.getLanguageCandidates();
      for(let locale of localeCandidates){
        if(this.isSupported(locale)){
          this.locale = locale;
          break;
        }
      }
  }

  get locale(){
    return this._locale;
  }

  set locale(locale){
    if(this.isSupported(locale)){
      this._locale = locale;
      this.store("locale", locale);
    }
  }
}

const l = new Language();

export default l;



// Changing the language
changeLanguage(locale){
  language.locale = locale;
  location.reload();
}

```
