import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components'
import * as vars from '../../vars'
import { LoginContext } from '../../pages/_app';
import Profile from '../compounds/Profile';
import timeStampToHumanTime from '../../services/timestamptotime';
import Link from 'next/link'
const Wrapper = styled.div`
    width:100%;
        /* padding-right:40px; */
        position: fixed;
        z-index: 90;
        top:60px;
        right:0;
        @media (max-width: 650px) {
            height:100%;
  }
`


const DisplayBox = styled.div`
    width:400px;
    position: relative;
    margin:10px;
    height:fit-content;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
padding-bottom:10px;
        z-index: 30;
        right:0;
    border-radius:4px;
    background-color: ${vars.LIGHT_GREY};
  border:solid 1px ${vars.LIGHER_GREY};
    @media (max-width: 650px) {
        margin:0px;
        border:none;

    width:100%;
    border-radius:0px;
    height: 100%;

  }
  
    `
const Details = styled.div`
    margin-left:15px;


    color:${vars.MAIN_WHITE};
    & a{
        transition: all 0.2s;
        cursor:pointer;
        font-weight: 500;
        :hover{
            color:${vars.ORANGE};}
    }
    & #walldate{
        transition: all 0.2s;
        display: inline;
        cursor:pointer;
        font-weight: 500;
        :hover{
            color:${vars.ORANGE};}
    }

    & span{
        display: inline-block;
        opacity: .8;
    } 
    `

const Notification = styled.div`
    height:65px;
    /* padding:5px; */
    line-height:20px;
    padding-inline:20px;
  display: flex;
  align-items: center;
    width:100%;
    border-bottom:1px solid ${vars.LIGHER_GREY};
    `


const NotificationTemplatePrimary = (props) => {


    if (props.username != null) return <Notification>
        <Profile padding={2} height={'40px'} width={'40px'} />
        <Details>
            <Link href={`/u/${props.username}`}>
                <a>
                    @{props.username}
                </a>
            </Link>

            {props.details}<br />
            <div id="walldate" >{props?.date?.substring(0, 10)}

            </div>
            <span >
                &nbsp;
                {`- ${props.time} ago.`}

            </span>

        </Details>
    </Notification>
}

const Notifications = (props) => {

    const LoggedInUser = useContext(LoginContext)

    const getWallIDAndReturnSince = (id) => {
        let returnSince;
        LoggedInUser.walls.map(({ _id, since }) => {
            if (_id == id) {
                returnSince = since
            }
        })
        return returnSince
    }

    return (
        <Wrapper {...props}>
            <DisplayBox>
                {

                    (LoggedInUser?.notifications.length) ?
                        LoggedInUser?.notifications.map((notification) => {
                            if (notification.action == 'like') {
                                return <NotificationTemplatePrimary
                                    username={notification.from}
                                    time={timeStampToHumanTime(Date.now() - Date.parse(notification.since))}
                                    details={' liked a wall you posted on the '}
                                    date={getWallIDAndReturnSince(notification.message)}
                                />

                            }
                            return null
                        })
                        : null
                }

                <NotificationTemplatePrimary />
            </DisplayBox>
        </Wrapper>
    );
}

export default Notifications;
