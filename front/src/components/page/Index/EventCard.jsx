import { Calendar, MapPin, Clock, ArrowRight, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const EventCard = ({ event, index }) => {
    const monthNames = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DÉC'];

    // ============ ANIMATION VARIANTS ============

    // 1. Card entrance avec stagger
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.92 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 12,
                delay: index * 0.12,
            },
        },
        hover: {
            y: -12,
            scale: 1.02,
            boxShadow: '0 30px 60px -12px rgba(251, 191, 36, 0.25)',
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 10,
            },
        },
    };

    // 2. Image zoom + brightness
    const imageVariants = {
        initial: { scale: 1, brightness: 1.1 },
        hover: {
            scale: 1.15,
            brightness: 1.2,
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 20,
                duration: 0.6,
            },
        },
    };

    // 3. Badge rotation + pop
    const badgeVariants = {
        hidden: { opacity: 0, rotate: -20, scale: 0.6 },
        visible: {
            opacity: 1,
            rotate: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 150,
                damping: 12,
                delay: index * 0.12 + 0.2,
            },
        },
        hover: {
            scale: 1.08,
            rotate: 3,
            transition: {
                type: 'spring',
                stiffness: 250,
                damping: 12,
            },
        },
    };

    // 4. Title color change
    const titleVariants = {
        initial: { color: '#ffffff' },
        hover: {
            color: '#f59e0b',
            transition: { duration: 0.3 },
        },
    };

    // 5. Content fade in
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: index * 0.12 + 0.1,
            },
        },
    };

    // 6. Gradient overlay slide
    const overlayVariants = {
        initial: { opacity: 0 },
        hover: {
            opacity: 1,
            transition: { duration: 0.4 },
        },
    };

    // 7. Info items stagger
    const infoContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: index * 0.12 + 0.15,
            },
        },
    };

    const infoItemVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: '-50px' }}
            className="group relative pt-4 mt-10 bg-zinc-950 border border-white/5 rounded-4xl overflow-hidden transition-all duration-500 flex flex-col h-full"
        >
            {/* Badge flottant */}
            <motion.div
                variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                className="absolute top-6 left-6 z-20 bg-amber-600 text-black px-4 py-2 rounded-xl text-center shadow-xl"
            >
                <motion.span className="block text-lg font-black leading-none">
                    {event.day}
                </motion.span>
                <motion.span className="block text-[10px] font-bold uppercase tracking-widest">
                    {monthNames[event.month]}
                </motion.span>
            </motion.div>

            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <motion.img
                    src={event.image}
                    alt={event.title}
                    variants={imageVariants}
                    initial="initial"
                    whileHover="hover"
                    className="w-full h-full object-cover brightness-110"
                />
                <motion.div
                    className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent"
                    variants={overlayVariants}
                    initial="initial"
                    whileHover="hover"
                />
            </div>

            {/* Content */}
            <motion.div
                variants={contentVariants}
                className="p-20 flex flex-col grow"
            >
                {/* Info items */}
                <motion.div
                    variants={infoContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center gap-4 mb-4 text-amber-500/60"
                >
                    <motion.div
                        variants={infoItemVariants}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest"
                    >
                        <Clock size={12} /> {event.time}
                    </motion.div>
                    <motion.div
                        variants={infoItemVariants}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest"
                    >
                        <MapPin size={12} /> {event.location}
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h3
                    variants={titleVariants}
                    initial="initial"
                    whileHover="hover"
                    className="text-2xl font-bold text-white mb-4 tracking-tight transition-colors"
                >
                    {event.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-500 text-sm font-light leading-relaxed mb-8 line-clamp-3"
                >
                    {event.description}
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default EventCard;