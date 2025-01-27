import React, { useState } from 'react';
import './SideBar.css';

export default function SideBar() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    const menuItems = [
        { icon: 'src/assets/icons/busca.svg', alt: 'Busca' },
        { icon: 'src/assets/icons/cadastro.svg', alt: 'Cadastro' },
        { icon: 'src/assets/icons/alunos.svg', alt: 'Alunos' },
        { icon: 'src/assets/icons/home.svg', alt: 'Home' },
    ];

    return (
        <nav className="sidebar">
            <div className="sidebar-logo">
                <img src="src/assets/icons/ellpinho.png" alt="Logo da Página" />
            </div>

            <ul>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleItemClick(index)}
                        className={activeIndex === index ? 'active' : ''}
                    >
                        <a href="#">
                            <img src={item.icon} alt={item.alt} />
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
