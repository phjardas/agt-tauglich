export type Data = {};

export type DataContext = {
  data?: Data;
  updateData: (updater: (data?: Data) => Data) => void;
};
