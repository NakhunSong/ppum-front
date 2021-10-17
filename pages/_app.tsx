import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import Layout from 'components/base/Layout'
import Navigation from 'components/base/Navigation'
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'styles/global.scss'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  // const { accessToken } = pageProps
  // useEffect(() => {
  //   if (accessToken) {
  //     queryClient.setQueryData('accessToken', accessToken)
  //   }
  // }, [])
  const [accessToken, setAccessToken] = useState(null)
  useEffect(() => {
    const data = queryClient.getQueryData('accessToken')
    setAccessToken(data)
  })
  return (
   <QueryClientProvider client={queryClient}>
    <Layout>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0fa94e46e0de5881de8ccdf1e9fb52ce&libraries=services,clusterer,drawing"
        />
      </Head>
      <Component {...pageProps} />
      {accessToken && (
        <Navigation />
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </Layout>
   </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const { ctx } = appContext
  const { req } = ctx
  let accessToken

  if (req) {
    const { cookies = {} } = req
    const { accessToken: token } = cookies
    if (token) {
      accessToken = token
    }
  }

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      accessToken,
    }
  }
}

export default MyApp
