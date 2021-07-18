import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { omit } from 'lodash';

//formik
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
//route
import { useHistory } from 'react-router-dom';

import { useAlert } from 'react-alert';

//route
import { NavLink } from 'react-router-dom';
//components
import { FormikTextField } from '../components';

//hooks
import { useUserId, useUserAuth, useUserRole, useAccount, useUserType, useSignOut } from '../hooks/userProvider';

//gql
import { useMutation } from '@apollo/client';
import { SET_SIGNUP } from '../graphql/mutations';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    console.log('rebase');
    const classes = useStyles();
    const alert = useAlert();
    const history = useHistory();

    // hooks
    const [role, setRole] = useUserRole();
    const [auth, setAuth] = useUserAuth();
    const [, setUserId] = useUserId();
    const [, setAccount] = useAccount();
    const [userType] = useUserType();

    //gql
    const [SIGNUP] = useMutation(SET_SIGNUP);
    //formik
    const initialValues = {
        firstName: '',
        lastName: '',
        account: '',
        password: '',
        email: '',
    };

    //validation
    const validationSchema = Yup.object().shape({
        password: Yup.string().required('請輸入密碼').min(6, '密碼最少要六個位元'),
    });
    const onSubmit = async (values, action) => {
        try {
            const variables = {
                input: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    account: values.account,
                    password: values.password,
                    email: values.email,
                },
            };
            console.log(variables, action);
            // const { data } = await SIGNUP({ variables: variables });
            // if (!data?.signUp?.id) {
            //     const getData = omit(data.signUp, ['__typename']);
            //     for (const key in getData) {
            //         if (getData[key]) {
            //             throw new Error(getData[key]);
            //         }
            //     }
            // }
            // console.log(data.signUp, 2222);
            // await localStorage.setItem('accessToken', data.signIn.token);
            // setUserId(data.signIn.userId);
            // setRole(data.signIn.role);
            // setAccount(data.signIn.account);
            // setAuth('pass');
        } catch (e) {
            alert.error(e.message);
            console.log(e);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {() => {
                        return (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="姓氏"
                                            autoFocus
                                            component={FormikTextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="名字"
                                            name="lastName"
                                            component={FormikTextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="帳號"
                                            name="account"
                                            component={FormikTextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="密碼"
                                            type="password"
                                            autoComplete="current-password"
                                            component={FormikTextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            type="email"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="信箱"
                                            name="email"
                                            component={FormikTextField}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    註冊
                                </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link href="#" variant="body2" component={NavLink} to={'/signin'}>
                                            已經有帳號了? 登入
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
}
