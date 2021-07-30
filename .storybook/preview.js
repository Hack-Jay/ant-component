import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '../src/styles/index.scss'

const { withPropsTable } = require('storybook-addon-react-docgen');

addDecorator(withInfo);
addDecorator(withPropsTable);

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
            expanded: true
        },
    },
    // backgrounds: {
    //     default: 'facebook',
    //     values: [
    //         {
    //             name: 'facebook',
    //             value: '#3b5998',
    //         },
    //         {
    //             name: 'twitter',
    //             value: '#00aced',
    //         },
    //     ],
    // },
}