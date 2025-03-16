import { Button } from "@mui/material"
import styles from "./PageNotFound.module.css"
import { Link } from "react-router"
import { Path } from "common/routing/Routing"

export const PageNotFound = () => (
    <main className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>page not found</h2>
        <Button component={Link} to={Path.Login} >Вернутся назад</Button>
    </main>
)