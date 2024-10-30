import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLetterHoverEffect } from '../hooks/useGSAP';

interface Word {
    id: string;
    letter: string;
    word: string;
    description: string;
}
const words: Word[] = [
    {
        id: "inno-1",
        letter: 'I',
        word: 'Innovación',
        description: 'Cada caso es único, lo que nos obliga a proponer nuevas formas de defensa.'
    },
    {
        id: "norm-2",
        letter: 'N',
        word: 'Normatividad',
        description: 'Nos desempeñamos con apego a la ley y reglas para la solución de cada caso.'
    },
    {
        id: "trans-3",
        letter: 'T',
        word: 'Transparencia',
        description: 'Mantenemos estrecha comunicación con nuestros clientes para brindarles seguridad y confianza sobre el proceso.'
    },
    {
        id: "exp-4",
        letter: 'E',
        word: 'Experiencia',
        description: 'Contamos con un equipo de abogados especializados en diferentes materias'
    },
    {
        id: "grat-5",
        letter: 'G',
        word: 'Gratitud',
        description: 'Nos complace contar con la preferencia y confianza de nuestros clientes, cada uno representa un reto a cumplir.'
    },
    {
        id: "resp-6",
        letter: "R",
        word: "Respeto",
        description: "Nuestro equipo de profesionales representa el activo más importante que nos permite ofrecer soluciones únicas y permanecer dentro de la preferencia de nuestros clientes."
    },
    {
        id: "iden-7",
        letter: "I",
        word: "Identidad",
        description: "Sabemos quiénes somos y conocemos las fortalezas que nos diferencian de los demás."
    },
    {
        id: "div-8",
        letter: "D",
        word: "Diversidad",
        description: "Nuestra experiencia y conocimientos nos permiten contar con un amplio abanico de soluciones."
    },
    {
        id: "act-9",
        letter: "A",
        word: "Actualización",
        description: "Cada caso representa una oportunidad para fortalecer nuestro conocimiento y experiencia."
    },
    {
        id: "dif-10",
        letter: "D",
        word: "Diferencia",
        description: "Nuestro diferenciador más importante es brindarle seguridad a cada uno de nuestros clientes y sus intereses."
    }
];

export default function ValuesWords() {
    const [selectedWord, setSelectedWord] = useState<Word>(words[0]);
    const letterRefs = useRef<(HTMLDivElement | null)[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const wordRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    // Inicializar el array de refs
    useEffect(() => {
        letterRefs.current = letterRefs.current.slice(0, words.length);
    }, []);

    useLetterHoverEffect(letterRefs);

    

    const handleLetter = (word: Word) => {
        setSelectedWord(word);
        
        const selectedLetterEl = letterRefs.current[words.findIndex(w => w.id === word.id)];
        
        // Resetear todas las letras
        letterRefs.current.forEach(ref => {
            if (ref) {
                gsap.to(ref, {
                    scale: 1,
                    duration: 0.2,
                });
            }
        });

        // Animación mejorada de la letra seleccionada
        gsap.timeline()
            .to(selectedLetterEl, {
                scale: 1.1,
                duration: 0.25,
                ease: "back.out(2)"
            })
            .to(selectedLetterEl, {
                scale: 1,
                duration: 0.2,
                ease: "power1.out"
            });

        // Animación del contenido
        if (contentRef.current && lineRef.current && wordRef.current && descriptionRef.current) {
            const tl = gsap.timeline();

            // Animación de salida si hay contenido previo
            if (selectedWord) {
                tl.to([wordRef.current, descriptionRef.current], {
                    opacity: 0,
                    y: -10,
                    duration: 0.15,
                    stagger: 0.05
                });
            }

            // Animación de entrada del nuevo contenido
            tl.fromTo(lineRef.current,
                { width: 0 },
                { width: "32px", duration: 0.25, ease: "power2.out" }
            )
            .fromTo(wordRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
                "-=0.1"
            )
            .fromTo(descriptionRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
                "-=0.1"
            );
        }
    };

    return (
        <div className="flex flex-col gap-10 items-center justify-center bg-red-500 md:flex-row w-full">
            <div className="flex flex-wrap items-center justify-center gap-8 md:max-w-[380px]">
                {words.map((item) => (
                    <div
                        key={item.id}
                        ref={el => letterRefs.current[words.findIndex(w => w.id === item.id)] = el}
                        onClick={() => handleLetter(item)}
                        className={`
                            bg-secondary min-w-20 min-h-14 
                            flex items-center justify-center 
                            rounded-lg uppercase text-2xl text-white 
                            font-extrabold cursor-pointer 
                            transition-colors duration-200
                            hover:bg-secondary/90 hover:shadow-lg
                            ${selectedWord?.id === item.id ? 'ring-2 ring-offset-2 ring-secondary/50' : ''}
                        `}
                    >
                        {item.letter}
                    </div>
                ))}
            </div>

            <div ref={contentRef} className=" min-h-[150px] bg-yellow-500 md:w-1/3">
                {selectedWord && (
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-3 items-center">
                            <div ref={lineRef} className="h-1 w-8 bg-secondary" />
                            <h3 ref={wordRef} className="text-xl font-bold">
                                {selectedWord.word}
                            </h3>
                        </div>
                        <p ref={descriptionRef} className="text-gray-700">
                            {selectedWord.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}