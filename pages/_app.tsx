import type { AppProps /*, AppContext */ } from 'next/app';
import Head from 'next/head';
import Layout from 'components/base/Layout';
import 'styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
