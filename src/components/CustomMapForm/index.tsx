import styled from "@emotion/styled";

import { useDispatch } from "react-redux";
import {
  CustomMap,
  changeGameState,
  resetMap,
  setCustomMap,
} from "../../store/game/slice";

import { validators } from "../../utils/validators";
import { useForm } from "../../hooks/useForm";

type Props = {
  closeMenu: () => void;
};

export default function CustomMapForm({ closeMenu }: Props) {
  const dispatch = useDispatch();
  const { values, inputErrors, formError, handleChange, handleSubmit } =
    useForm({
      initialValues: {
        width: "",
        height: "",
        numberOfMine: "",
      },
      initializedErrors: {
        width: "",
        height: "",
        numberOfMine: "",
      },
      submitForm: () => {
        dispatch(
          setCustomMap({
            customMap: (values as CustomMap) ?? {
              width: "8",
              height: "8",
              numberOfMine: "10",
            },
          })
        );
        dispatch(resetMap());
        dispatch(changeGameState({ state: "pause" }));
        closeMenu();
      },
      validateInput: validators.input,
      validateForm: validators.form,
    });

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Fieldset>
        <S.Legend>
          <S.Title>맵의 크기를 설정하세요</S.Title>
        </S.Legend>
        <S.InputLabelContainer>
          <S.Label htmlFor='width'>너비</S.Label>
          <S.InputContainer>
            <S.Input
              type='text'
              id='width'
              name='width'
              value={values?.width}
              onChange={handleChange}
              required
            />
            <S.ErrorText>{inputErrors?.width}</S.ErrorText>
          </S.InputContainer>
        </S.InputLabelContainer>
        <S.InputLabelContainer>
          <S.Label htmlFor='height'>높이</S.Label>
          <S.InputContainer>
            <S.Input
              type='text'
              id='height'
              name='height'
              value={values?.height}
              onChange={handleChange}
              required
            />
            <S.ErrorText>{inputErrors?.height}</S.ErrorText>
          </S.InputContainer>
        </S.InputLabelContainer>
        <S.InputLabelContainer>
          <S.Label htmlFor='numberOfMine'>지뢰의 수</S.Label>
          <S.InputContainer>
            <S.Input
              type='text'
              id='numberOfMine'
              name='numberOfMine'
              value={values?.numberOfMine}
              onChange={handleChange}
              required
            />
            <S.ErrorText>{inputErrors?.numberOfMine}</S.ErrorText>
          </S.InputContainer>
        </S.InputLabelContainer>
      </S.Fieldset>
      <S.ButtonContainer>
        <S.Button type='submit'>시작하기</S.Button>
        <S.ErrorText>{formError}</S.ErrorText>
      </S.ButtonContainer>
    </S.Form>
  );
}

const S = {
  Form: styled.form`
    width: 400px;
    padding: 20px;
  `,

  Fieldset: styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;

    border: none;
  `,

  Legend: styled.legend`
    width: 100%;
    margin-bottom: 40px;
  `,

  Title: styled.p`
    width: 100%;

    font-size: 2.4rem;
    font-weight: 600;
    text-align: center;
  `,

  InputLabelContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  InputContainer: styled.div`
    width: 260px;
    height: 32px;
  `,

  Label: styled.label`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 2rem;
    font-weight: 500;
  `,

  Input: styled.input`
    width: 100%;
    margin-bottom: 4px;

    font-size: 2rem;
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Button: styled.button`
    padding: 12px 20px;

    font-size: 2rem;
    border-radius: 4px;
    border-top: 2px solid white;
    border-left: 2px solid white;
    border-bottom: 2px solid #8b8b8b;
    border-right: 2px solid #8b8b8b;
  `,

  ErrorText: styled.p`
    font-size: 1.6rem;
    color: red;
  `,
};
