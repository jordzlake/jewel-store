import React, { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { itemCreate } from "../../Redux/Actions/ItemActions";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";

const AdminAddItemScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("home");
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

  const itemCreateState = useSelector((state) => state.itemCreate);
  const { loading, error, item } = itemCreateState;

  useEffect(() => {
    if (item) {
      setName("");
      setPrice("");
      setType("");
      setMainImage("");
      setSubImages([]);
      setStreet("");
      setCity("");
      setCountry("");
      setInteriorFeatures([]);
      setExteriorFeatures([]);
      setBedrooms(0);
      setBathrooms(0);
      setDescription("");
      setSize("");
      setMapIframe("");
    }
  }, [item, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      itemCreate(
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
        mapIframe
      )
    );
    console.log(
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
      mapIframe
    );
  };
  const handleCurrency = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d.]/g, "");
    const formattedValue = `$${Number(inputValue).toLocaleString("en")}.00TTD`;
    setPrice(formattedValue);
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
                  <h2 className="admin-header admin-inline">Add New Item</h2>
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
                        Item Map Coordinates
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Item Coordinates"
                        className="form-control"
                        id="item_map"
                        value={mapIframe}
                        onChange={(e) => {
                          setMapIframe(e.target.value);
                        }}
                      />
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
                      Add Item
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

export default AdminAddItemScreen;
