import { CircularProgress } from "@mui/material";
import TripSelectSection from "components/trip/TripSelectSection";
import { useCheckLoggedIn } from "hooks/useCheckLoggedIn";

export default function Trips() {
  const { data } = useCheckLoggedIn()
  if (data) {
    return (
      <TripSelectSection />
    )
  }
  return <CircularProgress />
}