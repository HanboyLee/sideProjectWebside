import React from 'react';
import clsx from 'clsx';
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
//icon
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';

//components
import { SignIn, Signup } from '../pages';

//router
import { Switch, Route, NavLink } from 'react-router-dom';

//hooks
import { useSignOut, useUserAuth } from '../hooks/userProvider';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    memberBox: {
        right: 0,
        position: 'absolute',
        // ss(xx) {
        //     console.log(theme, 'theme');
        //     console.log(xx, 'props');
        // },
    },
    login: {
        padding: theme.spacing(2),
        boxShadow: theme.shadows[10],
    },
}));

const MiniDrawer = ({ routes }) => {
    const [open, setOpen] = React.useState(false);

    //hooks
    const [auth] = useUserAuth();
    const signOut = useSignOut();
    //styles
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            {/* Topbar */}
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        ＤＺ&
                    </Typography>
                    <Box className={classes.memberBox}>
                        {auth !== 'pass' ? (
                            <ListItem button className={classes.login} to="/signin" component={NavLink} color="inherit">
                                會員登入
                            </ListItem>
                        ) : (
                            <ListItem button className={classes.login} color="inherit" onClick={() => signOut()}>
                                會員登出
                            </ListItem>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {routes.map(({ to, id, Icon, title }) => (
                        <ListItem to={to} key={id} component={NavLink} button>
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    {routes.map(({ id, path, exact, Component }) => {
                        return (
                            <Route
                                key={id}
                                path={path}
                                exact={exact}
                                // render={(props) => <Component {...props} />}
                                component={Component}
                            />
                        );
                    })}
                    <Route exact={true} path={'/signin'} component={SignIn} />
                    <Route exact={true} path={'/signup'} component={Signup} />
                </Switch>
            </main>
        </div>
    );
};

export default MiniDrawer;
