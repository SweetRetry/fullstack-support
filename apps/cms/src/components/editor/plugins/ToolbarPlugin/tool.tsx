import {
  TextQuote,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  List,
  ListCheck,
  Code,
  Text,
} from "lucide-react";

export const blockTypeToBlockNameMap = {
  paragraph: {
    text: "Normal",
    icon: <Text />,
  },
  quote: {
    text: "Quote",
    icon: <TextQuote />,
  },
  h1: {
    text: "Heading 1",
    icon: <Heading1 />,
  },
  h2: {
    text: "Heading 2",
    icon: <Heading2 />,
  },
  h3: {
    text: "Heading 2",
    icon: <Heading3 />,
  },
  number: {
    text: "Ordered List",
    icon: <ListOrdered />,
  },
  bullet: {
    text: "Bulleted List",
    icon: <List />,
  },
  check: {
    text: "Check List",
    icon: <ListCheck />,
  },
  code: {
    text: "Code Block",
    icon: <Code />,
  },
};

export type BlockType = keyof typeof blockTypeToBlockNameMap;
