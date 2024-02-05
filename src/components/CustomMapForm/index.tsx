import { ChangeEvent, FormEvent, useState } from "react";

import styled from "@emotion/styled";

import { useDispatch } from "react-redux";
import {
  CustomMap,
  changeGameState,
  resetMap,
  setCustomMap,
} from "../../store/game/slice";

type Args = {
  initialValues: Record<string, string>;
  initializedErrors: Record<string, string> | null;
  submitForm: () => void;
  validateInput: (values: Record<string, string>) => Record<string, string>;
};

const useForm = ({
  initialValues,
  initializedErrors,
  submitForm,
  validateInput,
}: Args) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initializedErrors);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };

    const newErrors = validateInput(newValues);

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    setErrors(initializedErrors);
    setValues(newValues);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitForm();
  };

  return { values, errors, handleChange, handleSubmit };
};

type Props = {
  closeMenu: () => void;
};

export default function CustomMapForm({ closeMenu }: Props) {
  const dispatch = useDispatch();
  const initialValues = {
    width: "",
    height: "",
    numberOfMine: "",
  };
  const initializedErrors = {
    width: "",
    height: "",
    numberOfMine: "",
  };
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    initializedErrors,
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
    validateInput: (values: Record<string, string>): Record<string, string> => {
      const { width, height, numberOfMine } = values;

      if (width) {
        if (!/^\d+$/.test(width)) {
          initializedErrors.width = "숫자만 입력해 주세요";
        }

        if (width && Number(values.width) > 100) {
          initializedErrors.width = "100 이하의 숫자를 입력해 주세요";
        }
      }

      if (height) {
        if (!/^\d+$/.test(height)) {
          initializedErrors.height = "숫자만 입력해 주세요";
        }

        if (Number(values.height) > 100) {
          initializedErrors.height = "100 이하의 숫자를 입력해 주세요";
        }
      }

      if (numberOfMine) {
        if (!/^\d+$/.test(numberOfMine)) {
          initializedErrors.numberOfMine = "숫자만 입력해 주세요";
        }

        if (
          Number(values.numberOfMine) >
          Math.floor((Number(width) * Number(height)) / 3)
        ) {
          initializedErrors.numberOfMine = `${Math.floor(
            (Number(width) * Number(height)) / 3
          )}개 이하의 숫자를 입력해 주세요`;
        }
      }

      return initializedErrors;
    },
  });

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Fieldset>
        <S.Legend>
          <S.Title>맵의 크기를 설정하세요</S.Title>
        </S.Legend>
        <S.InputContainer>
          <S.Label htmlFor='width'>너비</S.Label>
          <S.Input
            type='text'
            id='width'
            name='width'
            value={values?.width}
            onChange={handleChange}
            required
          />
          <p>{errors?.width}</p>
        </S.InputContainer>
        <S.InputContainer>
          <S.Label htmlFor='height'>높이</S.Label>
          <S.Input
            type='text'
            id='height'
            name='height'
            value={values?.height}
            onChange={handleChange}
            required
          />
          {errors?.height}
        </S.InputContainer>
        <S.InputContainer>
          <S.Label htmlFor='numberOfMine'>지뢰의 수</S.Label>
          <S.Input
            type='text'
            id='numberOfMine'
            name='numberOfMine'
            value={values?.numberOfMine}
            onChange={handleChange}
            required
          />
          {errors?.numberOfMine}
        </S.InputContainer>
      </S.Fieldset>
      <S.Button type='submit'>시작하기</S.Button>
    </S.Form>
  );
}

const S = {
  Form: styled.form``,

  Fieldset: styled.fieldset`
    border: none;
  `,

  Legend: styled.legend``,

  Title: styled.p``,

  Description: styled.p``,

  InputContainer: styled.div`
    display: flex;
  `,

  Label: styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    font-size: 1.2rem;
  `,

  Input: styled.input``,

  Button: styled.button``,
};
