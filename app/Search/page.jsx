import {BiSearch} from "react-icons/bi"

export default function Search() {
    return (
        <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8 ">
             <div className="font-MyFont flex divide-x justify-between items-center text-xl mr-auto md:text-2xl my-1  w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent ">
        {" "}
      Search Here
      <BiSearch/>
      </div>
        </div>
    );
}