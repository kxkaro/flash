import React from "react";
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({

//     })
// );


export const TVIcon = (props: SvgIconProps) => {
    // const classes = useStyles();

    return (
        <SvgIcon {...props}>
            <path d="M22 4v12h-20v-12h20zm2-2h-24v16h24v-16zm-17.836 5h5.673v1.418h-2.01v4.582h-1.653v-4.582h-2.01v-1.418zm9.961 0l-1.158 3.653-1.151-3.653h-1.701l1.942 6h1.792l1.986-6h-1.71zm-9.125 13c1 1.194 2.862 2 5 2s4-.806 5-2h-10z"/>
        </SvgIcon>
    );
};