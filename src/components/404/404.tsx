import { LogoIcon } from "assets/icons";
import { Button, H1, Text } from "components/kit";
import { useNavigate } from "react-router-dom";
import styles from "./404.module.scss";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner}>
				<LogoIcon />
				<H1 className={styles.spacer}>404: Not Found</H1>
				<Button className={styles.resizer} onClick={() => navigate("/")}>
					<Text isMedium>На главную</Text>
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
