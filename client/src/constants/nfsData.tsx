import { FlashData, Dimension } from "../logic/dataTypes";
import nfs_1_cover from '../img/nfs/1_0_cover.jpg';
import nfs_1_ui from '../img/nfs/1_0_ui.jpg';
import nfs_1_1 from '../img/nfs/1_1.jpg';
import nfs_1_2 from '../img/nfs/1_2.jpg';
import nfs_1_3 from '../img/nfs/1_3.jpg';
import nfs_2_cover from '../img/nfs/2_0_cover.jpg';
import nfs_2_ui from '../img/nfs/2_0_ui.jpg';
import nfs_2_1 from '../img/nfs/2_1.jpg';
import nfs_2_2 from '../img/nfs/2_2.jpg';
import nfs_2_3 from '../img/nfs/2_3.jpg';
import nfs_3_cover from '../img/nfs/3_0_cover.jpg';
import nfs_3_ui from '../img/nfs/3_0_ui.jpg';
import nfs_3_1 from '../img/nfs/3_1.jpg';
import nfs_3_2 from '../img/nfs/3_2.jpg';
import nfs_3_3 from '../img/nfs/3_3.jpg';
import nfs_4_cover from '../img/nfs/4_0_cover.jpg';
import nfs_4_ui from '../img/nfs/4_0_ui.jpg';
import nfs_4_2 from '../img/nfs/4_2.jpg';
import nfs_4_3 from '../img/nfs/4_3.jpg';
import nfs_4_1 from '../img/nfs/4_1.jpg';
import nfs_5_cover from '../img/nfs/5_0_cover.jpg';
import nfs_5_ui from '../img/nfs/5_0_ui.jpg';
import nfs_5_2 from '../img/nfs/5_2.jpg';
import nfs_5_3 from '../img/nfs/5_3.jpg';
import nfs_5_1 from '../img/nfs/5_1.jpg';

const nfs: Dimension = {
  key: "NFS",
  text: "Need For Speed",
};

const testNumber = "12345678";

// fixed list is applied in order to assure that all tiles show a game from the same year at the same time
const DECADES = {
  "1990": [
    { key: "nfs_1", text: "The Need for Speed" },
    { key: "nfs_1", text: "The Need for Speed" },
    { key: "nfs_1", text: "The Need for Speed" },
    { key: "nfs_1", text: "The Need for Speed" },
    { key: "nfs_1", text: "The Need for Speed" },
    { key: "nfs_1", text: "The Need for Speed" },
    { key: "nfs_1", text: "The Need for Speed" },
    { key: "nfs_2", text: "Need for Speed II" },
    { key: "nfs_3", text: "Need for Speed III: Hot Pursuit" },
    { key: "nfs_4", text: "Need for Speed: High Stakes" },
  ],
  "2000": [
    { key: "nfs_5", text: "Need for Speed: Porsche Unleashed" },
    { key: "nfs_6", text: "Need for Speed: Hot Pursuit 2" },
    { key: "nfs_7", text: "Need for Speed: Underground" },
    { key: "nfs_8", text: "Need for Speed: Underground 2" },
    { key: "nfs_9", text: "Need for Speed: Most Wanted" },
    { key: "nfs_10", text: "Need for Speed: Carbon" },
    { key: "nfs_11", text: "Need for Speed: ProStreet" },
    { key: "nfs_12", text: "Need for Speed: Undercover" },
    { key: "nfs_13", text: "Need for Speed: Shift" },
    { key: "nfs_14", text: "Need for Speed: Nitro" },
  ],
  "2010": [
    { key: "nfs_15", text: "Need for Speed: World" },
    { key: "nfs_16", text: "Need for Speed: Hot Pursuit" },
    { key: "nfs_17", text: "Shift 2: Unleashed" },
    { key: "nfs_18", text: "Need for Speed: The Run" },
    { key: "nfs_19", text: "Need for Speed: Most Wanted" },
    { key: "nfs_20", text: "Need for Speed Rivals" },
    { key: "nfs_21", text: "Need for Speed: No Limits" },
    { key: "nfs_22", text: "Need for Speed" },
    { key: "nfs_23", text: "Need for Speed Payback" },
    { key: "nfs_24", text: "Need for Speed Heat" },
  ],
};

