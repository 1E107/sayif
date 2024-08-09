import S from './style/CreateStyled';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../../styles/fonts.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalMentor, submitMentoringGroup } from '../../api/MentoringApi';
import CreateFinish from './CreateFinish';

function Create() {
    const [otherMentor, SetOtherMentor] = useState('');
    const [selectDays, SetSelectDays] = useState([]);
    const [selectDate, SetSelectDate] = useState(dayjs().format('YYYY-MM-DD')); // 기본 날짜 설정
    const [selectTime, SetSelectTime] = useState('09:00'); // 기본 시간 설정
    const [selectPMAM, SetSelectPMAM] = useState('오전'); // 기본 PMAM 설정
    const navigate = useNavigate();
    const { token, member } = useSelector(state => state.member);
    const [showFinish, SetShowFinish] = useState(false);
    const [showApply, SetShowApply] = useState(true);
    const [mentorList, SetMentorList] = useState([]);

    useEffect(() => {
        const callTotalMentor = async () => {
            try {
                const response = await getTotalMentor(token);
                if (response.status === 200) {
                    SetMentorList(response.data);
                    // 첫 번째 멘토를 기본값으로 설정
                    if (response.data.length > 0) {
                        SetOtherMentor(response.data[0].username);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        callTotalMentor();
    }, [token]);

    const handleClick = day => {
        SetSelectDays(prevDays => {
            if (prevDays.includes(day)) {
                return prevDays.filter(d => d !== day); // day(클릭한 날짜)와 같지 않으면 배열에 넣기
            } else {
                return [...prevDays, day]; // selectDays 배열에 포함되어 있지 않으면 추가
            }
        });
    };

    const handleChangeMentor = event => {
        SetOtherMentor(event.target.value);
    };

    const handleChangePMAM = event => {
        SetSelectPMAM(event.target.value);
    };

    const handleChangeTime = event => {
        SetSelectTime(event.target.value);
    };

    const handleChangeDate = date => {
        SetSelectDate(dayjs(date).format('YYYY-MM-DD'));
    };

    const handleCancleBtn = () => {
        navigate('/');
    };

    const handleCompleteBtn = () => {
        if (!selectDate) {
            alert('멘토링 시작 날짜를 선택하세요.');
            return;
        }
        if (selectDays.length === 0) {
            alert('멘토링 요일을 선택하세요.');
            return;
        }
        if (!selectTime) {
            alert('멘토링 시간을 선택하세요.');
            return;
        }
        if (!otherMentor) {
            alert('멘토를 선택하세요.');
            return;
        }

        const daysString = selectDays.join(', ');

        const callSubmitGroupd = async () => {
            try {
                const response = await submitMentoringGroup(
                    selectDate,
                    daysString,
                    selectTime,
                    selectPMAM,
                    otherMentor,
                    token,
                );
                if (response.status === 200) {
                    alert('멘토링 그룹 신청이 완료되었습니다.');
                    SetShowApply(false);
                    SetShowFinish(true);
                }
            } catch (error) {
                console.log(error);
            }
        };
        callSubmitGroupd();
    };

    const optionsTime = [
        { value: '01:00', label: '01:00' },
        { value: '02:00', label: '02:00' },
        { value: '03:00', label: '03:00' },
        { value: '04:00', label: '04:00' },
        { value: '05:00', label: '05:00' },
        { value: '06:00', label: '06:00' },
        { value: '07:00', label: '07:00' },
        { value: '08:00', label: '08:00' },
        { value: '09:00', label: '09:00' },
        { value: '10:00', label: '10:00' },
        { value: '11:00', label: '11:00' },
        { value: '12:00', label: '12:00' },
    ];

    return (
        <>
            <S.Title>멘토 그룹 생성</S.Title>
            <S.ExplainText>
                멘토링을 같이 할 멤버를 선택해 멘토링을 꾸려보세요.
            </S.ExplainText>
            {showApply && (
                <>
                    <S.Container>
                        <S.CustomTable>
                            <tbody>
                                <tr>
                                    <S.CustomTdTitle>
                                        멘토링 팀원
                                    </S.CustomTdTitle>
                                    <S.CustomTdContent>
                                        <div style={{ display: 'flex' }}>
                                            <S.MentorTitle
                                                style={{
                                                    margin: '0px 20px 10px 0px',
                                                }}
                                            >
                                                팀장
                                            </S.MentorTitle>
                                            <div>{member.nickname}</div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <S.MentorTitle
                                                style={{
                                                    margin: '10px 20px 0px 0px',
                                                }}
                                            >
                                                팀원
                                            </S.MentorTitle>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl
                                                    style={{ width: '100px' }}
                                                >
                                                    <NativeSelect
                                                        value={otherMentor}
                                                        onChange={
                                                            handleChangeMentor
                                                        }
                                                        style={{
                                                            fontFamily:
                                                                'ChosunGu',
                                                        }}
                                                    >
                                                        {mentorList.map(
                                                            mentor => (
                                                                <option
                                                                    key={
                                                                        mentor.username
                                                                    }
                                                                    value={
                                                                        mentor.username
                                                                    }
                                                                >
                                                                    {
                                                                        mentor.nickname
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </NativeSelect>
                                                </FormControl>
                                            </Box>
                                        </div>
                                    </S.CustomTdContent>
                                </tr>
                                <tr>
                                    <S.CustomTdTitle>
                                        멘토링 시작 날짜
                                    </S.CustomTdTitle>
                                    <S.CustomTdContent>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DemoContainer
                                                components={['DatePicker']}
                                            >
                                                <DatePicker
                                                    value={dayjs(selectDate)}
                                                    format="YYYY/MM/DD"
                                                    onChange={handleChangeDate}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </S.CustomTdContent>
                                </tr>
                                <tr>
                                    <S.CustomTdTitle>
                                        멘토링 요일
                                    </S.CustomTdTitle>
                                    <S.CustomTdContent>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '10px',
                                            }}
                                        >
                                            {[
                                                '월',
                                                '화',
                                                '수',
                                                '목',
                                                '금',
                                                '토',
                                                '일',
                                            ].map(day => (
                                                <S.CustomDayBtn
                                                    key={day}
                                                    variant="outlined"
                                                    style={{
                                                        backgroundColor:
                                                            selectDays.includes(
                                                                day,
                                                            )
                                                                ? '#C6D0BE'
                                                                : 'white',
                                                    }}
                                                    onClick={() => {
                                                        handleClick(day);
                                                    }}
                                                >
                                                    {day}
                                                </S.CustomDayBtn>
                                            ))}
                                        </div>
                                    </S.CustomTdContent>
                                </tr>
                                <tr>
                                    <S.CustomTdTitle>
                                        멘토링 시간
                                    </S.CustomTdTitle>
                                    <S.CustomTdContent>
                                        <div style={{ display: 'flex' }}>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl
                                                    style={{ width: '100px' }}
                                                >
                                                    <NativeSelect
                                                        value={selectPMAM} // 기본 PMAM 값 설정
                                                        style={{
                                                            fontFamily:
                                                                'ChosunGu',
                                                        }}
                                                        onChange={
                                                            handleChangePMAM
                                                        }
                                                    >
                                                        <option value={'오전'}>
                                                            오전
                                                        </option>
                                                        <option value={'오후'}>
                                                            오후
                                                        </option>
                                                    </NativeSelect>
                                                </FormControl>
                                            </Box>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl
                                                    style={{ width: '100px' }}
                                                >
                                                    <NativeSelect
                                                        value={selectTime} // 기본 시간 값 설정
                                                        style={{
                                                            fontFamily:
                                                                'ChosunGu',
                                                        }}
                                                        onChange={
                                                            handleChangeTime
                                                        }
                                                    >
                                                        {optionsTime.map(
                                                            option => (
                                                                <option
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </NativeSelect>
                                                </FormControl>
                                            </Box>
                                        </div>
                                    </S.CustomTdContent>
                                </tr>
                            </tbody>
                        </S.CustomTable>
                    </S.Container>
                    <S.BtnGroup>
                        <S.CustomCancelBtn
                            variant="contained"
                            onClick={handleCancleBtn}
                        >
                            취소
                        </S.CustomCancelBtn>
                        <S.CustomRegistBtn
                            variant="contained"
                            onClick={handleCompleteBtn}
                        >
                            완료
                        </S.CustomRegistBtn>
                    </S.BtnGroup>
                </>
            )}
            {showFinish && <CreateFinish />}
        </>
    );
}

export default Create;
