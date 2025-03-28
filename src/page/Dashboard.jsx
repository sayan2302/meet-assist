import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineSort } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { prevMeetings } from '../utils/data.js';
import { BiExpandAlt } from "react-icons/bi";
import { BiCollapseAlt } from "react-icons/bi";
import { IoIosPeople, IoMdLogIn } from "react-icons/io";
import { FaCalendarDay } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";


const Dashboard = () => {

    const [isExpanded, setIsExpanded] = useState(window.innerWidth > 768);
    const [divHeight, setDivHeight] = useState(0); // State to store the height
    const divRef = useRef(null); // Ref to capture the div

    function convertMinutes(minutes) {
        if (minutes < 60) {
            return `${minutes} min${minutes > 1 ? 's' : ''}`;
        } else if (minutes % 60 === 0) {
            let hours = Math.floor(minutes / 60);
            return `${hours} hr${hours > 1 ? 's' : ''}`;
        } else {
            let hours = Math.floor(minutes / 60);
            let remainingMinutes = minutes % 60;
            return `${hours} hr${hours > 1 ? 's' : ''} ${remainingMinutes} min${remainingMinutes > 1 ? 's' : ''}`;
        }
    }



    useEffect(() => {
        const handleResize = () => {
            setIsExpanded(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (divRef.current) {
            setDivHeight(divRef.current.offsetHeight); // Capture the height of the div
        }
    }, [isExpanded]); // Recalculate height when `isExpanded` changes



    return (
        <div className=' w-full min-h-[calc(100dvh-60px)] overflow-x-clip flex flex-col md:flex-row  items-start justify-start'>

            {/* 🟡🟡🟡🟡 SECTION 2 🟡🟡🟡🟡 */}
            <div className='py-3 px-5 z-50  -mt-2 md:p-5 w-[100dvw] overflow-x-hidden  md:w-1/3 md:min-h-[calc(100dvh-60px)] borderx-l border-[var(--header-border)] fixed md:right-0  flex flex-col items-center justify-center'>
                {/* ADD BOT CARD */}
                <motion.div
                    ref={divRef}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, type: "spring", stiffness: 100 }}
                    exit={{ opacity: 0, x: 100 }}
                    layout
                    className='w-full md:w-[440px] md:h-[400px] relative py-3 px-2 md:py-12 md:px-6 bg-[var(--bg-card)] shadow-md border border-[var(--bg-main)] rounded-2xl md:rounded-3xl  '>

                    <p className='text-2xl md:text-4xl font-[500] text-[var(--primary)] md:text-end'>Add bot to meeting</p>
                    {isExpanded && <p className='border-4 mt-4'>Enter meeting URL</p>}
                    {isExpanded && <p className='border-4 mt-6'>Upload File</p>}
                    {isExpanded && <button
                        className='active:scale-95 mt-4 float-end text-[var(--button-text)] md:absolute rounded-md md:bottom-10 md:right-6 px-2 py-1 md:px-6 md:py-1 text-lg bg-[var(--button-color)]'>
                        Add
                    </button>}
                    {!isExpanded && <BiExpandAlt onMouseDown={() => setIsExpanded(!isExpanded)} className='md:hidden absolute top-5 right-4 cursor-pointer' />}
                    {isExpanded && <BiCollapseAlt onMouseDown={() => setIsExpanded(!isExpanded)} className='md:hidden absolute top-4 right-4 cursor-pointer' />}
                </motion.div>
            </div>


            {/* 🟡🟡🟡🟡 SECTION 1 🟡🟡🟡🟡 */}
            <div className={`w-[100dvw] md:w-2/3 z-10 overflow-x-hidden md:h-[calc(100dvh-60px)] mt-16 md:mt-0 p-5 md:pt-3 text-justify`}
                style={{ minHeight: `calc(100dvh - ${divHeight}px)` }}>
                {/* TITLE | SEARCH | SORT */}
                <div className='  sticky flex flex-col md:flex-row flex-wrap gap-y-3  items-center md:items-end md:justify-between  max-w-full mb-5'>
                    <h1 className='text-xl font-[400] md:ml-5'>PRIOR MEETINGS</h1>
                    <div className='flex flex-wrap max-w-full items-center justify-end md:justify-between gap-2'>
                        <div className="flex ">
                            <input
                                type="text"
                                placeholder="Search meetings..."
                                className="max-w-[70dvw] md:w-[300px] px-4 py-[4px] text-[var(--text-color)] bg-transparent border border-[var(--header-border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--header-border)]"
                            />
                            <button
                                className='active:scale-95 -ml-3 text-[var(--button-text)]  rounded-md  px-3 py-2 text-lg bg-[var(--button-color)]'>
                                <IoSearch />
                            </button>
                        </div>
                        <button
                            className=' active:scale-95 text-[var(--button-text)]  rounded-md  px-3 py-2 text-lg bg-[var(--button-color)]'>
                            <MdOutlineSort />
                        </button>
                    </div>
                </div>
                {/* LIST OF MEETINGS */}
                {/* <div className=' h-5'> */}
                <div className=''>
                    {
                        prevMeetings.map((meeting, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -700 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: { delay: 0.15 * index, duration: 0.1, type: "spring", stiffness: 50 },
                                }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.99, transition: { duration: 0 } }}
                                exit={{ scale: 1, transition: { duration: 0.01 } }}
                                className='relative cursor-pointer group flex flex-wrap items-center w-full mb-5 bg-[var(--bg-card)] rounded-2xl  shadow-md border border-[var(--bg-main)] p-4 gap-2'>

                                <h1 className='w-full md:w-1/2 text-lg font-[500] text-[var(--text-color)] group-hover:animate-pulse duration-100'>{meeting.title}</h1>

                                <p className='text-sm  font-[300] text-[var(--text-color)] flex items-center text-start w-40 gap-x-1 group-hover:animate-pulse duration-100'> <FaCalendarDay className='text-lg' />{meeting.date}</p>
                                <p className='text-sm  font-[300] text-[var(--text-color)] flex items-center text-start w-40 gap-x-1 group-hover:animate-pulse duration-100'><GoClockFill className='text-lg' /> {convertMinutes(meeting.duration)} </p>
                                <p className='text-sm  font-[300] text-[var(--text-color)] flex items-center text-start w-16 gap-x-1 group-hover:animate-pulse duration-100'><IoIosPeople className='text-2xl' /> {meeting.attendees}</p>
                                <IoMdLogIn className=' absolute right-2 bottom-2  md:right-2 text-[var(--primary)] group-hover:text-[var(--text-color)] group-hover:animate-pulse duration-100 text-[40px]' />
                            </motion.div>
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default Dashboard