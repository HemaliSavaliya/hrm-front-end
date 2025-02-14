export const formStyles = (theme) => ({
    // Input label styles
    inputLabel: {
        '& .MuiInputLabel-root': {
            fontSize: 14,
            color: theme.palette.mode === 'light' ? 'grey' : '#bdbdbd',
            '&.Mui-focused': {
                fontWeight: 600,
                color: theme.palette.mode === 'light' ? '#000' : '#fff',
            },
            '&.MuiFormLabel-filled': {
                fontWeight: 600,
                color: theme.palette.mode === 'light' ? '#000' : '#fff',
            },
        },
    },

    // Input field styles
    inputField: {
        borderRadius: '5px',
        border: `1px solid ${theme.palette.mode === 'light' ? '#d4d3d5' : '#777586'}`,
        "& .MuiFilledInput-root": {
            backgroundColor: 'transparent !important',
            "&:before": {
                borderBottom: "none !important"
            },
            "&::after": {
                borderBottom: "none !important"
            }
        },
    },

    // Input field styles for dropdown
    inputFieldDrop: {
        backgroundColor: 'transparent !important',
        border: `1px solid ${theme.palette.mode === 'light' ? '#d4d3d5' : '#777586'}`,
        borderRadius: '5px',
        "&:before": {
            borderBottom: "none !important"
        },
        "&::after": {
            borderBottom: "none !important"
        },
        "& .MuiFilledInput-input": {
            fontSize: 14
        },
    },

    // Input label styles for dropdown label
    inputLabelDrop: {
        fontSize: 14,
        color: theme.palette.mode === 'light' ? 'grey' : '#bdbdbd',
        '&.Mui-focused': {
            fontWeight: 600,
            color: theme.palette.mode === 'light' ? '#000' : '#fff',
        },
        '&.MuiFormLabel-filled': {
            fontWeight: 600,
            color: theme.palette.mode === 'light' ? '#000' : '#fff',
        },
    },
});

export const saveButton = {
    fontSize: '13px',
    textTransform: 'capitalize',
    padding: '12px 20px !important',
    lineHeight: '10px',
    marginRight: '10px',
}

export const cancelButton = {
    fontSize: '13px',
    textTransform: 'capitalize',
    padding: '12px 20px !important',
    lineHeight: '10px',
}
