export interface LanguageOption {
  code: string;
  label: string;
}

export const SUBTITLE_LANGUAGES: LanguageOption[] = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "es", label: "Español" },
];

export const DEFAULT_LANGUAGE = SUBTITLE_LANGUAGES[0].code;
