import React from 'react';
import Button from './components/button/button';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <Button>Hello</Button>
                    <Button size="sm" btnType='primary'>Hello</Button>
                    <Button size="lg" btnType='primary' disabled>Hello</Button>
                    <Button btnType="link" href="http://baidu.com">baidu link</Button>
                    <Button btnType="link" href="http://baidu.com" disabled>baidu link disabled</Button>
                </p>
            </header>
        </div>
    );
}

export default App;
