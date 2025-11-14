interface FuncType {
  func: (num: number) => void;
}

const SideBar = ({ func }: FuncType) => {
  const changePage = (page: number) => {
    func(page);
  };

  return (
    <div className="border-r-2 border-gray-100 mt-3 text-lg md:text-xl">
      <button
        onClick={() => changePage(1)}
        className="py-3 border-b-1 border-t-1 border-gray-200 w-full hover:cursor-pointer hover:bg-green-100"
      >
        Адреси
      </button>
      <button
        onClick={() => changePage(2)}
        className="py-3 border-b-1  border-gray-200 w-full hover:cursor-pointer hover:bg-green-100"
      >
        Пристрої
      </button>
      <button
        onClick={() => changePage(3)}
        className="py-3 border-b-1  border-gray-200 w-full hover:cursor-pointer hover:bg-green-100"
      >
        Сценарії
      </button>
      <button
        onClick={() => changePage(4)}
        className="py-3 border-b-1  border-gray-200 w-full hover:cursor-pointer hover:bg-green-100"
      >
        ЛОГІ
      </button>
    </div>
  );
};

export default SideBar;
