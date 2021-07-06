import type { AppProps /*, AppContext */ } from 'next/app';
import Layout from 'components/base/Layout';
import 'styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
