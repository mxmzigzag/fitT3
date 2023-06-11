import { formatValue } from ".";

type calcIngredientWithWeightProps = {
  carbohydrate: number;
  fat: number;
  protein: number;
  weight: number;
};

export const calcIngredientWithWeight = ({
  weight,
  protein,
  fat,
  carbohydrate,
}: calcIngredientWithWeightProps) => ({
  protein: formatValue((weight * protein) / 100),
  fat: formatValue((weight * fat) / 100),
  carbohydrate: formatValue((weight * carbohydrate) / 100),
});
