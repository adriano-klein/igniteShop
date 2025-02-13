import { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '../styles';

// NOTE: Tudo que colocarmos aqui será carregado em TODAS as páginas da aplicação.
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}