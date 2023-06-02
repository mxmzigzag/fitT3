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
  protein: ((weight * protein) / 100).toFixed(2),
  fat: ((weight * fat) / 100).toFixed(2),
  carbohydrate: ((weight * carbohydrate) / 100).toFixed(2),
});
