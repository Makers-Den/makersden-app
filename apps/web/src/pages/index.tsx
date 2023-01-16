import styles from "../styles/index.module.css";
import { api, type RouterOutputs } from "../utils/api";

console.log(api);

export default function Web() {
  const x = api.estimations.testQuery.useQuery();
  console.log(x.data)

  return (
    <div className={styles.container} onClick={() => console.log(api)}>
      <h1>{x.data && x.data.data}</h1>
    </div>
  );
}
