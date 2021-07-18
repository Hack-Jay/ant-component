import React from 'react';
import Button from './components/button/button';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <Button>Hello</Button>
                    <Button size="sm" type='primary'>Hello</Button>
                    <Button size="lg" type='primary' disabled>Hello</Button>
                    <Button type="link" href="http://baidu.com">baidu link</Button>
                    <Button type="link" href="http://baidu.com" disabled>baidu link disabled</Button>
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
