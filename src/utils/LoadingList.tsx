// components/LoadingList.js
import Loading from "./loading";

const LoadingList = ({ count }:{count:number}) => {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-[10px] mt-[40px] w-full absolute top-0 left-0">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="w-full h-[200px] rounded-lg cursor-pointer bg-[grey]/20">
          <Loading />
        </div>
      ))}
    </div>
  );
};

export default LoadingList;
