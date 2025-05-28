export const getBalanceController = (address: string) => {
  return address;
};

export const getTokenBalanceController = (
  address: string,
  tokenAddress: string
) => {
  return {
    address,
    tokenAddress,
  };
};
