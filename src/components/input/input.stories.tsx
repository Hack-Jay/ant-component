import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "./input";

export default {
  title: "Example/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.storyName = "Input";
DefaultInput.args = {
  style: { width: "300px" },
  placeholder: "placeholder",
};
