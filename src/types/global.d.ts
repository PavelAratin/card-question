interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
// Для CSS модулей
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.js' {
  const content: any;
  export default content;
}
declare module '*.jsx' {
  const content: any;
  export default content;
}
declare module '*.svg' {
  const src: string;
  export default src;
}