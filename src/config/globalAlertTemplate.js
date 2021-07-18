'use strict';
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { CheckCircle, HighlightOffSharp, InfoSharp, DeleteForeverSharp } from '@material-ui/icons';
import {
    Box,
    DialogContentText,
    Button,
    Dialog,
    DialogTitle as MuiDialogTitle,
    DialogContent as MuiDialogContent,
    DialogActions as MuiDialogActions,
    Typography,
    Divider,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleText: {
        display: 'inline',
        fontSize: '2rem',
    },
    iconStyle: {
        display: 'inline',
        position: 'relative',
        top: 5,
    },
}));
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    alertTitle: {
        background: theme.palette.grey[200],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, typename } = props;
    // console.log(other);
    const classesBase = clsx(classes.root, classes.alertTitle);
    return (
        <MuiDialogTitle disableTypography className={classesBase}>
            <Typography color={typename} variant="h6">
                {children}
            </Typography>
            {/* {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null} */}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minWidth: '25rem',
        maxWidth: '30rem',
        minHeight: '10rem',
        maxHeight: '15rem',
    },
}))(MuiDialogContent);

const CustomButton = withStyles((theme) => ({
    root: {
        background: theme.palette.grey[200],
        color: '#f30',
    },
}))(Button);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export const CustomizedDialogs = ({ close, message, options }) => {
    const classes = useStyles();
    options.Icon = { succuss: CheckCircle, error: HighlightOffSharp, info: InfoSharp, remove: DeleteForeverSharp };
    // console.log(options);

    const iconComponent = (option) => {
        const Icon = option.Icon[option.type];
        return (
            <Box marginX={3} className={classes.iconStyle}>
                <Icon style={{ fontSize: '2rem' }} />
            </Box>
        );
    };
    return (
        <div>
            <Dialog open={true} keepMounted onClose={close} aria-labelledby="customized-dialog-title">
                <DialogTitle typename={options.type} id="alert-dialog-slide-title">
                    {iconComponent(options)}
                    <Typography className={classes.titleText}>{options.type.toUpperCase()}</Typography>
                </DialogTitle>

                <Divider />
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {console.log(message)}
                        {message?.split(':')[1] || message}
                    </DialogContentText>
                </DialogContent>

                {/* <DialogActions>
                    {options.actions &&
                        options.actions.map((action, index) => (
                            <Button
                                onClick={() => {
                                    action.onClick();
                                    close();
                                }}
                                color="primary"
                                key={index}
                            >
                                {action.copy}
                            </Button>
                        ))}
                </DialogActions> */}
                <Divider />
                <CustomButton autoFocus onClick={close}>
                    關閉
                </CustomButton>
            </Dialog>
        </div>
    );
};
