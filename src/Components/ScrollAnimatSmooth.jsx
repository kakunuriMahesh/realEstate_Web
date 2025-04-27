import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ScrollAnimatSmooth = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

  const variants = {
    hidden: {
      opacity: 0,
      transform: 'translate3d(0px, 50px, 0px) scale3d(0.95, 0.95, 1)',
    },
    visible: {
      opacity: 1,
      transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimatSmooth;