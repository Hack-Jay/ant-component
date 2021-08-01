import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './button';

export default {
    title: 'Example/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
        onClick: { action: 'onClick', control: null },
        btnType: {
            options: ['default', 'primary', 'danger', 'link'],
            control: { type: 'select' }
        },
        size: {
            options: ['sm', 'md', 'lg' ],
            control: { type: 'radio' }
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.storyName = 'Button'
Primary.args = {
    btnType: 'primary',
    children: 'Primary Button'
};

export const Link = Template.bind({});
Link.args = {
    btnType: 'link',
    href: 'https://google.com',
    target: '_blank',
    children: 'Link Button'
};

export const Large = Template.bind({});
Large.args = {
    size: 'lg',
    children: 'Button'
};

export const Small = Template.bind({});
Small.args = {
    size: 'sm',
    children: 'Button'
};
