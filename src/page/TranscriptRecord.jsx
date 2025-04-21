import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../socket';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { record } from '../utils/record.js'
import { FaCalendarDay } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { GoClockFill } from 'react-icons/go';
import { motion } from 'framer-motion';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `none`,

    backgroundColor: 'transparent',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: 'var(--accordion-header-text)' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'var(--accordion-header-bg)',
    color: 'var(--accordion-header-text)',
    transition: 'all 0.3s ease',


    margin: '5px 0',
    borderRadius: '10px',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    color: 'var(--text-color)',
    transition: 'all 0.3s ease',
}));



export default function TranscriptRecord() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const tdiv = useRef(null);
    const qdiv = useRef(null);


    const [expanded, setExpanded] = useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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

    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }



    function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        console.log('Emitting value to backend:', value); // Debug log

        socket.timeout(10000).emit('create-something', value, (err, response) => {
            if (err) {
                console.error('Error from backend:', err); // Handle error
            } else {
                console.log('Response from backend:', response); // Handle success
            }
            setIsLoading(false);
        });
    }





    useEffect(() => {
        function onConnect() { setIsConnected(true) }
        function onDisconnect() { setIsConnected(false) }
        function onFooEvent(value) { setFooEvents(previous => [...previous, value]) }
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);


    const [response, setResponse] = useState(null);
    useEffect(() => {
        // Listen for the "something-created" event from the server
        socket.on("something-created", (data) => {
            console.log("Received event:", data);
            setResponse(data);
        });

        return () => {
            socket.off("something-created"); // Clean up the listener
        };
    }, []);

    useEffect(() => {
        if (tdiv.current) {
            tdiv.current.scrollTo({ top: tdiv.current.scrollHeight, behavior: 'smooth' });
        }
        if (qdiv.current) {
            qdiv.current.scrollTo({ top: qdiv.current.scrollHeight, behavior: 'smooth' });
        }
    }, [record]);






    return (
        <div className="flex h-[calc(100dvh-60px)]">
            {/* <div className='w-8/12 bor'></div> */}

            <div ref={tdiv} className='w-7/12 h-full overflow-y-auto px-2 flex flex-col justify-start items-center'>
                <p className='text-2xl font-[600] mt-4'
                    onClick={() => {
                        tdiv.current.scrollIntoView({ behavior: 'smooth' });
                    }
                    }>All Hands Meeting</p>
                <div className="flex gap-x-4 justify-end mt-2 mb-4 px-2 w-full">
                    <p className='text-sm font-[400] text-[#757575] flex gap-x-1 items-baseline'><FaCalendarDay className='text-md' /> 2023-10-16</p>
                    <p className='text-sm font-[400] text-[#757575] flex gap-x-1 items-center'><GoClockFill className='text-md' />{convertMinutes("90")}</p>
                    <p className='text-sm font-[400] text-[#757575] flex gap-x-1 items-center'><IoIosPeople className='text-xl' />6</p>
                </div>
                {record.map((item, index) => (
                    <div key={index} className={`w-full px-2 flex items-start justify-start  rounded-lg p-1 my-1 hover:bg-[#f0f0f00a]`}>
                        <p className='text-lg font-[500] min-w-[100px]'>{item.speaker}:</p>
                        <p className='text-md font-[400] text-justify ml-4'>{item.message}</p>
                        {/* <motion.p
                            className='text-md font-[400] text-justify ml-4'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: index * 0.2, // Optional: Stagger effect for each message
                                duration: 1,
                                ease: 'easeInOut',
                            }}
                        >
                            {item.message.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }} // Delay for each letter
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.p> */}
                    </div>
                ))



                }

            </div>


            <div ref={qdiv} className='w-5/12 pb-[200px] h-full overflow-y-auto px-4 flex flex-col justify-start items-center'>
                <p className='text-2xl font-[600] py-4'>Questionnaire</p>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography component="span">Collapsible Group Item #1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography component="span">Collapsible Group Item #2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>




                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion><Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography component="span">Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam et ducimus id quasi distinctio exercitationem aperiam facere doloribus, voluptate voluptates dolores eius. Earum saepe libero inventore mollitia nobis, nemo adipisci architecto aliquam perferendis maiores deleniti dolorum, quas consectetur iste porro numquam accusantium labore explicabo reiciendis, recusandae non consequatur iusto. Inventore unde officia sed ipsa amet dolor! Non esse officiis, omnis qui dolore distinctio at eligendi accusamus soluta! Facilis quia adipisci hic corrupti veritatis necessitatibus magnam quibusdam quam consectetur perspiciatis unde, dolor cupiditate dicta in voluptatibus! Sed, beatae tenetur? Unde odio odit ex recusandae nemo amet vitae. Quia minus adipisci nesciunt!
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>


        </div>

    );
}