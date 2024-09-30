import React, { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  createBannerImage,
  deleteBannerImage,
  listBannerImage,
} from "../../Redux/Actions/BannerImageActions";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminBannerImagesScreen = () => {
  const dispatch = useDispatch();
  // Replace with your own cloud name
  // Replace with your own upload preset
  const bannerImageList = useSelector((state) => state.bannerImageList);
  const { loading, error, bannerImages } = bannerImageList;
  const [widget, setWidget] = useState({});

  useEffect(() => {
    setWidget(
      window.cloudinary.createUploadWidget(
        {
          cloudName: "hautaingy",
          uploadPreset: "jewel-upload",
        },
        async (error, result) => {
          if (result.event === "success") {
            await dispatch(createBannerImage(result.info.url));
            dispatch(listBannerImage());
          }
        }
      )
    );
  }, []);

  const showWidget = () => {
    widget.open();
  };

  useEffect(() => {
    console.log(bannerImages);
  }, [bannerImages]);

  useEffect(() => {
    dispatch(listBannerImage());
  }, []);

  const deletehandler = (id, name) => {
    if (
      window.confirm(`Are you sure you want to delete banner item #${name}?`)
    ) {
      dispatch(deleteBannerImage(id));
    }
  };

  //deleting product

  return (
    <div>
      <AdminHeader />
      <Toast />
      <div className="interface-container">
        <AdminSidebar />
        <div className="main-display">
          <div className="admin-main-container">
            <h2 className="admin-header">Edit Banner Items</h2>
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <React.Fragment>
                <div className="content-container">
                  <div className="admin-items-container">
                    <div className="admin-banner-area">
                      {bannerImages.length != 0 ? (
                        bannerImages.map((bannerImage, i) => (
                          <div className="banner-image-card" key={i}>
                            <div className="banner-image">
                              <img
                                className="banner-image-content"
                                src={bannerImage.imageUrl}
                                alt="bannerImage"
                              />
                            </div>
                            <div
                              className="fa fa trash-window"
                              onClick={() =>
                                deletehandler(bannerImage._id, String(i + 1))
                              }
                            >
                              <i className="icon fas fa-trash"></i>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>There are no banner images.</div>
                      )}
                    </div>
                    <div className="banner-upload-new">
                      <p>
                        Click the button below to upload a new banner image:
                      </p>

                      <button
                        className="banner-upload-new-button"
                        onClick={showWidget}
                      >
                        <i className="icon fas fa-arrow-up"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBannerImagesScreen;