// Temp solution
// https://vgsales.fandom.com/wiki/Need_for_Speed
// https://en.wikipedia.org/wiki/Need_for_Speed
const NEED_FOR_SPEED: FlashData = {
  games: [
    {
      game: { key: `${nfs.key}_1`, text: "The Need for Speed" },
      label: "1994",
      franchise: nfs,
      year: "1994",
      developers: ["EA Canada"],
      platforms: ["3DO", "DOS", "PS", "Saturn"],
      logo: "",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/8/85/The_NFS_Video_cover.jpg",
      background: [nfs_1_cover, nfs_1_ui, nfs_1_1, nfs_1_2, nfs_1_3],
      video: "https://www.youtube.com/watch?v=Dur8Dzgtbv4&t=501s&ab_channel=iGameplay1337",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_2`, text: "Need for Speed II" },
      label: "1997",
      franchise: nfs,
      year: "1997",
      developers: ["EA Canada", "EA Seattle"],
      platforms: ["PC", "PS"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/7/7b/NFS_II_%28PC%2C_US%29_cover_art.jpg",
      background: [nfs_2_cover, nfs_2_ui, nfs_2_1, nfs_2_2, nfs_2_3],
      video: "https://www.youtube.com/watch?v=vHNdRC0ehmQ&t=208s&ab_channel=WorldofLongplays",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_3`, text: "Need for Speed III: Hot Pursuit" },
      label: "1998",
      franchise: nfs,
      year: "1998",
      developers: ["EA Canada", "EA Seattle"],
      platforms: ["PC", "PS"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/a/a6/NFS_III_Hot_Pursuit_%28PC%2C_US%29_cover_art.jpg",
      background: [nfs_3_cover, nfs_3_ui, nfs_3_1, nfs_3_2, nfs_3_3],
      video: "https://www.youtube.com/watch?v=E1AxLJpY-DQ&t=5137s&ab_channel=WorldofLongplays",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "1700000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_4`, text: "Need for Speed: High Stakes" },
      label: "1999",
      franchise: nfs,
      year: "1999",
      developers: ["EA Canada", "EA Seattle"],
      platforms: ["PC", "PS"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/e/e2/NFS_High_Stakes_box.jpg",
      background: [nfs_4_cover, nfs_4_ui, nfs_4_1, nfs_4_2, nfs_4_3],
      video: "https://www.youtube.com/watch?v=YtLwveuHS2Q&t=8639s&ab_channel=WorldofLongplays",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "1390000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_5`, text: "Need for Speed: Porsche Unleashed" },
      label: "2000",
      franchise: nfs,
      year: "2000",
      developers: ["Eden Studios", "EA Canada", "Pocketeers"],
      platforms: ["PC", "PS", "GBA"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/a/af/Need_for_Speed_-_Porsche_Unleashed_Coverart.png",
      background: [nfs_5_cover, nfs_5_ui, nfs_5_1, nfs_5_2, nfs_5_3],
      video: "https://www.youtube.com/watch?v=LBSEH9GzUBI&t=276s&ab_channel=PCGamingVideos",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_6`, text: "Need for Speed: Hot Pursuit 2" },
      label: "2002",
      franchise: nfs,
      year: "2002",
      developers: ["EA Black Box", "EA Seattle"],
      platforms: ["PC", "PS2", "Xbox", "GC"],
      cover: "https://upload.wikimedia.org/wikipedia/en/9/95/NFSHP2_PC.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "1160000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_7`, text: "Need for Speed: Underground" },
      label: "2003",
      franchise: nfs,
      year: "2003",
      developers: ["EA Black Box", "Pocketeers"],
      platforms: ["PC", "PS2", "Xbox", "GC", "GBA"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/a/a0/Nfsu-win-cover.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "15000000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_8`, text: "Need for Speed: Underground 2" },
      label: "2004",
      franchise: nfs,
      year: "2004",
      developers: ["EA Black Box", "Pocketeers"],
      platforms: ["PC", "PS2", "Xbox", "GC", "GBA", "PSP", "DS"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/1/10/Nfsu2-win-cover.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "7000000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_9`, text: "Need for Speed: Most Wanted" },
      label: "2005",
      franchise: nfs,
      year: "2005",
      developers: ["EA Canada", "EA Black Box"],
      platforms: ["PC", "PS2", "Xbox", "GC", "GBA", "PSP", "DS", "Xbox 360"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/8/8e/Need_for_Speed_Most_Wanted_Box_Art.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "16000000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_10`, text: "Need for Speed: Carbon" },
      label: "2006",
      franchise: nfs,
      year: "2006",
      developers: ["EA Canada", "EA Black Box", "Rovio Mobile", "Global VR"],
      platforms: [
        "PC",
        "Xbox 360",
        "PS3",
        "Wii",
        "PS2",
        "Xbox",
        "GC",
        "GBA",
        "PSP",
        "DS",
      ],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/a/a4/Need_for_Speed_Carbon_Game_Cover.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "3200000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_11`, text: "Need for Speed: ProStreet" },
      label: "2007",
      franchise: nfs,
      year: "2007",
      developers: ["EA Black Box"],
      platforms: ["PC", "PS3", "Xbox 360", "Wii", "PS2", "PSP", "DS"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/1/16/NFS_ProStreet_cover.png",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "2400000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_12`, text: "Need for Speed: Undercover" },
      label: "2008",
      franchise: nfs,
      year: "2008",
      developers: ["EA Black Box", "Exient Entertainment", "Firebrand Games"],
      cars: [],
      platforms: ["PC", "PS3", "Xbox 360", "Wii", "PS2", "PSP", "DS"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d2/Need_for_Speed_Undercover_cover.jpg",
      logo: "",
      revenue: { value: "", unit: "USD" },
      qty: { value: "5200000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_13`, text: "Need for Speed: Shift" },
      label: "2009",
      franchise: nfs,
      year: "2009",
      developers: ["Slightly Mad Studios", "EA Bright Light"],
      platforms: ["PC", "PS3", "Xbox 360", "PSP", "Mobile"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/0/00/Need_for_Speed_Shift.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "390000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_14`, text: "Need for Speed: Nitro" },
      label: "2009",
      franchise: nfs,
      year: "2009",
      developers: ["Firebrand Games", "EA Montreal"],
      platforms: ["DS", "Wii"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/0/0b/NFS_Nitro_Wii_cover_art.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_15`, text: "Need for Speed: World" },
      label: "2010",
      franchise: nfs,
      year: "2010",
      developers: ["Quicklime Games", "EA Singapore"],
      platforms: ["PC"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d6/Need-for-Speed-World.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_16`, text: "Need for Speed: Hot Pursuit" },
      label: "2010",
      franchise: nfs,
      year: "2010",
      developers: ["Criterion Games"],
      platforms: ["PC", "PS3", "Xbox 360", "Wii", "Mobile"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/8/85/Need_for_Speed_Hot_Pursuit_2010.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "5000000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_17`, text: "Shift 2: Unleashed" },
      label: "2011",
      franchise: nfs,
      year: "2011",
      developers: ["Slightly Mad Studios", "Straight Right"],
      platforms: ["PC", "PS3", "Xbox 360", "iOS"],
      cover: "https://upload.wikimedia.org/wikipedia/en/8/83/Shift2-cover.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_18`, text: "Need for Speed: The Run" },
      label: "2011",
      franchise: nfs,
      year: "2011",
      developers: ["EA Black Box", "Firebrand Games"],
      platforms: ["PC", "PS3", "Xbox 360", "Wii", "3DS"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/7/7c/Needforspeedtheruncover.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_19`, text: "Need for Speed: Most Wanted" },
      label: "2012",
      franchise: nfs,
      year: "2012",
      developers: ["Criterion Games"],
      platforms: ["PC", "PS3", "Xbox 360", "PS Vita", "Wii U", "Mobile"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b0/Nfs-most-wanted-2012-gen-packart.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "509000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_20`, text: "Need for Speed: Rivals" },
      label: "2013",
      franchise: nfs,
      year: "2013",
      developers: ["Ghost Games"],
      platforms: ["PC", "PS4", "Xbox One", "PS3", "Xbox 360"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/e/e5/Need_for_Speed_Rivals_cover.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: "4000000", unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_21`, text: "Need for Speed: No Limits" },
      label: "2015",
      franchise: nfs,
      year: "2015",
      developers: ["Firemonkeys Studios"],
      platforms: ["Android", "iOS"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/5/59/Need_for_Speed_No_Limits_cover_art.jpeg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_22`, text: "Need for Speed" },
      label: "2015",
      franchise: nfs,
      year: "2015",
      developers: ["Ghost Games"],
      platforms: ["PC", "PS4", "Xbox One"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/a/a9/Need_for_Speed_2015.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_23`, text: "Need for Speed Payback" },
      label: "2017",
      franchise: nfs,
      year: "2017",
      developers: ["Ghost Games"],
      platforms: ["PC", "PS4", "Xbox One"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/6/64/Need_for_Speed_Payback_standard_edition_cover_art.jpg",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
    {
      game: { key: `${nfs.key}_23`, text: "Need for Speed Heat" },
      label: "2019",
      franchise: nfs,
      year: "2019",
      developers: ["Ghost Games"],
      platforms: ["PC", "PS4", "Xbox One"],
      cover:
        "https://upload.wikimedia.org/wikipedia/en/7/7f/Cover_Art_of_Need_for_Speed_Heat.png",
      logo: "",
      cars: [],
      revenue: { value: "", unit: "USD" },
      qty: { value: testNumber, unit: "pc" },
    },
  ],
};

export { NEED_FOR_SPEED, DECADES };
