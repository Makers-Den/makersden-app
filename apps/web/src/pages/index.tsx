import { Button, ThemeProvider } from "ui";
import { EstimationDetails } from "ui/src/components/estimations/EstimationDetails";
import styles from "../styles/index.module.css";

export default function Web() {
  return (
    <div className={styles.container}>
      <ThemeProvider isSSR>
        <Button text="123" />
        <EstimationDetails />
      </ThemeProvider>
    </div>
  );
}
