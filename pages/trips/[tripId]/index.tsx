import Head from 'next/head';
import MyTrip from 'components/trip/MyTrip';

export default function TripPage() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0fa94e46e0de5881de8ccdf1e9fb52ce&libraries=services,clusterer,drawing"
        />
      </Head>
      <MyTrip />
    </div>
  );
}