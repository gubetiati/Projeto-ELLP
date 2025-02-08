import { Link, useLocation } from 'react-router-dom';
import './SideBar.css';

export default function SideBar() {
    const location = useLocation();
    
    const menuItems = [
        { 
            icon: 'src/assets/icons/busca.svg', 
            alt: 'Busca',
            path: '/search' 
        },
        { 
            icon: 'src/assets/icons/cadastro.svg', 
            alt: 'Cadastro',
            path: '/register' 
        },
        { 
            icon: 'src/assets/icons/alunos.svg', 
            alt: 'Alunos',
            path: '/aluno' 
        },
        { 
            icon: 'src/assets/icons/home.svg', 
            alt: 'Home',
            path: '/' 
        },
    ];

    return (
        <nav className="sidebar">
            <div className="sidebar-logo">
                <Link to="/">
                    <img 
                        src="src/assets/icons/ellpinho.png" 
                        alt="Logo da Página" 
                    />
                </Link>
            </div>

            <ul>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={location.pathname === item.path ? 'active' : ''}
                    >
                        <Link to={item.path}>
                            <img 
                                src={item.icon} 
                                alt={item.alt} 
                                className="sidebar-icon"
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}