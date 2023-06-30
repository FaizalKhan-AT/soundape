import sanki from "./assets/demo/sank.jpg";
import aa from "./assets/demo/aa.jpg";
import neh from "./assets/demo/neh.jpg";
import fb from "./assets/demo/fb.jpg";
import ar from "./assets/demo/ar.jpg";
import flare from "./assets/demo/flare.mp3";
import mirza from "./assets/demo/mirza.mp3";
import blood from "./assets/demo/bloodcode.mp3";
interface suggested {
  pic: string;
  username: string;
  displayname: string;
}
export interface File {
  audio: string;
  postedAt: string;
}
export const dummyUsers: suggested[] = [
  {
    pic: sanki,
    username: "iamsankeerth_",
    displayname: "☆》[ Sankeerth ]《☆",
  },
  {
    pic: aa,
    username: "a1.xdhil_03",
    displayname: "عادل نزار",
  },
  // {
  //   pic: neh,
  //   username: "im_me_and_u_are_u",
  //   displayname: "Kãlõpsïã",
  // },
  {
    pic: fb,
    username: "scorpionrocksat1485",
    displayname: "Fardheen Bishar",
  },
  {
    pic: ar,
    username: "2stroke_wizard",
    displayname: "Arun",
  },
];
export const dummyAudios: File[] = [
  { audio: flare, postedAt: "March , 21 2023" },
  { audio: blood, postedAt: "March , 30 2023" },
  { audio: mirza, postedAt: "April , 1 2023" },
];
