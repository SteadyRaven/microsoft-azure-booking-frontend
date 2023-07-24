import { SkeletonItem, makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
    formRow: {
        alignItems: "center",
        display: "grid",
        paddingBottom: "10px",
        position: "relative",
        ...shorthands.gap("30px"),
        gridTemplateColumns: "48% 48%"
    },
    inputPadding: {
        paddingBottom: "10px",
    },
})

const FormBodySkeleton = () => {
    const styles = useStyles();
    return (
    <>
      <div className={styles.formRow}>
        
          <SkeletonItem size={32} />

          <SkeletonItem size={32} />
      </div>
      <div className={styles.formRow}>
        <div>
          <div className={styles.inputPadding}>
            <SkeletonItem size={32} />
          </div>
          <div className={styles.inputPadding}>
            <SkeletonItem size={32} />
          </div>
          <div className={styles.inputPadding}>
            <SkeletonItem size={32} />
          </div>
        </div>
        <div className={styles.inputPadding}>
          <SkeletonItem size={96} />
        </div>
      </div>
    </>
  )
}

export default FormBodySkeleton;