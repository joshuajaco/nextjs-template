declare module "@next/eslint-plugin-next" {
  import { ConfigWithExtends } from "typescript-eslint";

  const plugin: { flatConfig: { coreWebVitals: ConfigWithExtends } };

  export default plugin;
}
