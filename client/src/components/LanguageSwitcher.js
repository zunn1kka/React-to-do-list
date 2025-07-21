import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { Dropdown } from "react-bootstrap";

const LanguageSwitcher = observer(() => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: "en", name: "English", flag: "GB" },
    { code: "ru", name: "Русский", flag: "RU" },
  ];

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-language">
        <ReactCountryFlag
          countryCode={i18n.language === "en" ? "GB" : "RU"}
          svg
          style={{ width: "20px", marginRight: "5px" }}
        />
        {i18n.language === "en" ? "English" : "Русский"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languages.map((lang) => (
          <Dropdown.Item
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            active={i18n.language === lang.code}
          >
            <ReactCountryFlag
              countryCode={lang.flag}
              svg
              style={{ width: "20px", marginRight: "5px" }}
            />
            {lang.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default LanguageSwitcher;
