import * as createMuiTheme from '@material-ui/core/styles/defaultTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface ThemeOptions  {
        shape: Sha;
        breakpoints: Breakpoints;
        direction: Direction;
        mixins: Mixins;
        overrides?: Overrides;
        palette: Palette;
        props?: ComponentsProps;
        shadows: Shadows;
        spacing: Spacing;
        transitions: Transitions;
        typography: Typography;
        zIndex: ZIndex;
        // Extend Theme type by fontSizes
        fontSizes: {
            primary: string,
            secondary: string,
            tertiary: string,
            quaternary: string,
            quinary: string,
            senary: string,
            septonary: string,
            octonary: string,
        }
    }
    
    interface Theme  {
        shape: Sha;
        breakpoints: Breakpoints;
        direction: Direction;
        mixins: Mixins;
        overrides?: Overrides;
        palette: Palette;
        props?: ComponentsProps;
        shadows: Shadows;
        spacing: Spacing;
        transitions: Transitions;
        typography: Typography;
        zIndex: ZIndex;
        // Extend Theme type by fontSizes
        fontSizes: {
            primary: string,
            secondary: string,
            tertiary: string,
            quaternary: string,
            quinary: string,
            senary: string,
            septonary: string,
            octonary: string,
        }
    }
}