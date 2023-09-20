import Link from "next/link";
import { BsBoxSeam, BsCartDash } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";

export default function Wishlist(params) {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8  ">
      <h1 className="font-main text-xl my-4 font-semibold mr-auto md:text-2xl ">
        {" "}
        My Cart
      </h1>
      <div className="my-4 lg:grid lg:grid-cols-3 lg:gap-x-6">
        <div className="table-wrapper lg:col-span-2 w-full divide-y ">
          <div className="lg:min-h-[20.25rem] ">
            <table className="w-full">
              <thead className="hidden place-items-center divide-x divide-y font-MyFont bg-bggray font-bold  rounded w-full md:table-header-group">
                <tr>
                  <th colSpan="2" className="w-[42.5%] py-1">
                    Book Title
                  </th>
                  <th className="w-[17.5%] py-1 md:text-right">Price</th>
                  <th className="w-[17.5%] py-1">Quantity</th>
                  <th colSpan="2" className="w-[22.5%] py-1">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <Link
            className="text-link hidden items-center underline decoration-dashed underline-offset-8 hover:decoration-solid lg:inline-flex font-MyFont opacity-60"
            href="/"
          >
            {" "}
            <MdArrowBackIos />
            Continue Shopping
          </Link>
        </div>
      
          <div className="others flex flex-col lg:my-0 font-MyFont divide-y">
            <div className="pb-4">
            <label htmlFor="order-notes" className="mb-1 font-sans font-semibold">
              Order Notes
            </label>
            <textarea
              id="order-notes"
              name="order-notes"
              rows="4"
              className="block w-full rounded border-2 my-1 md:pr-10  border-gray-300 bg-primary font-normal outline-skin-accent py-1 px-2 outline-skin-accent"
            ></textarea>
          </div>
          <div className="coupon-code-wrapper py-4 ">
            <label htmlFor="coupon-code" className="mb-1 font-sans font-semibold">
              Coupon Code
            </label>
            <input
              type="text"
              id="coupon-code"
              className="block w-full rounded border-2 my-1 md:pr-10  border-gray-300 bg-primary font-normal outline-skin-accent py-1 px-2 outline-skin-accent"
            ></input>
            <span className="font-MyFont text-sm italic opacity-70">
              Coupon code will be applied on the checkout
            </span>
          </div>
          <button
            type="button"
            className="border-gray-400 my-2 w-full rounded border-2 py-1 font-MyFont shadow hover:shadow-md lg:hidden"
          >
            Continue Shopping
          </button>
          <div className="font-sans text-lg lg:block mt-4">
          <div className="mb-4 flex items-baseline justify-between py-4">
          <span className="text-base">Total Price :</span>
          <span className="font-semibold">0 &#x20B9;</span>
          </div>
          <button
              type="button"
              className="bg-textgray text-white w-full flex justify-center py-2 px-2 mt-2 font-MyFont text-lg font-medium md:rounded md:py-1"
            >
                <BsCartDash className="mt-1 mr-3"/>
              <span>Checkout</span>
            </button>
        </div>
        </div>

       

      </div>

      {/* <table className="w-full table-fixed  ">
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
          </div> */}
    </div>
  );
}
