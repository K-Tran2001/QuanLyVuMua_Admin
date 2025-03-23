import { useState } from "react";

const languages = [
  {
    code: "vi",
    label: "Tiếng Việt",
    flag: "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",
  },
  {
    code: "en",
    label: "English",
    flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
  },
];

const Select = ({ lang, callback }) => {
  const [selectedLang, setSelectedLang] = useState(lang || "vi");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code) => {
    setSelectedLang(code);
    callback(code);
    setIsOpen(false);
  };

  return (
    <div className="select-container">
      <button onClick={() => setIsOpen(!isOpen)} className="select-button">
        <div className="selected-lang">
          <img
            src={languages.find((l) => l.code === selectedLang).flag}
            alt={selectedLang}
            className="flag-icon"
          />
          {languages.find((l) => l.code === selectedLang).label}
        </div>
        <span className="dropdown-icon">▼</span>
      </button>
      {isOpen && (
        <ul className="select-dropdown">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="dropdown-item"
            >
              <img src={lang.flag} alt={lang.label} className="flag-icon" />
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
