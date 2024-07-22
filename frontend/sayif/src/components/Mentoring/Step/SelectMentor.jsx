import S from './style/SelectMentorStyled'

function SelectMentor({formData}) {
    const SelectMentorView = (
        <S.Container>
            <div>신청 아이콘 보여줌</div>
            {/* <div>{formData.endDate}</div> */}
        </S.Container>
    )

    return SelectMentorView;
}

export default SelectMentor;