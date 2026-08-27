import { siteLogo } from "../assets/Nav";
export default function Navbar(){
    return (
        <nav class="bg-amber-100 p-2">
            <img class="w-[180px] pl-6" src={ siteLogo } alt="site-logo"/>
            <ul>
                <li></li>
            </ul>
        </nav>
    )
}