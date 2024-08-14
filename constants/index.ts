import { link } from "fs";
import { TerminalSquare } from "lucide-react";

export const USERS = ["/users/user-1.png", "/users/user-2.png", "/users/user-3.png", "/users/user-4.jpg", "/users/user-5.jpg"];

export const USER_REVIEWS = [
  {
    name: "Jonathan",
    image_url: "/users/user-1.png",
    stars: 4,
    description: [
      {
        firstpart:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur minus molestias consequaturuci",
        highlight: "Lorem ipsum dolor sit amet",
        lastpart:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse nam, pariatur voluptatibus nostrum aut quia dolor maxime maiores.",
      },
    ],
  },
  {
    name: "Kathryn",
    image_url: "/users/user-2.png",
    stars: 5,
    description: [
      {firstpart:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur minus consequatur maiores tempoique ducimus dolore ea re",
      highlight: "Lorem ipsum dolor sit amet",
      lastpart:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse nam, pariatur voluptatibus nostrum aut quia dolor maxime !",
    }],
  },
];


export const SPECIFICATIONS = [
  "High quality silicone material",
  "Scratch and fingerprint resistant coating",
  "Wireless charging compatible",
  "5 year warranty"
]


export const FOOTER_LINKS = [
  {
    name: 'Terms',
    link: '#'
  },
  {
    name: 'Privacy Policy',
    link: '#'
  },
  {
    name: 'Cookie Policy',
    link: '#'
  }
]