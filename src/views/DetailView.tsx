// Help with importing/exporting components: https://react.dev/learn/importing-and-exporting-components 
// useParams from https://reactrouter.com/api/hooks/useParams 
import { useParams } from "react-router";

export default function DetailView() {
  let params = useParams();
  return <h1> Detail View for meal {params.id}</h1>;
}