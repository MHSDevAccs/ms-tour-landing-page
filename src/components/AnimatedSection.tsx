'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  direction = 'up' 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px' 
  })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      scale: direction === 'scale' ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered Children Animation Component
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className = '', 
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-50px' 
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual Stagger Item Component
interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
    }
  }

  return (
    <motion.div
      variants={itemVariants}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Hover Animation Component
interface HoverCardProps {
  children: ReactNode
  className?: string
  scale?: number
  duration?: number
}

export function HoverCard({ 
  children, 
  className = '', 
  scale = 1.02,
  duration = 0.2 
}: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale,
        transition: { duration }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// Page Transition Component
interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}