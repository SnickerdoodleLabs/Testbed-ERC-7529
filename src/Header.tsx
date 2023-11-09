import './App.css';
import logo from './snickerdoodle_horizontal_notab.png'

export default function Header() {
    return (
        <header className="header">
            <a href='https://snickerdoodle.com' className='header'>
                <img src={logo} alt="logo" className="header-logo"/>
            </a>
        </header>
    );
}