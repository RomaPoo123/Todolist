import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import { selectThemeMode } from 'app/appSelector'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { getTheme } from 'common/theme/theme'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from "./Login.module.css"
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { loginTC } from 'features/auth/model/auth-reducer'
import { selectIsLoggedin } from 'features/auth/model/authSelectors'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Path } from 'common/routing/Routing'
import { zodResolver } from "@hookform/resolvers/zod"
import { Inputs, loginSchema } from 'features/auth/lib/schemas/loginSchema'


// export type LoginInputs = {
//     email: string
//     password: string
//     rememberMe: boolean
//     captcha?: string,
// }

export const Login = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLoggedin = useAppSelector(selectIsLoggedin);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "", rememberMe: false } })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(loginTC(data))
        reset();
    }

    useEffect(() => {
        if (isLoggedin) {
            navigate(Path.Main)
        }
    }, [isLoggedin])


    return (
        <Grid container justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>
                        To login get registered
                        <a
                            style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                            href="https://social-network.samuraijs.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>
                        <b>Email:</b> free@samuraijs.com
                    </p>
                    <p>
                        <b>Password:</b> free
                    </p>
                </FormLabel>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <TextField label="Email" margin="normal" error={!!errors.email} {...register('email')} />
                        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                        <TextField type="password" label="Password" margin="normal" error={!!errors.email} {...register('password')} />
                        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
                        <FormControlLabel label="RememberMe" control={
                            <Controller
                                name={'rememberMe'}
                                control={control}
                                render={({ field: { value, ...field } }) => (
                                    <Checkbox {...field} checked={value} />
                                )}
                            />
                        } />

                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    )
}