import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AutoComplete from "./autocomplete";

const lakers = [
  "bradley",
  "pope",
  "caruso",
  "cook",
  "cousins",
  "james",
  "AD",
  "green",
  "howard",
  "kuzma",
  "McGee",
  "rando",
];

const handleFetch = (query: string) => {
  return lakers.filter((name) => name.includes(query));
  // .map((name) => ({ value: name }));
};

export default {
  title: "Example/AutoComplete",
  component: AutoComplete,
  argTypes: {
    // controlled value prop
    value: {
      control: {
        disable: true,
      },
    },
    onChange: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<typeof AutoComplete> = (args) => (
  <AutoComplete placeholder='auto complete' fetchSuggestions={handleFetch} />
);

export const DefaultAutoComplete = Template.bind({});
DefaultAutoComplete.storyName = "AutoComplete";
// DefaultAutoComplete.args = {
//   placeholder: "auto complete",
//   //   onSelect: (keyword) => console.log("keyword", keyword),
//   //   fetchSuggestions: handleFetch,
// };
