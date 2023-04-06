import React, { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { itemCreate } from "../../Redux/Actions/ItemActions";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import imageCompression from "browser-image-compression";

const AdminAddItemScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("$0.00TTD");
  const [type, setType] = useState("home");
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([null, null, null]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [interiorFeatures, setInteriorFeatures] = useState([]);
  const [exteriorFeatures, setExteriorFeatures] = useState([]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [mapIframe, setMapIframe] = useState("0,0");

  const [imagePreview, setImagePreview] = useState(["", "", "", ""]);

  const dispatch = useDispatch();

  const itemCreateState = useSelector((state) => state.itemCreate);
  const { loading, error, item } = itemCreateState;

  /* useEffect(() => {
    if (item) {
      setName("");
      setPrice("");
      setType("home");
      setMainImage(null);
      setSubImages([null, null, null]);
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
      setImagePreview(["", "", "", ""]);
    }
  }, [item, dispatch]); */

  const submitHandler = (e) => {
    e.preventDefault();

    const jsonString = JSON.stringify({
      name: name,
      price: price,
      type: type,
      street: street,
      city: city,
      country: country,
      interiorFeatures: [...interiorFeatures],
      exteriorFeatures: [...exteriorFeatures],
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      description: description,
      size: size,
      mapIframe: mapIframe,
    });
    const formData = new FormData();
    formData.append("data", jsonString);

    formData.append("mainImage", mainImage);
    for (let i = 0; i < subImages.length; i++) {
      formData.append("subImages", subImages[i]);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(itemCreate(formData));
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

  //Image Code

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];

    const options = {
      maxSizeMB: 10,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      /* console.log(
        "Size",
        (compressedFile.size / 1024 / 1024).toFixed(2) + " MB"
      ); */
      setMainImage(compressedFile);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        let temp = [...imagePreview];
        temp[0] = reader.result;
        setImagePreview([...temp]);
      };
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubImageChange = async (e, i) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 10,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      /* console.log(
        "Size",
        (compressedFile.size / 1024 / 1024).toFixed(2) + " MB"
      ); */
      let imtemp = [...subImages];
      imtemp[i - 1] = compressedFile;
      setSubImages([...imtemp]);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        let temp = [...imagePreview];
        temp[i] = reader.result;
        setImagePreview([...temp]);
      };
    } catch (error) {
      console.log(error);
    }
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
              <React.Fragment>
                <h3>
                  Add Unsuccessful: Images may be too large or the following
                  occurred: {error}
                </h3>
                <Link
                  className="admin-header-backlink"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.reload();
                  }}
                  to="/admin/addItem"
                >
                  Go back to Add Item Screen
                </Link>
              </React.Fragment>
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

                  {/* Images */}
                  <h3 className="admin-form-heading mb-3">Images</h3>
                  <div className="mb-4 row align-items-center">
                    <div className="col-lg-6 col-sm-12 p-2">
                      <label htmlFor="item_mainImage" className="form-label">
                        Main Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="item_mainImage"
                        onChange={handleMainImageChange}
                        required
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 p-2 previewImage">
                      {imagePreview[0] && (
                        <img
                          src={imagePreview[0]}
                          alt="chosen"
                          className="imPreview"
                        />
                      )}
                    </div>
                  </div>
                  {mainImage && (
                    <div className="mb-4 row align-items-center">
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label
                          htmlFor="item_subImage_zero"
                          className="form-label"
                        >
                          Additional Image 1 (Optional)
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="item_subImage_zero"
                          onChange={(e) => handleSubImageChange(e, 1)}
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2 previewImage">
                        {imagePreview[1] && (
                          <img
                            src={imagePreview[1]}
                            alt="chosen"
                            className="imPreview"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {subImages[0] && (
                    <div className="mb-4 row align-items-center">
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label
                          htmlFor="item_subImage_one"
                          className="form-label"
                        >
                          Additional Image 2 (Optional)
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="item_subImage_one"
                          onChange={(e) => handleSubImageChange(e, 2)}
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2 previewImage">
                        {imagePreview[2] && (
                          <img
                            src={imagePreview[2]}
                            alt="chosen"
                            className="imPreview"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {subImages[1] && (
                    <div className="mb-4 row align-items-center">
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label
                          htmlFor="item_subImage_two"
                          className="form-label"
                        >
                          Additional Image 3 (Optional)
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="item_subImage_two"
                          onChange={(e) => handleSubImageChange(e, 3)}
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2 previewImage">
                        {imagePreview[3] && (
                          <img
                            src={imagePreview[3]}
                            alt="chosen"
                            className="imPreview"
                          />
                        )}
                      </div>
                    </div>
                  )}

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
