import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
          <link href='https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;1,400&display=swap' rel='stylesheet' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' type='image/png' href='/ks.png' />
          <link rel='icon' href='/ks.png' />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body className='bg-white text-black'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
