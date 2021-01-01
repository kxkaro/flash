import React from "react";
// import { Img } from "react-image";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import { Grid, Paper, Button, Typography, Hidden } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { withValidationList } from "../../utils/withValidation";
import { Mode, Children } from "../../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.primary.main,
      width: "50%",
      minWidth: "400px",
      margin: "0 auto",
    },
    button: {
      marginTop: "35px",
      width: "100%",
    },
    center: {
      margin: "1em auto",
    },
  })
);

// const EmailValidator = _;
// TODO: add a mechanism from router to make sure user wants to close the window if the forms are partially filled but not submitted
interface Props {
  mode: Mode;
  initialValues: object;
  onSubmit?: any;
  validate?: any;
  validationSchema?: any;
  children: any;
  child?: any;
}

/* 
    Raw form to use in components with paper.
    Provide either validate or validationSchema
*/
// TODO: handle providing both validate and validationSchema / provide validate as a function
export const AppForm = ({
  mode,
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: Props) => {
  const classes = useStyles();

  // Disable submit button if errors appear, enable if all input values meet validation criteria
  // const [submitDisabled, setDisabled] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // validate={validate}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => {
        return (
          <Form>
            <Grid item>
              {/* 
                            [].flat applied as 'children' might be an array of components (Login, Register) or a single component (Logout) 
                            Extra check if child is not undefined as the Login form includes 'undefined' in place of other fields from "Register" page.
                            TODO: Consider changing this behavior in the auth form for "login"
                        */}
              {withValidationList(children, errors, touched)}

              <Button
                // disabled={submitDisabled}
                disabled={false}
                variant={mode === "dark" ? "outlined" : "contained"}
                color={mode === "dark" ? undefined : "primary"}
                type="submit"
                className={classes.button}
              >
                Submit
              </Button>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

interface GridFormProps {
  children: Children;
  title?: string;
  error?: string;
}

// Centered form wrapped in a grid on paper
export const AppFormLayout = ({ children, title, error }: GridFormProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row" spacing={2}>
        <Hidden smDown>
          <Grid item md={6}>
            {/* <Img alt="form-img" className={classes.image} src={image} /> */}
          </Grid>
        </Hidden>

        <Grid
          container
          direction="column"
          justify="space-evenly"
          item
          xs={12}
          md={6}
        >
          {title && (
            <Grid item>
              <Typography align="center" variant="h4" gutterBottom>
                {title}
              </Typography>
            </Grid>
          )}

          {error && (
            <Grid item>
              <Alert
                variant="filled"
                severity="error"
                className={classes.center}
              >
                {error}
              </Alert>
            </Grid>
          )}

          {children}
        </Grid>
      </Grid>
    </Paper>
  );
};
