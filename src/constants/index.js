export const API_URL = import.meta.env.VITE_SERVER_URL;
export const OPTIONS_SORT_VALUE = [
  {
    value: "",
    text: "sort by"
  },
  {
    value: "_sort=level",
    text: "Level ASC"
  },
  {
    value: "_sort=-level",
    text: "Level DESC"
  },
  {
    value: "_sort=completed",
    text: "Completed ASC"
  },
  {
    value: "_sort=-completed",
    text: "Completed DESC"
  },
]

export const OPTIONS_COUNT_VALUE = [
  {
    value: "",
    text: "Count",
    disabled: true
  },
  {
    value: "10",
    text: "10"
  },
  {
    value: "20",
    text: "20"
  },
  {
    value: "60",
    text: "60"
  },
  {
    value: "100",
    text: "100"
  },
]

export const OPTIONS_LEVELS_VALUE = [
  {
    value: "",
    text: "Question level",
    disabled: true,
  },
  {
    value: "1",
    text: "1 - easiest"
  },
  {
    value: "2",
    text: "2 - medium"
  },
  {
    value: "3",
    text: "3 - hardest"
  },
]

export const AUTH_STORAGE = "reactCardLogin"
export const THEME_STORAGE = "reactCardTheme"