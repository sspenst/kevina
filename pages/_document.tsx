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
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' type='image/png' href='/duck.png' />
          <link rel='icon' href='/duck.png' />
          <meta name='theme-color' content='#60a5fa' />
        </Head>
        <body className='text-black' style={{
          backgroundColor: '#71bd8c',
        }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
