import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineSort } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { prevMeetings } from '../utils/data.js';
import { BiExpandAlt } from "react-icons/bi";
import { BiCollapseAlt } from "react-icons/bi";

const Dashboard = () => {

    const [isExpanded, setIsExpanded] = useState(false)
    const [divHeight, setDivHeight] = useState(0); // State to store the height
    const divRef = useRef(null); // Ref to capture the div

    useEffect(() => {
        if (divRef.current) {
            setDivHeight(divRef.current.offsetHeight); // Capture the height of the div
        }
    }, [isExpanded]); // Recalculate height when `isExpanded` changes



    return (
        <div className=' w-full min-h-screen bor overflow-x-clip flex flex-col md:flex-row  items-start justify-start'>

            {/* 🟡🟡🟡🟡 SECTION 2 🟡🟡🟡🟡 */}
            <div className='pt-3  px-5 md:p-5 w-[100dvw] overflow-x-hidden  md:w-1/3 md:min-h-[calc(100dvh-60px)] border-l border-[var(--header-border)] md:fixed md:right-0  flex flex-col items-center justify-center'>
                {/* ADD BOT CARD */}
                <motion.div
                    ref={divRef}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1, }}
                    layout
                    className='w-full md:w-[440px] md:h-[400px] relative py-3 px-2 md:py-12 md:px-6 bg-[var(--bg-card)] shadow-md border border-[var(--bg-main)] rounded-2xl md:rounded-3xl  '>

                    <p className='text-2xl md:text-4xl font-[500] text-[var(--primary)] md:text-end'>Add bot to meeting</p>
                    {isExpanded && <p className='border-4 mt-4'>Enter meeting URL</p>}
                    {isExpanded && <p className='border-4 mt-6'>Upload File</p>}
                    {isExpanded && <button
                        className='active:scale-95 mt-4 float-end text-[var(--button-text)] md:absolute rounded-md md:bottom-10 md:right-6 px-2 py-1 md:px-6 md:py-1 text-lg bg-[var(--button-color)]'>
                        Add
                    </button>}
                    {!isExpanded && <BiExpandAlt onMouseDown={() => setIsExpanded(!isExpanded)} className='md:hidden absolute top-5 right-4' />}
                    {isExpanded && <BiCollapseAlt onMouseDown={() => setIsExpanded(!isExpanded)} className='md:hidden absolute top-4 right-4' />}
                </motion.div>
            </div>


            {/* 🟡🟡🟡🟡 SECTION 1 🟡🟡🟡🟡 */}
            <div className={`w-[100dvw] md:w-2/3  overflow-x-hidden md:min-h-[calc(100dvh-60px)]  p-5 text-justify`}
                style={{ minHeight: `calc(100vh - ${divHeight}px)` }}>
                {/* TITLE | SEARCH | SORT */}
                <div className='flex flex-col md:flex-row flex-wrap gap-y-3 items-center md:justify-between  w-full mb-5'>
                    <h1>PRIOR MEETINGS</h1>
                    <div className='flex items-center justify-between gap-2'>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search meetings..."
                                className="md:w-[300px] px-4 py-[4px] text-white bg-transparent border border-[var(--header-border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--header-border)]"
                            />
                            <button
                                className='active:scale-95 -ml-3 text-[var(--button-text)]  rounded-md  px-3 py-2 text-lg bg-[var(--button-color)]'>
                                <IoSearch />
                            </button>
                        </div>
                        <button
                            className='active:scale-95 text-[var(--button-text)]  rounded-md  px-3 py-2 text-lg bg-[var(--button-color)]'>
                            <MdOutlineSort />
                        </button>
                    </div>
                </div>
                {/* LIST OF MEETINGS */}
                <div className=' h-5'>
                    {
                        prevMeetings.map((meeting, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -700 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.5, type: "spring", stiffness: 50 }}
                                className=' w-full mb-4 bg-[var(--bg-card)] rounded-2xl md:rounded-3xl shadow-md border border-[var(--bg-main)] p-4 flex flex-col gap-2'>
                                <h1 className='text-lg font-[500] text-[var(--primary)]'>{meeting.title}</h1>
                                <p className='text-sm opacity-80 font-[200] text-[var(--primary)]'>Date: {meeting.date}</p>
                                <p className='text-sm opacity-80 font-[200] text-[var(--primary)]'>Duration: {meeting.duration}</p>
                                <p className='text-sm opacity-80 font-[200] text-[var(--primary)]'>Attendees: {meeting.attendees}</p>
                            </motion.div>
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default Dashboard