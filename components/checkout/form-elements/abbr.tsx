const Abbr = ({ required = false }: { required: boolean }) => {
  if (!required) {
    return null;
  }

  return (
    <abbr
      className="text-red-500"
      style={{ textDecoration: 'none' }}
      title="Обязательное поле"
    >
      *
    </abbr>
  );
};

export default Abbr;
