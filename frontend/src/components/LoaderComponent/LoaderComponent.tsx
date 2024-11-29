import styles from "./LoaderComponent.module.css";

export const LoaderComponent = () => {
  return (
    <div className="bg-primary-dark-900 w-screen h-screen flex flex-col gap-6 justify-center items-center">
      <div className={styles.loader}>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
      </div>

      <p
        className={`text-2xl text-gray-800 tracking-[3px] ${styles.textLoader}`}
      >
        -- Loading --
      </p>
    </div>
  );
};
