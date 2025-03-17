import { SyntheticEvent, useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { selectAppError, setAppError } from 'app/appSlice'


export const ErrorSnackbar = () => {
    const error = useAppSelector(selectAppError);
    const dispatch = useAppDispatch();

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError({ error: null }))
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    )
}