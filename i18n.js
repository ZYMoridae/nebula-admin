import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "more": "More",
      "recommend_for_you": "Recommend For You",
      "todays_deal": "Today's Deal",
      "featured_products": "Featured Products",
      "login_btn": "Login",
      "max_studio": "Max Studio"
    }
  },
  cn: {
    translation: {
      "more": "更多",
      "recommend_for_you": "每日推荐",
      "todays_deal": "今日特卖",
      "featured_products": "精选好物",
      "login_btn": "登录",
      "max_studio": "Max Studio"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "cn",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
