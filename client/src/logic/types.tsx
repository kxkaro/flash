import { ReactChild, ReactChildren } from "react";

type Children = ReactChild | ReactChildren | Array<ReactChild> | undefined;
type Mode = "light" | "dark" | undefined;
type DrawerVariant = "persistent" | "temporary";
type Input =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

type Color =
  | "inherit"
  | "disabled"
  | "action"
  | "primary"
  | "secondary"
  | "error"
  | undefined;

type User =
  | {
      _id: string;
      email: string;
      publicName: string;
      darkMode: boolean | undefined;
    }
  | undefined;

interface Dimension {
  key: string;
  text: string;
  shortText?: string;
}

interface Measure {
  value: string;
  unit?: string;
}

interface ImgSrc {
  src: string;
  fallback?: string;
}

interface Value {
  name: string;
  primary?: number; // Provide already with units, prefix, suffix, e.g. '$ 234 K'
  primaryFormatted?: string; // Provide already with units, prefix, suffix, e.g. '$ 234 K'
  primaryReference?: number;
  primaryReferenceFormatted?: string;
  primaryDelta?: number; // Provide already with prefix and suffix, e.g. '+10.2% VS LY'
  primaryDeltaFormatted?: string; // Provide already with prefix and suffix, e.g. '+10.2% VS LY'
  primaryIsGood?: boolean;
  primaryIsBad?: boolean;
  secondary?: number; // Provide already with units, prefix, suffix, e.g. '$ 234 K'
  secondaryFormatted?: string; // Provide already with units, prefix, suffix, e.g. '$ 234 K'
  secondaryReference?: number;
  secondaryReferenceFormatted?: string;
  secondaryDelta?: number; // Provide already with prefix and suffix, e.g. '+10.2% VS LY'
  secondaryDeltaFormatted?: string; // Provide already with prefix and suffix, e.g. '+10.2% VS LY'
  secondaryIsGood?: boolean;
  secondaryIsBad?: boolean;
  attributePrimary?: Dimension;
  attributeSecondary?: Dimension;
  attributeTertiary?: Dimension;
  img?: ImgSrc;
  description?: string;
  tooltip?: string;
  link?: string;
}

type StateDataArr = Array<{
  name: string;
  value: StateDataItem;
}>;

type StateDataItem = Array<{
  name: string; // e.g.: Need For Speed section (could be covers/cars)
  value: Array<{
    name: string; // Content panels: 90s, 00s, 10s
    value: Array<{
      name: string; // tiles / bar-charts / items
      value: Array<{
        name: string; // some categories
        value: Array<Value>; // name: Hot Pursuit / Mercuryt, value: $ 100 K, delta: "+10% VS previous title / 1.2 x Earth"
      }>;
    }>;
  }>;
}>;

type ComponentType = "bar-chart" | "items" | "tiles" | "ticker";

// Example: NFS (Need for Speed) -> Covers -> 90's -> tiles -> Values
// Example: NFS (Need for Speed) -> Cars -> 00's-> tiles -> Values
// Example: SS (solar system) -> Metrics -> Mass -> bar-charts -> Planets Bar Chart Values
type StateDataMap = Map<
  string, // app-name: solar-system / need-for-speed
  {
    slides?: SlidesStateData;
    ticker?: TickerStateData;
  }
>;

type SlidesStateData = Map<string, SlideData>; // Sequence name => data

type SlideData = Array<SlideDataItem>;
interface SlideDataItem {
  headers: Header;
  data: Map<
    string, // 90's / 00's / 10's or Mass / Density / Diameter
    {
      tile: Value; // Could be also Array<Value>
      main: Map<
        string,
        {
          type: ComponentType;
          data: DataItem;
        }
      >;
    }
  >;
}

interface Header {
  // for each slide
  category: string; // Chart / Images -> for BreadCrumbs component (middle top)
  sequence: string; // For Player component, above the slider
  titlePrimary: string;
  titlePrimaryShort: string;
  titleSecondary: string;
  titleSecondaryShort: string;
}

type TickerStateData = Map<string, TickerData>; // sequence => planet => metric => Value
type TickerData = Map<string, DataItem>;
type DataItem = Array<Value>;

interface State {
  mode: Mode;
  appId: string;
  bgIndex: number;
  data?: StateDataMap;
}

interface DataItemType {
  title: string;
  src: string;
}

interface Action {
  name: string;
  path: string;
}
interface Jumbotron {
  img?: string;
  title: string;
  subtitle: string;
  actions?: Array<Action>;
  onClick?: any;
}

interface Drawer {
  variant: DrawerVariant;
}

interface Comment {
  _id: string;
  author: string;
  created: Date;
  body: string;
}

interface ValidationError {
  error: string;
  touched: boolean;
}

interface PostLayout {
  id: string;
  title: string;
  subtitle: string;
  body?: string;
  content?: React.ReactElement;
  additional?: any;
}

interface Post {
  id: string;
  title: string;
  subtitle: string;
  body?: string;
  content?: any;
}

interface FeedLayout {
  getSelloutData?: any;
  children: React.ReactChild | React.ReactChildren | Array<React.ReactChild>;
  contentLeft: any;
  contentRight: any;
}

interface Landing {
  user: User;
  mode: Mode;
  setMode: any;
  title: string;
  subtitle: string;
  button: { name: string; path: string };
}

type Scaling = 1 | 1000 | 1000000;
type Decimals = 0 | 1 | 2 | 3 | 4;

type Metric =
  | "Mass"
  | "Diameter"
  | "Density"
  | "Gravity"
  | "Escape Velocity"
  | "Rotation Period"
  | "Length of Day"
  | "Distance from Sun"
  | "Perihelion"
  | "Aphelion"
  | "Orbital Period"
  | "Orbital Velocity"
  | "Orbital Inclination"
  | "Orbital Eccentricity"
  | "Obliquity to Orbit"
  | "Mean Temperature"
  | "Surface Pressure"
  | "Number of Moons";
// | "Ring System"
// | "Global Magnetic Field";

type TransitionVariant = "fade-in" | "slide-in" | "fade-in-slide-out" | "swipe-cube-horizontal";

export type {
  Value,
  Dimension,
  Measure,
  ImgSrc,
  StateDataArr,
  StateDataMap,
  State,
  ComponentType,
  DataItem,
  DataItemType,
  Color,
  Children,
  User,
  Mode,
  DrawerVariant,
  Input,
  Drawer,
  Action,
  Jumbotron,
  Comment,
  ValidationError,
  PostLayout,
  Post,
  FeedLayout,
  Landing,
  Scaling,
  Decimals,
  StateDataItem,
  TickerData,
  SlidesStateData,
  SlideData,
  SlideDataItem,
  Header,
  Metric,
  TransitionVariant,
};
