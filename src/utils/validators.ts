export const validators = {
  input: (values: Record<string, string>): Record<string, string> => {
    const { width, height, numberOfMine } = values;
    const errors = {
      width: "",
      height: "",
      numberOfMine: "",
    };

    if (width) {
      if (!/^\d+$/.test(width)) {
        errors.width = "숫자만 입력해 주세요";
      }

      if (width && Number(width) > 100) {
        errors.width = "100 이하의 숫자를 입력해 주세요";
      }
    }

    if (height) {
      if (!/^\d+$/.test(height)) {
        errors.height = "숫자만 입력해 주세요";
      }

      if (Number(height) > 100) {
        errors.height = "100 이하의 숫자를 입력해 주세요";
      }
    }

    if (numberOfMine) {
      if (!/^\d+$/.test(numberOfMine)) {
        errors.numberOfMine = "숫자만 입력해 주세요";
      }

      if (
        Number(numberOfMine) > Math.floor((Number(width) * Number(height)) / 3)
      ) {
        errors.numberOfMine = `${Math.floor(
          (Number(width) * Number(height)) / 3
        )}개 이하의 숫자를 입력해 주세요`;
      }
    }

    return errors;
  },

  form: (values: Record<string, string>): string => {
    const { width, height, numberOfMine } = values;

    if (Number(width) < 1) return "1 이상의 숫자를 입력해 주세요";
    if (Number(height) < 1) return "1 이상의 숫자를 입력해 주세요";
    if (Number(numberOfMine) < 1) return "1 이상의 숫자를 입력해 주세요";

    return "";
  },
};
