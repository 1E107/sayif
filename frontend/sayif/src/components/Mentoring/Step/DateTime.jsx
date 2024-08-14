import Calendar from 'react-calendar';
import S from './style/DateTimeStyled';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState } from 'react';

const StyledButton = styled(Button)`
  font-size: 20px !important;
  font-weight: 600 !important;
  padding: 0px 20px 0px 20px !important;
`;

const StyledCalendar = styled(Calendar)`
  border: none;
  background-color: #f5f5f5;
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
    cursor: pointer;
  }

  .react-calendar__tile--active {
    background: #e2f4c5;
    color: black;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #416d19;
  }

  .react-calendar__tile--now {
    background: #e8e8cc;
  }
`;

function DateTime({ selectInfoSave }) {
    const [TextAMPM, setTextAMPM] = useState('오전');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [time, setTime] = useState('');
    const [mentorList, setMentorList] = useState([]);
    const [isSelect, SetIsSelect] = useState('');

    const handleAMPM = () => {
        if (TextAMPM === '오전') {
            setTextAMPM('오후');
        } else {
            setTextAMPM('오전');
        }
    };

    const handleNextBtn = () => {
        // 1. 서버로 시작 날짜(시작~종료), 시간 전달하고 멘토 리스트 받아오기
        //mentorSave("please input mentor list"); // 2. 서버에서 받아온 멘토 리스트 넣기
        selectInfoSave({
            TextAMPM: TextAMPM,
            startDate: startDate,
            endDate: endDate,
            time: time,
            mentorList: [],
        });
    };

    const changeDate = event => {
        const startDateFormat = moment(event[0]).format('YYYY/MM/DD');
        const endDateFormat = moment(event[1]).format('YYYY/MM/DD');

        setStartDate(startDateFormat);
        setEndDate(endDateFormat);
    };

    const changeTime = data => {
        SetIsSelect(data);
        setTime(data);
        console.log(isSelect);
    };

    const DateTimeView = (
        <>
            <S.Container>
                <S.Icon />
                <div>
                    <S.DateTimeContainer>
                        <S.BOX>
                            <S.ContainerText>
                                희망하는 멘토링 시작 일자가 언제인가요?
                            </S.ContainerText>
                            <StyledCalendar
                                onChange={changeDate}
                                formatDay={(locale, date) =>
                                    moment(date).format('DD')
                                }
                                selectRange={true}
                            />
                        </S.BOX>
                        <S.BOX>
                            <S.ContainerText>
                                희망하는 멘토링 시간이 언제인가요?
                            </S.ContainerText>
                            <div
                                style={{
                                    backgroundColor: '#F5F5F5',
                                    paddingTop: '20px',
                                }}
                            >
                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    style={{
                                        display: 'inline-block',
                                        padding: '0px 5px 3px 0px',
                                    }}
                                    onClick={handleAMPM}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>
                                <S.TimeSelectText>{TextAMPM}</S.TimeSelectText>
                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    style={{
                                        display: 'inline-block',
                                        padding: '0px 0px 3px 5px',
                                    }}
                                    onClick={handleAMPM}
                                >
                                    <ChevronRightIcon />
                                </IconButton>
                            </div>
                            <S.TimeBlock>
                                <S.TimeBtn>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('01:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '01:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        01:00
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('02:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '02:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        02:00
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('03:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '03:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        03:00
                                    </StyledButton>
                                </S.TimeBtn>
                                <S.TimeBtn>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('04:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '04:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        04:00
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('05:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '05:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        05:00
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('06:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '06:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        06:00
                                    </StyledButton>
                                </S.TimeBtn>
                                <S.TimeBtn>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('07:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '07:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        07:00
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('08:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '08:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        08:00
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('09:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '09:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        09:00
                                    </StyledButton>
                                </S.TimeBtn>
                                <S.TimeBtn>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('10:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '10:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        10:00
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('11:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '11:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        11:00
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() => {
                                            changeTime('12:00');
                                        }}
                                        style={{
                                            color:
                                                isSelect === '12:00'
                                                    ? '#116530'
                                                    : 'black',
                                        }}
                                    >
                                        12:00
                                    </StyledButton>
                                </S.TimeBtn>
                            </S.TimeBlock>
                        </S.BOX>
                    </S.DateTimeContainer>
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={handleNextBtn}
                        style={{
                            fontFamily: 'ChosunGu',
                            backgroundColor: '#116530',
                            width: '200px',
                            height: '50px',
                            margin: '30px 30px 80px 30px',
                            fontSize: '17px',
                        }}
                    >
                        다음
                    </Button>
                </div>
            </S.Container>
        </>
    );

    return DateTimeView;
}

export default DateTime;
