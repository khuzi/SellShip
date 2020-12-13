// import React from "react";
// import Document, { Html, Head, Main, NextScript } from "next/document";

// import { ServerStyleSheets } from "@material-ui/core/styles";

// import { ServerStyleSheet as ServerStyleComponents } from "styled-components";

// class MyDocument extends Document {
//   render() {
//     return (
//       <Html>
//         <Head>
//           <link rel="icon" href="/favicon.ico" />
//           <meta name="theme-color" content="#000000" />
//           <meta
//             name="description"
//             content="Buy and Sell Anything Instantly. Easily Buy & Sell New or Pre-loved Items from Buyers Near You. List Instantly in less than 30 secs and make offers from cars, electronics, fashion and more."
//           />
//           <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
//           <link rel="manifest" href="/manifest.json" />
//           <script
//             src="https://unpkg.com/react/umd/react.production.min.js"
//             crossOrigin="true"
//           ></script>

//           <script
//             async
//             src="https://www.googletagmanager.com/gtag/js?id=G-9VZSLWZRX2"
//           ></script>
//           {typeof window !== "undefined" && (
//             <script
//               dangerouslySetInnerHTML={{
//                 __html: `
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments)}
//           gtag('js', new Date());
//           gtag('config', 'G-9VZSLWZRX2');
//             `,
//               }}
//             />
//           )}
//           <script
//             src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
//             crossOrigin="true"
//           ></script>

//           <script
//             src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
//             crossOrigin="true"
//           ></script>

//           <link
//             rel="stylesheet"
//             href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
//             integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
//             crossOrigin="anonymous"
//           />
//           <script type="text/javascript" type="module" src="./"></script>
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//         <script
//           data-ad-client="ca-pub-9959700192389744"
//           async
//           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
//         ></script>
//       </Html>
//     );
//   }
// }

// // `getInitialProps` belongs to `_document` (instead of `_app`),
// // it's compatible with server-side generation (SSG).
// MyDocument.getInitialProps = async (ctx) => {
//   // Resolution order
//   //
//   // On the server:
//   // 1. app.getInitialProps
//   // 2. page.getInitialProps
//   // 3. document.getInitialProps
//   // 4. app.render
//   // 5. page.render
//   // 6. document.render
//   //
//   // On the server with error:
//   // 1. document.getInitialProps
//   // 2. app.render
//   // 3. page.render
//   // 4. document.render
//   //
//   // On the client
//   // 1. app.getInitialProps
//   // 2. page.getInitialProps
//   // 3. app.render
//   // 4. page.render

//   // Render app and page and get the context of the page with collected side effects.
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//     });

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,
//     // Styles fragment is rendered after the app and page rendering finish.
//     styles: [
//       ...React.Children.toArray(initialProps.styles),
//       sheets.getStyleElement(),
//     ],
//   };
// };

// export default MyDocument;

import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Buy and Sell Anything Instantly. Easily Buy & Sell New or Pre-loved Items from Buyers Near You. List Instantly in less than 30 secs and make offers from cars, electronics, fashion and more."
          />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <script
            src="https://unpkg.com/react/umd/react.production.min.js"
            crossOrigin="true"
          ></script>

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-9VZSLWZRX2"
          ></script>
          {typeof window !== "undefined" && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'G-9VZSLWZRX2');
            `,
              }}
            />
          )}
          <script
            src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
            crossOrigin="true"
          ></script>

          <script
            src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossOrigin="true"
          ></script>

          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          />
          <script type="text/javascript" type="module" src="./"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script
          data-ad-client="ca-pub-9959700192389744"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
      </Html>
    );
  }
}
