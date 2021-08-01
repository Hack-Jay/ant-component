import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import '../src/styles/index.scss'

library.add(fas)

const { withPropsTable } = require('storybook-addon-react-docgen')

const wrapperStyle: React.CSSProperties = {
    padding: '20px 40px',
    width: '500px'
}
const storyWrapper = (stroyFn: any) => (
    <div style={{ padding: '20px 40px', width: '500px' }}>
        <h3 style={{ marginBottom: '20px' }}>组件演示</h3>
        {stroyFn()}
    </div>
)

addDecorator(storyWrapper)
addDecorator(withInfo({
    inline: true,
    header: false,
}))
addDecorator(withPropsTable)

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