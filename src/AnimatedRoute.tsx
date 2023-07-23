import { ReactNode } from "react";
import { motion } from "framer-motion";
interface Props {
    children: ReactNode
}

const scrollToTop = () => {
    window.scrollTo(0, 0);
}

export function AnimatedRoute({ children }: Props) {
    const pageMotion = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };
    return (<motion.div initial="initial" animate="animate" exit="exit" onAnimationComplete={scrollToTop} variants={pageMotion}>{children}</motion.div>)
}
