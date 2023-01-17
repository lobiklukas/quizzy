import type { DocumentContext, DocumentInitialProps } from "next/document";
import { Html, Main, NextScript, Head } from "next/document";
import Document from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Quizzy" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <meta name="application-name" content="Quizzy" />
          <meta name="apple-mobile-web-app-title" content="Quizzy" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
}

export default MyDocument;
