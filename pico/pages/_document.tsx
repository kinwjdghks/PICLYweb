import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body>
        <Main />
        <div id='modalroot'></div>
        <div id='alertroot'></div>
        <NextScript />
      </body>
    </Html>
  )
}
