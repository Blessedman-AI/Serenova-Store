const page = () => {
  const numbers = [2, 10, 5];
  const sum = numbers.reduce((acc, number) => acc + number, 0);

  console.log(sum);
  return (
    <div className="h-full flex item-center justify-center">
      <div className="">{sum}</div>
    </div>
  );
};

export default page;
