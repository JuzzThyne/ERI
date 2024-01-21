import React, { useEffect, useState } from "react";
import { fetchItems } from "../redux/itemSlice";
import { useDispatch, useSelector } from "react-redux";

const SeachItem = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { items, isLoading, currentPage, totalPages } = useSelector(
    (state) => state.item
  );
  const token = useSelector((state) => state.auth.token);
  const [loadedImages, setLoadedImages] = useState([]);

  const handleImageLoad = (itemId) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, itemId]);
  };

  useEffect(() => {
    dispatch(fetchItems({ searchTerm, token }));
  }, [dispatch, searchTerm, token]);

  return (
    <section className="flex h-auto flex-col gap-4">
      <div className="flex">
        <div className="py-2 px-2 w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
        {isLoading && <div className="text-center h-screen">Loading...</div>}
        {!isLoading && (items === null || items.length === 0) && (
          <div className="text-center h-screen">No Data Found</div>
        )}
        {!isLoading && items && (
          <div className="flex flex-wrap justify-center w-full overflow-hidden gap-2">
            {items.map((item) => (
              <div key={item.itemId} className="bg-pink-300 rounded-md shadow">
                {loadedImages.includes(item.itemId) ? (
                  <img
                    src={item.itemPhotoUrl[0]}
                    alt=""
                    className="w-[160px] h-32 object-fill rounded-2xl p-2"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={item.itemPhotoUrl[0]}
                    alt=""
                    className="w-[160px] h-32 object-fill rounded-2xl p-2 blur"
                    loading="lazy"
                    onLoad={() => handleImageLoad(item.itemId)}
                  />
                )}
                <div className="flex flex-col w-[160px] justify-center items-center">
                  <p className="overflow-hidden font-bold text-lg uppercase px-1 whitespace-normal">
                    {item.itemName}
                  </p>
                  <p className="flex m-4 justify-center items-center text-red-400 text-sm">Price: {item.itemPrice}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      <div className="flex justify-between my-4">
        <div>
          <span className="mr-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-2 py-1 bg-green-400 text-white rounded-md"
            disabled={currentPage === 1}
            onClick={() =>
              dispatch(fetchItems({ searchTerm, token, page: currentPage - 1 }))
            }
          >
            Previous
          </button>
          <button
            className="px-2 py-1 ml-2 bg-green-400 text-white rounded-md"
            disabled={currentPage === totalPages}
            onClick={() =>
              dispatch(fetchItems({ searchTerm, token, page: currentPage + 1 }))
            }
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SeachItem;
