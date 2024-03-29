import React, { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { itemDetail, updateItem } from "../../Redux/Actions/ItemActions";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useParams } from "react-router";
import { ITEM_UPDATE_RESET } from "../../Redux/Constants/ItemConstants";
import { Link } from "react-router-dom";

const AdminItemsDetailsScreen = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [subImages, setSubImages] = useState([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [interiorFeatures, setInteriorFeatures] = useState([]);
  const [exteriorFeatures, setExteriorFeatures] = useState([]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [mapIframe, setMapIframe] = useState("");
  const dispatch = useDispatch();

  const itemDetailState = useSelector((state) => state.itemDetail);
  const { loading, error, item } = itemDetailState;

  const itemUpdate = useSelector((state) => state.itemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = itemUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ITEM_UPDATE_RESET });
    } else {
      if (!item.name || item._id !== id) {
        dispatch(itemDetail(id));
      } else {
        setName(item.name);
        setPrice(item.price);
        setType(item.type);
        setMainImage(item.mainImage);
        setSubImages(item.subImages);
        setStreet(item.street);
        setCity(item.city);
        setCountry(item.country);
        setInteriorFeatures(item.interiorFeatures);
        setExteriorFeatures(item.exteriorFeatures);
        setBedrooms(item.bedrooms);
        setBathrooms(item.bathrooms);
        setDescription(item.description);
        setSize(item.size);
        setMapIframe(item.mapIframe);
      }
    }
  }, [item, dispatch, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateItem({
        _id: id,
        name,
        price,
        type,
        mainImage,
        subImages,
        street,
        city,
        country,
        interiorFeatures,
        exteriorFeatures,
        bedrooms,
        bathrooms,
        description,
        size,
        mapIframe,
      })
    );
  };
  const handleCurrency = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d.]/g, "");
    const formattedValue = `$${Number(inputValue).toLocaleString("en")}.00TTD`;
    setPrice(formattedValue);
  };
  const handleCoords = (e) => {
    const input = e.target.value.trim();
    const regex = /^(\s*-?\d+(\.\d*)?|\.\d+)\s*,\s*(-?\d+(\.\d*)?|\.\d+)\s*$/;
    if (regex.test(input)) {
      const [firstNum, secondNum] = input.split(",");
      const num1 = Number(firstNum);
      const num2 = Number(secondNum);
      const formattedNums = `${num1},${num2}`;
      setMapIframe(formattedNums);
    } else {
      setMapIframe("0,0");
    }
  };
  const handleAddInteriorFeature = () => {
    const featureValue = window.prompt("Enter an interior feature:");

    if (featureValue) {
      setInteriorFeatures([...interiorFeatures, featureValue]);
    }
  };

  const handleRemoveInteriorFeature = (indexToRemove) => {
    setInteriorFeatures((prevFeatures) =>
      prevFeatures.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleAddExteriorFeature = () => {
    const featureValue = window.prompt("Enter an exterior feature:");

    if (featureValue) {
      setExteriorFeatures([...exteriorFeatures, `${featureValue}`]);
    }
  };

  const handleRemoveExteriorFeature = (indexToRemove) => {
    setExteriorFeatures((prevFeatures) =>
      prevFeatures.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleAddSubImage = () => {
    const subImageLocation = window.prompt("Enter a subImage Location:");

    if (subImageLocation) {
      setSubImages([...subImages, subImageLocation]);
    }
  };

  const handleRemoveSubImage = (indexToRemove) => {
    setSubImages((prevSubImage) =>
      prevSubImage.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      <AdminHeader />
      <Toast />
      <div className="interface-container">
        <AdminSidebar />
        <div className="main-display">
          <div className="admin-main-container">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <h3>{error}</h3>
            ) : (
              <React.Fragment>
                <div className="mb-5 admin-top-initial-container">
                  <h2 className="admin-header admin-inline">
                    Editing: {item.name}
                  </h2>
                  <Link className="admin-header-backlink" to="/admin/items">
                    Go to Items
                  </Link>
                </div>
                <form onSubmit={submitHandler}>
                  <h3 className="admin-form-heading mb-3">
                    General Information
                  </h3>
                  <div className="mb-4 row">
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_name" className="form-label">
                        Item Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Name of Product"
                        className="form-control"
                        id="item_name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_price" className="form-label">
                        Price of Property
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Price of Product"
                        className="form-control"
                        id="item_price"
                        required
                        value={price}
                        onBlur={handleCurrency}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_type" className="form-label">
                        Type
                      </label>
                      <select
                        id="item_type"
                        className="form-select"
                        aria-label="Item type list"
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                      >
                        <option value="home">Home</option>
                        <option value="rent">Rental</option>
                        <option value="building">Building</option>
                        <option value="land">Land</option>
                      </select>
                    </div>
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_street" className="form-label">
                        Street
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Street for Product"
                        className="form-control"
                        id="item_street"
                        required
                        value={street}
                        onChange={(e) => {
                          setStreet(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Enter City for Product"
                        className="form-control"
                        id="item_city"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_country" className="form-label">
                        Country
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Country for Product"
                        className="form-control"
                        id="item_country"
                        required
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="admin-form-heading mb-3">Features</h3>
                  <div className="mb-4 row">
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_interior" className="form-label">
                        Interior Features
                      </label>
                      {interiorFeatures &&
                        interiorFeatures.map((feature, index) => (
                          <div key={index}>
                            <span>{feature}</span>
                            <button
                              type="button"
                              className="admin-times"
                              onClick={() => handleRemoveInteriorFeature(index)}
                            >
                              <i className="fa fa-times"></i>
                            </button>
                          </div>
                        ))}
                      <div>
                        <button
                          type="button"
                          className="admin-plus"
                          onClick={handleAddInteriorFeature}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_exterior" className="form-label">
                        Exterior Features
                      </label>
                      {exteriorFeatures &&
                        exteriorFeatures.map((feature, index) => (
                          <div key={index}>
                            <span>{feature}</span>
                            <button
                              type="button"
                              className="admin-times"
                              onClick={() => handleRemoveExteriorFeature(index)}
                            >
                              <i className="fa fa-times"></i>
                            </button>
                          </div>
                        ))}
                      <div>
                        <button
                          type="button"
                          className="admin-plus"
                          onClick={handleAddExteriorFeature}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  {type !== "land" && (
                    <div className="mb-4 row">
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label htmlFor="item_bedrooms" className="form-label">
                          Bedrooms
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Number of Bathrooms"
                          className="form-control"
                          id="item_bedrooms"
                          value={bedrooms}
                          onChange={(e) => setBedrooms(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label htmlFor="item_bathrooms" className="form-label">
                          Bathrooms
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Number of Bathrooms"
                          className="form-control"
                          id="item_bathrooms"
                          value={bathrooms}
                          onChange={(e) => {
                            setBathrooms(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-4 row">
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_size" className="form-label">
                        Size (sq ft)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Size"
                        className="form-control"
                        id="item_size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_map" className="form-label">
                        Item Map Coordinates (Lat,Lng)
                      </label>

                      <input
                        type="text"
                        placeholder="Enter Item Coordinates"
                        className="form-control"
                        id="item_map"
                        value={mapIframe}
                        onBlur={handleCoords}
                        onChange={(e) => {
                          setMapIframe(e.target.value);
                        }}
                      />
                      <p>
                        Right click on Google map to get values:{" "}
                        <a
                          target="_blank"
                          href="https://www.google.com/maps/@10.4840912,-61.3655086,10z"
                        >
                          Click to see map.
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 row">
                    <div className="col-lg-12 p-2">
                      <label htmlFor="item_description" className="form-label">
                        Description
                      </label>

                      <textarea
                        id="item_description"
                        placeholder="Enter Description"
                        className="form-control"
                        rows="6"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <h3 className="admin-form-heading mb-3">Images</h3>
                  <div className="mb-4 row">
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_mainImage" className="form-label">
                        Main Image
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Main Image Location"
                        className="form-control"
                        id="item_mainImage"
                        value={mainImage}
                        onChange={(e) => setMainImage(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_subImages" className="form-label">
                        Secondary Images
                      </label>
                      {subImages &&
                        subImages.map((subImage, index) => (
                          <div key={index}>
                            <span>{subImage}</span>
                            <button
                              type="button"
                              className="admin-times"
                              onClick={() => handleRemoveSubImage(index)}
                            >
                              <i className="fa fa-times"></i>
                            </button>
                          </div>
                        ))}
                      <div>
                        <button
                          type="button"
                          className="admin-plus"
                          onClick={handleAddSubImage}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 d-flex center">
                    <button type="submit" className="btn jewel-btn-orange">
                      Update Item
                    </button>
                  </div>
                </form>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminItemsDetailsScreen;
