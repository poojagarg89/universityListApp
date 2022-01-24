import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../common-components/HeaderComponent';
import { Carousel } from 'react-responsive-carousel';
import Img1 from '../../assets/img1.jpg';
import Img2 from '../../assets/img2.jpg';
import Img3 from '../../assets/img3.jpg';
import CardComponent from '../../common-components/CardComponent';
import PlacementImg from '../../assets/placementImg.png';
import CourseImg from '../../assets/courseImg.png';
import StaffImg from '../../assets/staffImg.png';
import UpdateImg from '../../assets/updatesImg.png';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../common-components/DataTable';
import columnHeader from '../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getUniversityDetails } from '../../action/action';
import transformUniversityList from '../../utlis/Transform';
import SearchIcon from '../../assets/search-icon.svg';
import ClearIcon from '../../assets/closeIcon.svg';
import LoaderImg from '../../assets/loader.svg';

export default function Home() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const loginDetails = state && state.name;
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState('');
  const [tableData, setTableData] = useState('');
  const filterColumns = ['universityName', 'country', 'website'];

  useEffect(() => {
    dispatch(getUniversityDetails());
  }, [dispatch]);

  const getUniversityListDetails = useSelector(state => state.getUniversityDetails);
  const universityList = getUniversityListDetails && getUniversityListDetails.universityDetails;

  const transformUniversityDetails = transformUniversityList(universityList);
  const isLoading = getUniversityListDetails && getUniversityListDetails.isFetching;
  const onSearchChange = val => {
    const lowercasedValue = val.toLowerCase().trim();
    setSearchVal(lowercasedValue);
    if (lowercasedValue === '') {
      setTableData(transformUniversityDetails);
    } else {
      const filteredData =
        transformUniversityDetails &&
        transformUniversityDetails.filter(item => {
          return Object.keys(item).some(key =>
            filterColumns.includes(key) ? item[key].toString().toLowerCase().includes(lowercasedValue) : false,
          );
        });
      setTableData(filteredData);
    }
  };

  const onSearchTextClear = () => {
    setSearchVal('');
    setTableData(transformUniversityDetails);
  };

  const onSubscribeClick = () => {
    navigate('/subscription');
  };
  return (
    <div className="home-details">
      <HeaderComponent showUser={state && state.name} />
      <div className="carousel-main">
        <Carousel autoPlay={true} interval={5000} showArrows={false} showStatus={false} showThumbs={false}>
          <div>
            <img src={Img1} alt="Not Available" className="carousel-image" />
          </div>
          <div>
            <img src={Img2} alt="Not Available" className="carousel-image" />
          </div>
          <div>
            <img src={Img3} alt="Not Available" className="carousel-image" />
          </div>
        </Carousel>
      </div>
      {loginDetails === null && (
        <div className="card-component-main">
          <CardComponent imageProp={CourseImg} cardHeader="Online Courses" />
          <CardComponent imageProp={StaffImg} cardHeader="Meet our Staff" />
          <CardComponent imageProp={UpdateImg} cardHeader="Latest Updates" />
          <CardComponent imageProp={PlacementImg} cardHeader="Placements" />
        </div>
      )}
      {loginDetails && (
        <>
          <div className="search-section">
            <div className="university-search-input">
              <img src={SearchIcon} alt="search-icon" className="university-search-icon" />
              <input
                onChange={event => onSearchChange(event.target.value)}
                value={searchVal}
                className="university-search"
                placeholder="Search by Name, Country, Website"
              />
              {searchVal && (
                <img src={ClearIcon} alt="clear-icon" onClick={onSearchTextClear} className="university-search-clear" />
              )}
            </div>
          </div>

          <div className="subscribe-btn-section">
            <button onClick={onSubscribeClick} className="subscribe-btn">
              Subscribe
            </button>
          </div>

          {isLoading ? (
            <img src={LoaderImg} alt="loader-img" className="loader-img" />
          ) : (
            <div className="table-details">
              {transformUniversityDetails && transformUniversityDetails.length > 0 && (
                <DataTable tableCols={columnHeader} tableData={tableData || transformUniversityDetails} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
