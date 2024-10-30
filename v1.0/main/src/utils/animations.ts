// src/utils/animations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animaciones generales reutilizables en todo el proyecto
export const fadeInUp = (element: Element) => {
    return gsap.from(element, {
        y: 50,
        opacity: 0,
        duration: 1,
    });
};

export const staggerElements = (elements: Element[]) => {
    return gsap.from(elements, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
};

export const addHoverAnimation = (element: Element) => {
    gsap.to(element, {
        y: -5,
        duration: 0.3,
        paused: true,
        ease: "power2.out"
    });
};