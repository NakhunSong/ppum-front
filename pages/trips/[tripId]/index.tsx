import { CircularProgress } from '@mui/material';
import MyTrip from 'components/trip/MyTrip';
import { useCheckLoggedIn } from 'hooks/useCheckLoggedIn';

export default function TripPage() {
  const { data } = useCheckLoggedIn()
  if (data) {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <MyTrip />
      </div>
    );
  }
  return <CircularProgress />
}