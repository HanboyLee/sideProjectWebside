import React from 'react';
import { TextField } from '@material-ui/core';

const FormikTextField = ({ field, ...props }) => {
    return <TextField {...field} {...props} />;
};

export default FormikTextField;
