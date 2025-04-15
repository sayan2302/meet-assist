import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


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
}));


export default function Socket() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const [expanded, setExpanded] = useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };



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






    return (
        <div className="flex min-h-[calc(100dvh-60px)]">
            <div className='w-8/12 '>
                <p>State: {'' + isConnected}</p>
                <>
                    <button className='bor m-2' onClick={connect}>Connect</button>
                    <button className='bor m-2' onClick={disconnect}>Disconnect</button>
                </>

                <form onSubmit={onSubmit}>
                    <input onChange={e => setValue(e.target.value)} />
                    <button type="submit" disabled={isLoading}>Submit</button>
                </form>

                <h1>Response:</h1>
                {response && <p>{JSON.stringify(response?.transcript)}</p>}
            </div>

            <div className='w-4/12  px-2 flex flex-col justify-start items-center'>
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
            </div>
        </div>

    );
}