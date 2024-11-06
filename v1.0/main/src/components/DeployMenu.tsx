import { useState, useRef, useEffect } from 'react';
import { Services } from 'src/const/services';


export default function ServicesDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropDown = useRef(null)
    const items = [
        "Derecho Fiscal",
        "Derecho Administrativo",
        "Derecho Corporativo",
        "Contabilidad",
        "Derecho Mercantil",
        "Derecho Familiar",
        "Derecho Cívil",
        "Contratos",
        "Derecho Laboral",
        "Administración Inmobiliaria",
        "Recursos Humanos"
    ];
    const toggleMenu = () => setIsOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDown.current && !dropDown.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative max-h-fit" ref={dropDown}>
            <div 
                className="flex items-center gap-2 cursor-pointer justify-center"
                onClick={() => toggleMenu()}
            >
                Servicios
                <div className={`transition-all duration-300 ${isOpen ? 'rotate-180' : ''} rotate-0 group-hover:rotate-180`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 9l6 6l6 -6" />
                    </svg>
                </div>
            </div>
            <div className="lg:pt-4 transition-all lg:absolute left-0 top-[1.2rem]">
                <ul className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    lg:absolute flex flex-col gap-2 border-t-2 border-primary mt-0 bg-white text-black rounded-2xl shadow-2xl 
                    ${isOpen ? 'max-h-[500px] opacity-100 visible mt-2' : 'max-h-0 opacity-0 invisible'}
                    group-hover:opacity-100 group-hover:max-h-[500px] group-hover:visible
                `}>
                    {Services.map((service, idx) => (
                        <li 
                            key={idx} 
                            className="px-4 py-3 lowercase first-letter:uppercase text-nowrap transition-colors duration-200 ease-in-out hover:bg-secondary hover:bg-opacity-20 first:rounded-tr-2xl first:rounded-tl-2xl last:rounded-br-2xl last:rounded-bl-2xl"
                        >
                            <a href={`/services/${service.id.toLowerCase()}`}>
                                {service.Hero.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}