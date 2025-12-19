import { useTranslation } from "react-i18next";
import styles from "./PrivacyPolicy.module.scss";

const PrivacyPolicy = () => {
  const { t } = useTranslation("privacy");

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2>{t("section1.title")}</h2>
        <p>{t("section1.content")}</p>
      </section>

      <section className={styles.section}>
        <h2>{t("section2.title")}</h2>
        <p>{t("section2.intro")}</p>
        <ul>
          {(t("section2.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>{item}</li>
            ),
          )}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>{t("section3.title")}</h2>
        <p>{t("section3.intro")}</p>
        <ul>
          {(t("section3.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>{item}</li>
            ),
          )}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>{t("section4.title")}</h2>
        <p>{t("section4.content")}</p>
      </section>

      <section className={styles.section}>
        <h2>{t("section5.title")}</h2>
        <p>{t("section5.content")}</p>
      </section>

      <section className={styles.section}>
        <h2>{t("section6.title")}</h2>
        <p>{t("section6.intro")}</p>
        <ul>
          {(t("section6.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>{item}</li>
            ),
          )}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>{t("section7.title")}</h2>
        <p>{t("section7.content")}</p>
      </section>

      <section className={styles.section}>
        <h2>{t("section8.title")}</h2>
        <p>{t("section8.intro")}</p>
        <p>{t("section8.email")}</p>
      </section>

      <p className={styles.updated}>{t("updated")}</p>
    </div>
  );
};

export default PrivacyPolicy;
