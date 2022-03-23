import { LogoIcon } from "assets/icons";
import { H1, H2 } from "components/kit";
import styles from "./ErrorBoundary.module.scss";

const ErrorBoundaryContent = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner}>
				<LogoIcon />
				<H1 className={styles.spacer}>
					В работе приложения произошла критическая ошибка
				</H1>
				<H2>Перезагрузите страницу</H2>
			</div>
		</div>
	);
};

export default ErrorBoundaryContent;
