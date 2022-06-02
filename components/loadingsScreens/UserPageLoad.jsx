import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as vars from "../../vars"
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'



const ScrollingText = () => {
    return <div className="content">

        <div className="content__container">


            <ul className="content__container__list">
                <li className="content__container__list__item">paint the walls!</li>
                <li className="content__container__list__item">plaster the walls.</li>
                <li className="content__container__list__item">clean the walls.</li>
                <li className="content__container__list__item">feed the, walls?</li>
            </ul>
        </div>
    </div>
}

const Icon = (props) => (
    <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 286.3 286.3"
        height='100%'
        style={{ maxHeight: '60px' }}
        {...props}
    >
        <defs>
            <style>{`.cls-2{fill:${props.color}}`}</style>
        </defs>
        <g id="Logo">
            <path
                d="M224.31 364.7c6.38-5.08 12.24-14.76 11-23.12-.21-1.1-.67-1.05-1.59-.45-7.65 5.18-9.06 15.42-10.3 23.92.58.09.68-.18.89-.35Z"
                transform="translate(-154.87 -277.62)"
                style={{
                    stroke: "#eee",
                    strokeMiterlimit: 10,
                    fill: props.color,
                }}
            />
            <path
                className="cls-2"
                d="M199.75 377.22c2.57-.89 5.09-1.9 7.61-2.93a1.77 1.77 0 0 0 1.2-1.71 131.13 131.13 0 0 1 2.61-18.72c2.56-11.38 9.26-25.42 22.14-27.12l1 .05a5.91 5.91 0 0 0 2.37-.05h.48c.08.08.14.2.24.22a14.52 14.52 0 0 1 11.52 12.14c1.17 6.29-.26 12.2-2.55 18-4.17 10.56-11.63 18.23-21.29 23.84-2.32 1.35-3.44 2.67-3.47 5.53-.08 7.51-.37 15-.26 22.53q.09 6.5.32 13a1.16 1.16 0 0 0 2.28.28c8.57-28.69 23.3-71.21 54.14-81.91 41-12.26 46.36 34.31 45.46 63.86l-.14 2.18v1.45c0 .2.08.39.35.23 8.47-18.11 18.17-37.9 35.86-48.6a30.5 30.5 0 0 1 17.3-4.23c14.24.64 20.19 14.6 20.31 27.15.66 22.9-5.31 45.31-8.48 67.86-1.25 7.61-2.43 15.22-3 22.92s-.93 15.32.84 22.9c1.47 7.47 6.45 11.49 14.14 10.51 14.52-1.49 23-17.94 28.33-29.88 4.45-10.29 7.35-21.07 9.87-32a84.51 84.51 0 0 0 2.19-19.14V319.39a41.77 41.77 0 0 0-41.77-41.77H196.64a41.77 41.77 0 0 0-41.77 41.77v58.83a10.09 10.09 0 0 0 13.7 9.42c10.24-3.93 20.82-6.84 31.18-10.42Z"
                transform="translate(-154.87 -277.62)"
            />
            <path
                className="cls-2"
                d="M417.38 515.28c-5.16 3.27-11.12 5.45-17.29 5.21a15 15 0 0 1-2.42-.08c-23.21-.87-27.08-23.92-25.94-42.77 1.25-24.12 7-47.68 10.29-71.56 1.3-10.39 2.79-21.26.11-31.55-1.36-4.29-3.2-6.19-8.89-5.45-4.92.63-8.82 3.38-12.39 6.61-24.5 23.54-39.78 76-47.91 108.92-.72 5.16-6.16 8.69-10.82 5.55a6.35 6.35 0 0 1-3.1-6.3c.39-3.6 1.54-7.05 2.24-10.6 4.34-21.2 23.13-125-13.72-121-27.2 3.73-42.37 47.95-49.4 70.92a401.55 401.55 0 0 0-13 62c-.93 7.86-12.68 8-13.65 0-2.6-31.93-4.09-64-3.58-96-10.62 3.74-21.28 6.82-31.82 10.7-7.44 2.85-21.33 8.34-21.2 17.66v104.61a41.77 41.77 0 0 0 41.77 41.77H399.4a41.77 41.77 0 0 0 41.77-41.77v-18.86a4.93 4.93 0 0 0-9-2.79 53.9 53.9 0 0 1-14.79 14.78Z"
                transform="translate(-154.87 -277.62)"
            />
        </g>
    </svg>
)



const variants2 = {
    open: { clipPath: 'circle(50px)', duration: 2, y: 0, opacity: 1, fill: vars.MAIN_WHITE, background: [vars.LIGHT_GREY, vars.MAIN_BLUE], },
    closed: { clipPath: 'circle(0px)', opacity: 0, y: 20, fill: vars.LIGHT_GREY, background: [vars.MAIN_BLUE, vars.GREY], }
}
const textVariant = {
    open: { y: 0, opacity: 1 },
    closed: { y: 10, opacity: 0 }
}

const Cont = styled(motion.div)`
    height:100%;
    /* background-color:${vars.MAIN_E}; */
    width:100%;
    align-items: center;
    justify-content: center;
    display: flex;
    `

export default function UserPageLoad(props) {
    const [exitAnimation, setExitAnimation] = useState(false)
    const [isPageDark, setIsPageDark] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (router.pathname == '/accounts/login' ||
            router.pathname == '/accounts/resetpassword' ||
            router.pathname == '/' ||
            router.pathname == '/accounts/signup') {
            setIsPageDark(false)
        }

        if (props.loading) {
            setExitAnimation(true)
        }
    }, [props.loading])

    return (
        <div style={{
            background: vars.GREY,
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            flexDirection: 'column',
            display: 'flex',
            position: "fixed",
            zIndex: 10,
            top: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center'

        }}> <Cont
            animate={!props.loading ? "open" : "closed"}

            style={{ background: vars.GREY, }}
            variants={variants2}
            transition={{ duration: props.loading ? .3 : .7 }}
            initial={'open'}

        > <Icon

                    color={vars.MAIN_WHITE}
                />
            </Cont>

            <motion.div
                style={{
                    flexDirection: 'column',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
                height={"60px"}
                animate={!props.loading ? "open" : "closed"}
                variants={textVariant}
                initial={'open'}
            >
                {/* <p style={{ color: vars.MAIN_WHITE, fontWeight: '500', position: 'absolute', top: '60%' }}>
                    PLEASE WAIT WHILE WE
                </p>
                <ScrollingText /> */}
            </motion.div>


        </div >
    )
}
