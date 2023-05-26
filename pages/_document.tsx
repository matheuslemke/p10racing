import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head title="P10 Racing">
          <meta
            name="description"
            content="P10 da rapaziada. Bora apostar no primeiro a se retirar da corrida e no décimo colocado."
          />
        </Head>
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
