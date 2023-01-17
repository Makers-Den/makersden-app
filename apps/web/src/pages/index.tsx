import styles from "../styles/index.module.css";
import { api } from "../utils/api";

export default function Web() {
  const testQuery = api.estimations.testQuery.useQuery();

  return (
    <div className={styles.container} onClick={() => console.log(api)}>
      <h1>{testQuery.data && testQuery.data.data}</h1>
    </div>
  );
}
