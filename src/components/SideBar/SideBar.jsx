import './SideBar.css'

export default function SideBar () {
    return(
        <nav className="sidebar">

            <div className="sidebar-logo">
                <img src="src/assets/icons/ellpinho.png" alt="Logo da Página" />
            </div>

            <ul>
                <li><a href="#">
                        <img src="src/assets/icons/Home.png" alt="" />
                    </a></li>
                <li><a href="#">icone</a></li>
                <li><a href="#">icone</a></li>
            </ul>
        </nav>
    )
}