import Link from "next/link";
import { BsBoxSeam,BsCartCheck } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";

export default function Wishlist(params) {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8  ">
      <h1 className="font-main text-xl my-4 font-semibold mr-auto md:text-2xl ">
        {" "}
        My Cart
      </h1>
   
        <table className="w-full table-fixed  ">
          <thead className=" place-items-center divide-x divide-y font-MyFont bg-bggray font-bold  rounded w-full">
            <tr>
              <th className="w-2/5">Books Title</th>
              <th className="w-1/5 ">Price</th>
              <th className="w-1/5  ">Quantity</th>
              <th className="w-1/5  ">Total</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

          <div className="flex flex-col justify-center items-center my-32 text-lg font-MyFont">
            <BsBoxSeam className="icon-w opacity-50" />
            <span>Cart is Empty!</span>
          </div>
          <div className="mt-6 mx-auto flex items-center justify-between ">
            <Link
              className="text-link hidden items-center underline decoration-dashed underline-offset-8 hover:decoration-solid md:inline-flex font-MyFont opacity-60"
              href="/"
            >
              {" "}
              <MdArrowBackIos />
              Continue Shopping
            </Link>
            <button
              type="button"
              className="bg-textgray text-white w-full flex justify-center py-2 px-2 mt-2 font-MyFont text-lg font-medium md:w-auto md:rounded md:py-1"
            >
                <BsCartCheck className="mt-1 mr-3"/>
              <span>Checkout</span>
            </button>
          </div>
    </div>
  );
}
