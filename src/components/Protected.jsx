import React from 'react'
import Header from './Header'
import { motion } from 'framer-motion'

const Protected = ({ component }) => {
    return (
        <>
            <Header />
            <motion.div
                className="pt-[60px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                {component}
            </motion.div>
        </>
    )
}

export default Protected
