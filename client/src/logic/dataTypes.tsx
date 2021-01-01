type Franchise = "NFS";
type Decade = "90" | "00" | "10";
type SlideTypes = "Games" | "Developers" | "Cars";

type Developer = "EA Canada" | "EA Seattle" | "Eden Studios" | "Pocketeers" |
    "EA Black Box" | "Rovio Mobile" | "Global VR" | "Exient Entertainment" | 
    "Firebrand Games" | "Slightly Mad Studios" | "EA Bright Light" | "EA Montreal" |
    "Quicklime Games" | "EA Singapore" | "Criterion Games" | "Straight Right" |
    "Ghost Games" | "Firemonkeys Studios";

type Platform = "PC" | "DOS" | "3DO" | "GBA" | "GC" | "Saturn" |
"PSP" | "DS" | "PS Vita" | "3DS" |
"PS" | "PS2" | "PS3" | "PS4" | "PS5" | 
"Xbox" | "Xbox 360" | "Xbox One" |
"Wii" | "Wii U" |"Mobile" | "iOS"| "Android";

type Year = "1990" | "1991" | "1992" | "1993" | "1994" |"1995" |"1996" |"1997" | "1998" | "1999" |
    "2000" | "2001" | "2002" | "2003" | "2004" |"2005" |"2006" |"2007" | "2008" | "2009" | 
    "2010" | "2011" | "2012" | "2013" | "2014" |"2015" |"2016" |"2017" | "2018" | "2019" |
    "2020";
    

interface Dimension {
    key: string;
    text: string;
}

interface Measure {
    value: string;
    unit?: string;
}

// GameDataItem and CarDataItem should share the game column
interface GameDataItem {
    game: Dimension;    // key
    label: string;
    franchise: Dimension;
    year: Year;
    developers: Array<Developer>;
    platforms: Array<Platform>;
    logo?: string;
    cover?: string;
    background?: Array<string>;
    video?: string;
    cars: Array<CarDataItem>;
    revenue: Measure;
    qty: Measure;
}

type GameData = Array<GameDataItem>;

interface CarDataItem {
    game: Dimension;    // key
    brand: Dimension;
    name: Dimension;
    url: string;
    price?: Measure;
}

type CarData = Array<CarDataItem>;

type FlashData = {
    games?: GameData;
}

export type {
    Franchise,
    Decade,
    SlideTypes,
    Dimension,
    Measure,
    Developer,
    GameData,
    GameDataItem,
    CarData,
    CarDataItem,
    FlashData,
}
