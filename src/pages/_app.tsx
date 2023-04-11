import BaseLayout from "@/layout/BaseLayout";
import "@/styles/globals.css";
import customTextTheme from "@/theme/text";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const mergeTheme = extendTheme(customTextTheme);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={mergeTheme}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
