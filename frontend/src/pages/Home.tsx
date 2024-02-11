import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import { motion } from "framer-motion";



const Home = () => {
    
  return (
        <motion.div 
            className='flex flex-col py-6 gap-8 pl-6'
            initial='hidden'
            whileInView='visible'
            viewport={{ once:true, amount:0.5 }}
            transition={{ duration:0.5 }}
            variants={{
                hidden: { opacity:0, x:-50 },
                visible: { opacity:1, x:0 }
            }}
            >
                {/* {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))} */}
        </motion.div>
  )
}

export default Home