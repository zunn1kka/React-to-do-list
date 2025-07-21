import { makeAutoObservable } from "mobx";
import i18n from "i18next";

class LanguageStore {
  constructor() {
    makeAutoObservable(this);
  }

  get currentLanguage() {
    return i18n.language;
  }

  changeLanguage(lng) {
    i18n.changeLanguage(lng);
  }
}

export default new LanguageStore();
