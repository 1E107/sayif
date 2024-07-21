import Calendar from "react-calendar";
import S from "./style/DateTimeStyled";
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState } from "react";


const StyledButton = styled(Button)`
    color: black !important;
    font-size: 20px !important;
    font-weight: 600 !important;
    padding: 0px 20px 0px 20px !important;
`;

const StyledCalendar = styled(Calendar)`
    border: none;
    background-color: #F5F5F5;
    border-radius: 0px 0px 10px 10px;
    width: 400px;
    padding: 10px;

    .react-calendar__navigation {
        height: 3.5rem;
        display: flex;
        text-align: center;
        align-items: center;
        padding: 0 10px;
        border: none;
    }
    
    .react-calendar__navigation__label {
        height: 1.375rem;
        font-size: 18px;
        border: none;
        font-weight: bold;
    }
    
    .react-calendar__navigation__prev-button {
        border: none;
        background-color: #fff;
        cursor: pointer;
        opacity: 0;
    }

    .react-calendar__tile--active {
        background: #E2F4C5;
        color: black;
    }

    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background: #416D19;
    }

    .react-calendar__tile--now {
        background: #E8E8CC;
    }
`;


function DateTime() 
{
    const [TextAMPM, setTextAMPM] = useState("오전");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleAMPM = () => {
        if(TextAMPM === '오전') setTextAMPM("오후");
        else setTextAMPM("오전");
    };

    const changeDate  = (event) => {
        const startDateFormat = moment(event[0]).format("YYYY/MM/DD");
        const endDateFormat = moment(event[1]).format("YYYY/MM/DD");

        setStartDate(startDateFormat);
        setEndDate(endDateFormat);
        // react에서 상태 업데이트가 비동기로 이루어지기 때문에 바로 startDate 호출하면 이전 값이 출력된다
        console.log(startDateFormat);
        console.log(endDateFormat);
    }

    const DateTimeView = (
        <>
            <S.Container>
                <S.DateTimeContainer>
                    <S.BOX>
                        <S.ContainerText>희망하는 멘토링 시작 일자가 언제인가요?</S.ContainerText>
                        <StyledCalendar 
                            onChange={changeDate}
                            formatDay={(locale, date) => moment(date).format("DD")}
                            selectRange={true}    
                        />
                    </S.BOX>
                    <S.BOX>
                        <S.ContainerText>희망하는 멘토링 시간이 언제인가요?</S.ContainerText>
                        <div style={{
                            backgroundColor: "#F5F5F5",
                        }}>
                            <IconButton aria-label="delete" size="large" style={{display: "inline-block", padding:"0px 5px 3px 0px"}} onClick={handleAMPM}>
                                <ChevronLeftIcon />
                            </IconButton>
                            <S.TimeSelectText>{TextAMPM}</S.TimeSelectText>
                            <IconButton aria-label="delete" size="large" style={{display: "inline-block", padding:"0px 0px 3px 5px"}} onClick={handleAMPM}>
                                <ChevronRightIcon />
                            </IconButton>
                        </div>
                        <S.TimeBlock>
                                <S.TimeBtn>
                                    <StyledButton>01:00</StyledButton>
                                    <StyledButton>02:00</StyledButton>
                                    <StyledButton>03:00</StyledButton>
                                </S.TimeBtn>
                                <S.TimeBtn>
                                    <StyledButton>04:00</StyledButton>
                                    <StyledButton>05:00</StyledButton>
                                    <StyledButton>06:00</StyledButton>
                                </S.TimeBtn>
                                <S.TimeBtn>
                                    <StyledButton>07:00</StyledButton>
                                    <StyledButton>08:00</StyledButton>
                                    <StyledButton>09:00</StyledButton>
                                </S.TimeBtn>
                                <S.TimeBtn>
                                    <StyledButton>10:00</StyledButton>
                                    <StyledButton>11:00</StyledButton>
                                    <StyledButton>12:00</StyledButton>
                                </S.TimeBtn>
                            </S.TimeBlock>
                    </S.BOX>
                </S.DateTimeContainer>

                <Button 
                variant="contained"
                style={{
                    fontFamily: "ChosunGu",
                    backgroundColor: "#116530",
                    width: "250px",
                    height: "50px",
                    float: "right",
                    margin: "30px 30px 80px 30px",
                }}>
                적용하기
                </Button>
            </S.Container>
        </>
    )

    

    return DateTimeView;

    
}

export default DateTime;