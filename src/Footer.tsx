import { TfiGithub } from 'react-icons/tfi';
import './App.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className='copyright'> Copyright © 2023 <a href='https://snickerdoodle.com' className='copyright'>snickerdoodle.com</a> </div>
            <div className='social'>
                <a href="https://github.com/snickerdoodlelabs/Testbed-ERC-7529"
                    className='github'>
                    <TfiGithub size='25px' />
                </a>
            </div>
        </footer>
    );
}