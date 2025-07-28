interface IParameters {
  idx: number;
  startIdx: number;
  widthKline: number;
  gap: number;
}

export const calculateXCoordinateHelper = ({
  idx, startIdx, widthKline, gap,
}: IParameters) => {
  const result = (idx - startIdx) * (widthKline + gap);

  return result;
};
