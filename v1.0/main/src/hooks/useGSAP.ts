import { useEffect } from 'react';
import { gsap } from 'gsap';

export const useLetterHoverEffect = (letterRefs: React.MutableRefObject<(HTMLDivElement | null)[]>) => {
    useEffect(() => {
        const elements = letterRefs.current.filter(ref => ref !== null);
        
        // Animación inicial más dinámica
        gsap.from(elements, {
            opacity: 0,
            y: 30,
            duration: 0.3,
            stagger: {
                amount: 0.5,
                from: "random"
            },
            ease: "power2.out"
        });

        // Efecto hover mejorado
        elements.forEach(element => {
            if (!element) return;

            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    y: -3,
                    // scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    y: 0,
                    // scale: 1,
                    duration: 0.1,
                    ease: "power2.in"
                });
            });
        });

        return () => {
            elements.forEach(element => {
                if (!element) return;
                element.replaceWith(element.cloneNode(true));
            });
        };
    }, [letterRefs]);
};

export const useInitialAnimation = (elements: Element[]) => {
    useEffect(() => {
        gsap.from(elements, {
            duration: 0.5,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
    }, [elements]);
};