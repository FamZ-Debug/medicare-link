import { Variants } from 'framer-motion';

// Page transition variants
export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        x: 20,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
        },
    },
    exit: {
        opacity: 0,
        x: -20,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

// Fade in variants
export const fadeInVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

// Stagger children variants
export const staggerContainerVariants: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Scale in variants
export const scaleInVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 0.9,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

// Button hover/tap variants
export const buttonVariants: Variants = {
    hover: {
        scale: 1.02,
        y: -2,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
    tap: {
        scale: 0.98,
    },
};

// Card hover variants
export const cardHoverVariants: Variants = {
    hover: {
        y: -5,
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
};

// Spring configurations
export const springConfig = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
};

export const smoothSpringConfig = {
    type: 'spring',
    stiffness: 200,
    damping: 25,
};
