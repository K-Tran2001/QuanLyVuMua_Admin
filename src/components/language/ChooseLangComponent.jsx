import * as React from "react";
import langs from "langs";
import * as countryFlags from "country-flags-svg";
import { MainContext } from "../../context/MainContext";
import Input from "../../components/form/input/InputField";

export default function ChooseLangComponent() {
  const context = React.useContext(MainContext);
  const { getDataTranslate } = context;
  const [selectedLanguage, setSelectedlanguage] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const [filterlanguages, setFilterLanguages] = React.useState([]);
  const [expand, setExpand] = React.useState(false);
  const changeLanguage = (newLang) => {
    document.documentElement.lang = newLang.code;
    //window.location.href = `/folders`;
    localStorage.setItem("prefered_local", newLang.code);
    getDataTranslate();
  };
  const [keysearch, setKeysearch] = React.useState("");
  const getAlllanguage = () => {
    const languages = langs.all().map((language) => {
      const languageCode = language["1"];
      const languageName = language.name;
      const countryCode = language["1"].toLowerCase();
      const flagUrl = countryFlags?.findFlagUrlByNationality(languageName);
      return {
        code: languageCode,
        name: languageName,
        flag:
          languageCode == "en"
            ? "https://www.shutterstock.com/image-vector/flag-united-kingdom-vector-260nw-1706586214.jpg"
            : flagUrl,
        //flag: `https://unpkg.com/language-icons@0.3.0/icons/${languageCode}.svg`,
      };
    });
    setLanguages(languages.filter((lang) => lang.flag != ""));
    setFilterLanguages(languages.filter((lang) => lang.flag != ""));
  };
  const getLanguageByCode = (code) => {
    const language = langs.all().find((lang) => lang["1"] == code);
    if (language != null) {
      const languageCode = language["1"];
      const languageName = language.name;
      const countryCode = language["1"].toLowerCase();
      const flagUrl = countryFlags?.findFlagUrlByNationality(languageName);
      const currentLang = {
        code: languageCode,
        name: languageName,
        flag:
          languageCode == "en"
            ? "https://www.shutterstock.com/image-vector/flag-united-kingdom-vector-260nw-1706586214.jpg"
            : flagUrl,
        //flag: `https://unpkg.com/language-icons@0.3.0/icons/${code}.svg`,
      };
      setSelectedlanguage(currentLang);
      localStorage.setItem("prefered_local", currentLang.code);
    }
  };
  React.useEffect(() => {
    getAlllanguage();
    getLanguageByCode(localStorage.getItem("prefered_local") || "en");
  }, []);
  return (
    <div className=" relative">
      <div
        id="states-button"
        className=" w-full flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
        onClick={() => setExpand(!expand)}
      >
        <img
          src={selectedLanguage?.flag}
          className="w-4 h-4 mr-2"
          alt="Vietnam free icon"
        />
        {selectedLanguage?.name}
      </div>
      {expand && (
        <div className="absolute mt-1 ">
          <Input
            value={keysearch}
            onChange={(e) => {
              const keysearchValue = e.target.value;
              setKeysearch(keysearchValue);

              var copyLang = [...languages];
              var filterLang = copyLang.filter((lang) =>
                lang?.name?.includes(keysearchValue)
              );
              setFilterLanguages(
                keysearchValue?.length === 0 ? [...languages] : filterLang
              );
            }}
          />
          <div className="z-100 w-full  bg-white divide-y divide-gray-100 rounded-lg shadow  max-h-[150px] overflow-x-hidden custom-scrollbar">
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="states-button"
            >
              {filterlanguages.length > 0 &&
                filterlanguages?.map((lang) => (
                  <li
                    key={Math.random()}
                    className="px-4"
                    onClick={() => {
                      changeLanguage(lang);
                      setSelectedlanguage(lang);
                      setExpand(false);
                    }}
                  >
                    <div className="inline-flex items-center">
                      <img
                        src={lang.flag}
                        className="w-4 h-4 mr-2"
                        alt="Vietnam free icon"
                      />
                      {lang.name}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
