import Calendar from "react-calendar";
import S from "./style/DateTimeStyled";
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

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
`;

function DateTime() 
{
    const DateTimeView = (
        <>
            <S.Container>
                <S.DateContainer>
                    <S.ContainerText>희망하는 맨토링 시작 일자가 언제인가요?</S.ContainerText>
                    <StyledCalendar 
                        formatDay={(locale, date) => moment(date).format("DD")}
                        selectRange={true}    
                    />
                </S.DateContainer>
            </S.Container>
        </>
    )

    

    return DateTimeView;

    
}

export default DateTime;