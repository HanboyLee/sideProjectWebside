import React from 'react';
import { Avatar, Button, CssBaseline, Link, Grid, Typography, Container, makeStyles } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { useAlert } from 'react-alert';

//Icons
import { LockOutlined } from '@material-ui/icons';

//components
import { FormikTextField } from '../components';

//route
import { NavLink, useHistory } from 'react-router-dom';

// gql
import { SET_SIGNIN } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

//hooks
import { useUserId, useUserAuth, useUserRole, useAccount, useUserType, useSignOut } from '../hooks/userProvider';

//styles
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = () => {
    // hooks
    const alert = useAlert();
    const [role, setRole] = useUserRole();
    const [auth, setAuth] = useUserAuth();
    const [, setUserId] = useUserId();
    const [, setAccount] = useAccount();
    const [userType] = useUserType();
    const signOut = useSignOut();

    //styles
    const classes = useStyles();

    //route
    console.log(123);
    const history = useHistory();

    //gql
    const [SIGNIN] = useMutation(SET_SIGNIN);
    //formik
    const initialValues = {
        account: '',
        password: '',
    };

    React.useEffect(() => {
        if (auth === 'pass' && role) {
            history.push(`/${userType}/`);
        }
    }, [auth, role, userType, history]);

    //funtions
    const onSubmit = async (values, action) => {
        try {
            action.setSubmitting(true);
            // console.log(values, 'values');
            // console.log(action, 'action');
            const variables = { ...values };

            const { data } = await SIGNIN({ variables });
            await localStorage.setItem('accessToken', data.signIn.token);
            setUserId(data.signIn.userId);
            setRole(data.signIn.role);
            setAccount(data.signIn.account);
            setAuth('pass');
        } catch (e) {
            alert.error(e.message);
            action.setSubmitting(false);
            console.log(e);
        }

        // action.resetForm();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    登入
                </Typography>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {() => {
                        return (
                            <Form className={classes.form}>
                                <Field
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="帳號"
                                    name="account"
                                    autoFocus
                                    component={FormikTextField}
                                />
                                <Field
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="密碼"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    component={FormikTextField}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    登入
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            忘記密碼?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" to={'/signup'} component={NavLink} variant="body2">
                                            {'沒有帳號嗎？ 申請帳號'}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </Container>
    );
};

export default SignIn;
