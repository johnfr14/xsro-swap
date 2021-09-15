const SubstrAdress = ({ dataAdress }) => {
  return dataAdress.substr(0, 6) + "..." + dataAdress.substr(-4);
};

export default SubstrAdress;
