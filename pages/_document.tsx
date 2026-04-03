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
          <link rel='apple-touch-icon' type='image/png' href='/ks.png' />
          <link rel='icon' href='/ks.png' />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body className='bg-white text-black antialiased' style={{
          textRendering: 'optimizeLegibility',
        }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
