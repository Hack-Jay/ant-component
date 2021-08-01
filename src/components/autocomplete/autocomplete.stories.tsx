import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AutoComplete, { DataSourceType } from "./autocomplete";

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

// const lakers = [
//   "bradley",
//   "pope",
//   "caruso",
//   "cook",
//   "cousins",
//   "james",
//   "AD",
//   "green",
//   "howard",
//   "kuzma",
//   "McGee",
//   "rando",
// ];

// const handleFetch = (query: string) => {
//   return lakers
//     .filter((name) => name.includes(query))
//     .map((name) => ({ value: name }));
// };
const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      console.log(items);
      return items
        .slice(0, 10)
        .map((item: any) => ({ value: item.login, ...item }));
    });
};

const renderOption = (item: DataSourceType) => {
  const itemWithGithub = item as DataSourceType<GithubUserProps>;
  return (
    <>
      <span>Name: {itemWithGithub.value}</span>
      {/* <p>url: {itemWithGithub.url}</p> */}
    </>
  );
};

export default {
  title: "Example/AutoComplete",
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<typeof AutoComplete> = (args) => (
  <AutoComplete
    placeholder="auto complete"
    fetchSuggestions={handleFetch}
    onSelect={(keyword) => console.log("selected item", keyword)}
    renderOption={renderOption}
  />
);

export const DefaultAutoComplete = Template.bind({});
DefaultAutoComplete.storyName = "Async AutoComplete";
