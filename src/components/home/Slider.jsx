import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

import image1 from "../../assets/images/background1.jpg"
import image2 from "../../assets/images/background2.jpg"
import image3 from "../../assets/images/background3.jpg"

const Item = ({ title, image }) => <div>

    <div className="container1" style={{ background: "rgba(55, 55, 55, 0.3)", }}>
        <img src={image} alt="" style={{ maxHeight: "100vh"}} />


        <div className="overlay1">
            <h1>{title}</h1>
        </div>
    </div>

</div>

const items = [
    // { title: "afsgsgerg", text: "dfsgergergeq", image: image1 },
    // { title: "fewewf", text: "few", image: image1 },
    // { title: "afsgsgeewewrweg", text: "eewewf", image: image1 },
    <Item title={"Welcome to DK Learning"} image={image1} />,
    <Item title={"The best learning platform"}  image={image2}/>,
    <Item title={"The best learning platform"}  image={image3}/>
]

export const Slider = () => {
    const [step, setStep] = useState(0)

    const next = () => {
        setStep(prev => (prev + 1) % items.length)
    }

    const prev = () => {
        setStep(prev => (prev - 1 + items.length) % items.length)
    }

    const handlers = useSwipeable({
        onSwipedLeft: next,
        onSwipedRight: prev,
        delta: 60
    })

    useEffect(() => {
        const interval = setInterval(() => next(), 3000)

        return () => clearInterval(interval)
    }, [step])

    return (
        <div {...handlers}>
            <AnimatePresence mode="popLayout">
                <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {items[step]}
                </motion.div>
            </AnimatePresence>
        </div>

    )
}