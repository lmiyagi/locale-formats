const localesArray = ["af-ZA", "am-ET", "ar-AE", "ar-BH", "ar-DZ", "ar-EG", "ar-IQ", "ar-JO", "ar-KW", "ar-LB", "ar-LY", "ar-MA", "arn-CL", "ar-OM", "ar-QA", "ar-SA", "ar-SD", "ar-SY", "ar-TN", "ar-YE", "as-IN", "az-az", "az-Cyrl-AZ", "az-Latn-AZ", "ba-RU", "be-BY", "bg-BG", "bn-BD", "bn-IN", "bo-CN", "br-FR", "bs-Cyrl-BA", "bs-Latn-BA", "ca-ES", "co-FR", "cs-CZ", "cy-GB", "da-DK", "de-AT", "de-CH", "de-DE", "de-LI", "de-LU", "dsb-DE", "dv-MV", "el-CY", "el-GR", "en-029", "en-AU", "en-BZ", "en-CA", "en-cb", "en-GB", "en-IE", "en-IN", "en-JM", "en-MT", "en-MY", "en-NZ", "en-PH", "en-SG", "en-TT", "en-US", "en-ZA", "en-ZW", "es-AR", "es-BO", "es-CL", "es-CO", "es-CR", "es-DO", "es-EC", "es-ES", "es-GT", "es-HN", "es-MX", "es-NI", "es-PA", "es-PE", "es-PR", "es-PY", "es-SV", "es-US", "es-UY", "es-VE", "et-EE", "eu-ES", "fa-IR", "fi-FI", "fil-PH", "fo-FO", "fr-BE", "fr-CA", "fr-CH", "fr-FR", "fr-LU", "fr-MC", "fy-NL", "ga-IE", "gd-GB", "gd-ie", "gl-ES", "gsw-FR", "gu-IN", "ha-Latn-NG", "he-IL", "hi-IN", "hr-BA", "hr-HR", "hsb-DE", "hu-HU", "hy-AM", "id-ID", "ig-NG", "ii-CN", "in-ID", "is-IS", "it-CH", "it-IT", "iu-Cans-CA", "iu-Latn-CA", "iw-IL", "ja-JP", "ka-GE", "kk-KZ", "kl-GL", "km-KH", "kn-IN", "kok-IN", "ko-KR", "ky-KG", "lb-LU", "lo-LA", "lt-LT", "lv-LV", "mi-NZ", "mk-MK", "ml-IN", "mn-MN", "mn-Mong-CN", "moh-CA", "mr-IN", "ms-BN", "ms-MY", "mt-MT", "nb-NO", "ne-NP", "nl-BE", "nl-NL", "nn-NO", "no-no", "nso-ZA", "oc-FR", "or-IN", "pa-IN", "pl-PL", "prs-AF", "ps-AF", "pt-BR", "pt-PT", "qut-GT", "quz-BO", "quz-EC", "quz-PE", "rm-CH", "ro-mo", "ro-RO", "ru-mo", "ru-RU", "rw-RW", "sah-RU", "sa-IN", "se-FI", "se-NO", "se-SE", "si-LK", "sk-SK", "sl-SI", "sma-NO", "sma-SE", "smj-NO", "smj-SE", "smn-FI", "sms-FI", "sq-AL", "sr-BA", "sr-CS", "sr-Cyrl-BA", "sr-Cyrl-CS", "sr-Cyrl-ME", "sr-Cyrl-RS", "sr-Latn-BA", "sr-Latn-CS", "sr-Latn-ME", "sr-Latn-RS", "sr-ME", "sr-RS", "sr-sp", "sv-FI", "sv-SE", "sw-KE", "syr-SY", "ta-IN", "te-IN", "tg-Cyrl-TJ", "th-TH", "tk-TM", "tlh-QS", "tn-ZA", "tr-TR", "tt-RU", "tzm-Latn-DZ", "ug-CN", "uk-UA", "ur-PK", "uz-Cyrl-UZ", "uz-Latn-UZ", "uz-uz", "vi-VN", "wo-SN", "xh-ZA", "yo-NG", "zh-CN", "zh-HK", "zh-MO", "zh-SG", "zh-TW", "zu-ZA"]

const tableBody = document.querySelector("#localesTable tbody");

localesArray.forEach(localeCode => {
  try {
    const locale = new Intl.Locale(localeCode);
    const row = tableBody.insertRow();
    const nameCell = row.insertCell();
    const codeCell = row.insertCell();
    const timeFormatCell = row.insertCell();
    const firstDayOfWeekCell = row.insertCell();
    const fractionSeparatorCell = row.insertCell();

    nameCell.textContent = new Intl.DisplayNames([localeCode], { type: 'language' }).of(localeCode);
    codeCell.textContent = locale.baseName;

    // Time Format (24-hour or AM/PM)
    const options = { hour: 'numeric', hour12: undefined }; // Let the locale decide
    const formattedTime = new Intl.DateTimeFormat(locale, options).format(new Date());
    timeFormatCell.textContent = formattedTime.includes("AM") || formattedTime.includes("PM") ? "AM/PM" : "24-hour";

    // First Day of the Week (Corrected - Using getWeekInfo())
    const weekInfo = locale.getWeekInfo();
    const firstDayOfWeek = weekInfo.firstDay;
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    firstDayOfWeekCell.textContent = dayNames[firstDayOfWeek - 1];


    // Fraction Separator (No Change)
    const largeNumber = 1234567.89;
    fractionSeparatorCell.textContent = largeNumber.toLocaleString(locale);

  } catch (error) {
    console.error(`Error processing locale ${localeCode}:`, error);
    const row = tableBody.insertRow();
    const nameCell = row.insertCell();
    nameCell.colSpan = 5; // Corrected colspan
    nameCell.textContent = `Error processing locale ${localeCode}`;
  }
});
