import './App.css';
import logo from './snickerdoodle_horizontal_notab.png'

export default function Header() {
    return (
        <header className="header">
            <a href='https://snickerdoodle.com'>
                <img src={logo} className="header-logo" alt="logo" />
            </a>
        </header>
    );
}