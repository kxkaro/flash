import { BreakpointOverrides } from "@material-ui/core/styles/createBreakpoints";

// Below module needs to be declared to add 'xxl' breakpoint which is not present in material-ui by default
// Make sure to add the breakpoint witdht in client/src/styles/themes.tsx for each newly defined breakpoint
declare module "@material-ui/core/styles/createBreakpoints" {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        xxl: true;
    }
}