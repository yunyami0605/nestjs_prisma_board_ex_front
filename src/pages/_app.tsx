import BaseLayout from "@/layout/BaseLayout";
import "@/styles/globals.css";
import customTextTheme from "@/theme/text";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const mergeTheme = extendTheme(customTextTheme);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={mergeTheme}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ChakraProvider>
  );
}
