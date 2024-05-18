import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = "https://shipwall.au/WCF_API_HTTPS_LIVE";
const baseURL2 = "https://shipwall.au/API/shipwall";

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  let token = localStorage.getItem("usersdatatoken7");

  const [isLogIn, setIsLogIn] = useState(true);
  const [loginData, setLoginData] = useState({});
  const [BPdata, setBPdata] = useState([]);
  const [singleBPdata, setsingleBPdata] = useState({});
  // for unapproved
  const [BPudata, setBPudata] = useState([]);
  const [BPrdata, setBPrdata] = useState([]);
  const [singleBPudata, setsingleBPudata] = useState({});
  // end unapproved
  const [BPpostData, setBPpostData] = useState({});
  const [createLoading, setCreateloading] = useState(false);
  const [itemdata, setItemdata] = useState([]);
  const [itemGroupdata, setItemGroupdata] = useState([]);
  const [singleItemdata, setsingleItemdata] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const [bpGroupList, setBpGroupList] = useState([]);
  const [approvdata, setApprovdata] = useState({});
  const [logindiable, setLogindisable] = useState(false);
  const [docData, setDocData] = useState([]);
  const [complaintListData, setComplainListData] = useState([]);
  const [SuggestionListData, setSuggestionListData] = useState([]);
  const [BPVlist, setBPVlist] = useState([]);
  const [attributeList, setAttributeList] = useState([]);
  const [itemMatrixList, setItemMatrixList] = useState([]);
  const [seconditemMatrics, setSecondItemMatrics] = useState([]);
  const [itemAttributeList, setItemAttributeList] = useState([]);
  const [syncLoading, setSyncLoading] = useState(false);
  const [bannerList, setbannerList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [cmslist, setCmsList] = useState([]);
  const [fleshNewsList , setFleshNewsList] = useState([])


  // const slp = localStorage.getItem("slp")
  const access = localStorage.getItem("access7");
  const base_url = "https://shipwall.au/API/shipwall";
  const generateAndSaveToken = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/api/Token`,
        {
          client_id: "htSm-ShIpwall",
          client_secret: "XZCnoaS3b!TAV$HERlloe)HjK4QR4%TzC",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;

      const token = data.token;
      localStorage.setItem("access7", token);
    } catch (error) {
      console.error(error);
    }
  };

  const startTokenGeneration = () => {
    generateAndSaveToken();
    setInterval(generateAndSaveToken, 9 * 60 * 1000);
  };
  startTokenGeneration();

  const LoginUser = async (user, pass) => {
    if (!user || !pass) {
      toast.error("All fields are required");
      return;
    } else {
      try {
        setLogindisable(true);

        const response = await fetch(`${baseURL2}/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user,
            password: pass,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setLoginData(data);
          localStorage.setItem("log7", JSON.stringify(data));
          toast.success(data.message);
          navigate("/home-page");
          setIsLogIn(true);
        } else {
          console.log(data);
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Server Down");
      } finally {
        setLogindisable(false);
      }
    }
  };

  const BPPost = async (
    CardName,
    GroupCode,
    mobile,
    email,
    address1,
    address2,
    block,
    city,
    zip,
    state,
    cuntry,
    building,
    CountryCode,
    StateCode,
    Street,
    StreetNo,
    selectedAddress
  ) => {
    const generateRandomPassword = (length) => {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
      let password = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
      }

      return password;
    };
    try {
      setCreateloading(true);

      const response = await axios.post(
        `${baseURL}/PostBusinessPartner`,
        {
          as_UserId: "manager",
          as_UserPass: "Admin@123",
          BP: {
            Balance: 0.0,
            CardCode: "",
            CardName,
            CardType: "L",
            Cellular: mobile,
            E_Mail: email,
            GroupCode,
            BillToDef: selectedAddress.value === "BILL" ? "BILL" : "",
            ShipToDef: selectedAddress.value === "Sgh" ? "Sgh" : "",
            // SlpCode: slp,
            Addresses: [
              {
                Address: selectedAddress.value,
                Address2: address1,
                Address3: address2,
                AdresType: selectedAddress.value === "BILL" ? "B" : "S",
                Block: block,
                Building: building,
                City: city,
                County: cuntry,
                StateName: state,
                CountryCode,
                StateCode,
                Street,
                StreetNo,
                ZipCode: zip,
              },
            ],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;

      if (data.ai_MessageId === 0) {
        setBPpostData(data);
        toast.success(data.as_Message);
        getBP();
        getUnApprovedBP();
        navigate("/customer-ulist");
      } else {
        console.log(data);
        toast.error(data.as_Message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCreateloading(false);
    }
  };

  const ApproveandReject = async (id, status, resion) => {
    try {
      const response = await fetch(
        `${baseURL2}/api/v1/customer/approve-reject/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
            rejection_reason: resion,
          }),
        }
      );

      const res = await response.json();

      if (response.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/customer-ulist");
    }
  };

  const customerUppdateApprove = async (id, cardCode) => {
    try {
      const response = await fetch(
        `${baseURL2}/api/v1/customer/card-code/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardCode: cardCode,
          }),
        }
      );

      const res = await response.json();

      if (response.ok) {
        // toast.success(res.message)
        getUnApprovedBP();
      } else {
        // toast.error(res.message)
      }
    } catch (error) {}
  };

  const BpUpdate = async (
    CardCode,
    CardName,
    GroupCode,
    mobile,
    email,
    address1,
    address2,
    block,
    city,
    zip,
    state,
    cuntry,
    building,
    CountryCode,
    StateCode,
    Street,
    StreetNo,
    selectedAddress
  ) => {
    try {
      setCreateloading(true);

      const response = await axios.post(
        `${baseURL}/PostBusinessPartner`,
        {
          as_UserId: "manager",
          as_UserPass: "Admin@123",
          BP: {
            Balance: 0.0,
            CardCode: CardCode,
            CardName: CardName,
            CardType: "C",
            Cellular: mobile,
            E_Mail: email,
            GroupCode: GroupCode,
            BillToDef: selectedAddress.value === "BILL" ? "BILL" : "",
            ShipToDef: selectedAddress.value === "Sgh" ? "Sgh" : "",
            // SlpCode: slp,
            Addresses: [
              {
                Address: selectedAddress.value,
                Address2: address1,
                Address3: address2,
                AdresType: selectedAddress.value === "BILL" ? "B" : "S",
                Block: block,
                Building: building,
                City: city,
                County: cuntry,
                StateName: state,
                CountryCode: CountryCode,
                StateCode: StateCode,
                Street: Street,
                StreetNo: StreetNo,
                ZipCode: zip,
              },
            ],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;

      if (data.ai_MessageId === 0) {
        setBPpostData(data);
        toast.success(data.as_Message);
        getBP();
        navigate("/customer-list");
      } else {
        console.log(data);
        toast.error(data.as_Message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCreateloading(false);
    }
  };

  const SalseOrderPlace = async (
    CardCode,
    selectedItems,
    numAtCard,
    remarks
  ) => {
    try {
      setCreateloading(true);
      const currentDate = new Date();
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const response = await axios.post(
        `${baseURL}/PlaceSalesOrder`,
        {
          as_UserId: "manager",
          as_UserPass: "Admin@123",
          l_ClsGET_SO_HDR: {
            CardCode: CardCode,
            DocType: "I",
            DocDate: formattedDate, // date now
            NumAtCard: numAtCard, //m
            Remarks: remarks, //m
            BPLId: 3, //m   choise
            TaxDate: formattedDate, // date now
          },
          lst_ClsGET_SO_DTL: selectedItems,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;

      if (data.ai_MessageId === 0) {
        console.log(data);
        toast.success(data.as_Message);
      } else {
        toast.error(data.as_Message);
      }
    } catch (error) {
      toast.error("server down");
    } finally {
      setCreateloading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("log2");
    setIsLogIn(false);
    toast.success("Logout success");
    navigate("/");
  };

  const getDoc = async (CardCode) => {
    try {
      const response = await fetch(`${baseURL2}/api/v1/customer/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardCode: CardCode,
        }),
      });

      const data = await response.json();
      setDocData(data.data);
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const getrejectDoc = async (cc) => {
    try {
      const response = await fetch(`${base_url}/api/v1/customer/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardCode: cc,
        }),
      });

      const data = await response.json();
      setDocData(data.data);
      console.log("customer", data);
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const getBP = async (CardCode) => {
    try {
      // const queryParams = `CardCode=${
      //   CardCode || ""
      // }&CardType=C&BPLId=&SlpCode=${slp}`;

      const response = await axios.get(
        `${baseURL}/api/Masters/GetBP/${CardCode || "%20"}/C/%20/%20`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      const { data } = response;
      console.log(response, "res");

      if (CardCode) {
        setBPdata(data);
        setsingleBPdata(data);
      } else {
        setBPdata(data);
      }
    } catch (error) {
      // toast.error('Server Down');
    }
  };

  const getUnApprovedBP = async () => {
    try {
      const response = await axios.post(
        `${baseURL2}/api/v1/unapproved/customer/list`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      setBPudata(data.data);
    } catch (error) {
      // toast.error('Server Down');
    }
  };

  const getRejectedBP = async () => {
    try {
      const response = await axios.post(
        `${baseURL2}/api/v1/rejected/customer/list`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      setBPrdata(data.data);
    } catch (error) {
      // toast.error('Server Down');
    }
  };

  const getReverificationBP = async () => {
    try {
      const response = await axios.post(
        `${baseURL2}/api/v1/re-verification/customers/list`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      setBPVlist(data.data);
    } catch (error) {
      // toast.error('Server Down');
    }
  };

  const getGroupBP = async (GroupCode) => {
    try {
      // const queryParams = `GroupType=C&GroupCode=${GroupCode || ""}`;

      const response = await axios.get(
        `${baseURL}/api/Masters/GetBPGroup/c/%20`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      const { data } = response;

      if (GroupCode) {
        setBpGroupList(data);
      } else {
        setBpGroupList(data);
      }
    } catch (error) {
      // toast.error('Server Down');
    }
  };

  const UpdateLeadTocustomer = async (id, cc, email, slp, nam) => {
    try {
      setCreateloading(true);
      const response = await fetch(
        `${baseURL}/api/Masters/UpdateLeadToCustomer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({
            as_UserId: "manager",
            as_UserPass: "Admin@123",
            BP: {
              CardCode: cc,
            },
          }),
        }
      );

      const data = await response.json();
      if (data.ai_MessageId === 0) {
        toast.success(data.as_Message);
        setApprovdata(data);
        ApproveandReject(id, "Approve");
        customerUppdateApprove(id, data.as_CardCode);
        getBP();
        getUnApprovedBP();
        navigate("/customer-ulist");
        sendMail(email, data, slp, nam);
      } else {
        toast.error(data.as_Message);
      }
    } catch (error) {
      // console.error("Error updating lead to customer:", error);
      // toast.error("An error occurred while updating lead to customer.");
    } finally {
      setCreateloading(false);
    }
  };

  const sendMail = async (email, data, slp, nam) => {
    try {
      const response = await fetch(`${baseURL2}/admin/approve/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          CardCode: data.as_CardCode,
          Password: data.as_Password,
          name: nam,
          slpName: slp,
        }),
      });

      const res = await response.json();

      if (response.ok) {
        // console.log("Mail sent successfully!");
        // toast.success(res.message);
      } else {
        // console.error("Failed to send mail:", response.statusText);
        // toast.error(res.message);
      }
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

  const getItem = async () => {
    try {
      setTableLoading(true);
      const response = await axios.post(
        `${baseURL2}/api/v1/item/list`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;

      // if (ItemCode) {
      //   setsingleItemdata(data);
      // } else {
      setItemdata(data.data);
      // }
    } catch (error) {
    } finally {
      setTableLoading(false);
    }
  };

  const getContactList = async () => {
    try {
      const response = await axios.post(
        `${baseURL2}/api/v1/contact-us/list`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;

      // if (ItemCode) {
      //   setsingleItemdata(data);
      // } else {
        setContactList(data?.data);
      // }
    } catch (error) {
    } finally {
    }
  };


  const getBrand = async () => {
    try {
      setTableLoading(true);
      const response = await axios.post(
        `${baseURL2}/api/v1/brand/list`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
        setBrandList(data?.data);
    } catch (error) {
    } finally {
      setTableLoading(false);
    }
  };

  const deleteBrand = async (id) => {
    try {
      const response = await axios.get(
        `${baseURL2}/api/v1/brand/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      if (response.status === 200 && data && data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Error: Something went wrong.');
    }finally{
      getBrand()
    }
  };

  const addBrand = async (manufacturerId, manufacturerName, image,is_popular) => {
    try {
      const formData = new FormData();
      formData.append('manufacturerId', manufacturerId);
      formData.append('manufacturerName', manufacturerName);
      formData.append('image', image);
      formData.append('is_popular', is_popular);

  
      const response = await axios.post(
        `${baseURL2}/api/v1/brand/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const { data } = response;
  
      if (response.status === 200 && data && data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error(error);

    }finally{
      getBrand()
    }
  };

  const updateBrand = async (manufacturerId, manufacturerName, image,is_popular, id , selectedCatalogFile) => {
    try {
      const formData = new FormData();
      formData.append('manufacturerId', manufacturerId);
      formData.append('manufacturerName', manufacturerName);
      formData.append('image', image);
      formData.append('is_popular', is_popular);
      formData.append('brand_catalogue', selectedCatalogFile);
  
      const response = await axios.post(
        `${baseURL2}/api/v1/brand/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const { data } = response;
  
      if (response.status === 200 && data && data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error(error);

    }finally{
      getBrand()
    }
  };

  const getBanner = async () => {
    try {
      setTableLoading(true);
      const response = await axios.post(
        `${baseURL2}/api/v1/banner/list`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;

      // if (ItemCode) {
      //   setsingleItemdata(data);
      // } else {
      setbannerList(data?.data);
      // }
    } catch (error) {
    } finally {
      setTableLoading(false);
    }
  };


  const getCmsList = async () => {
    try {
      setTableLoading(true);
      const response = await axios.post(
        `${baseURL2}/api/v1/cms/list`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;

      // if (ItemCode) {
      //   setsingleItemdata(data);
      // } else {
        setCmsList(data?.data);
      // }
    } catch (error) {
    } finally {
      setTableLoading(false);
    }
  };


  const editCMS = async (id, pagetitle , pagedesc) => {
    try {
      const formData = new FormData();
      formData.append('description', pagedesc);
      const response = await axios.post(
        `${baseURL2}/api/v1/cms/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const { data } = response;
  
      if (response.status === 200 && data && data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Error: Something went wrong.');
    }finally{
      getBanner()
    }
  };



  const getFleshNewsList = async () => {
    try {
      setTableLoading(true);
      const response = await axios.post(
        `${baseURL2}/api/v1/flashy-news/list`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
        setFleshNewsList(data?.data);
    } catch (error) {
    } finally {
      setTableLoading(false);
    }
  };
 

  const editnews = async (id, pagetitle ) => {
    try {
      const formData = new FormData();
      formData.append('title', pagetitle);
      const response = await axios.post(
        `${baseURL2}/api/v1/flashy-news/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const { data } = response;
  
      if (response.status === 200 && data && data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Error: Something went wrong.');
    }finally{
      getBanner()
    }
  };


  const deleteBanner = async (id) => {
    try {
      setTableLoading(true);
      const response = await axios.get(
        `${baseURL2}/api/v1/banner/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      if (response.status === 200 && data && data.message) {
        toast.success(data.message);
      } else {
        toast.error('Error: Something went wrong.');
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Error: Something went wrong.');
    }finally{
      getBanner()
    }
  };

  const addBanner = async (banner, type, link,selectedPosition) => {
    try {
      const formData = new FormData();
      formData.append('banner', banner);
      formData.append('type', type);
      formData.append('link', link);
      formData.append('position', selectedPosition);
  
      const response = await axios.post(
        `${baseURL2}/api/v1/banner/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const { data } = response;
  
      if (response.status === 200 && data && data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Error: Something went wrong.');
    }finally{
      getBanner()
    }
  };


  const updateBanner = async (id,banner, type, link,selectedPosition) => {
    try {
      const formData = new FormData();
      formData.append('banner', banner);
      formData.append('type', type);
      formData.append('link', link);
      formData.append('position', selectedPosition);
      const response = await axios.post(
        `${baseURL2}/api/v1/banner/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const { data } = response;
  
      if (response.status === 200 && data && data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Error: Something went wrong.');
    }finally{
      getBanner()
    }
  };


  const getItemGroup = async () => {
    try {
      setTableLoading(true);
      const response = await axios.post(
        `${baseURL2}/api/v1/item_group/list`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;

      // if (ItemCode) {
      //   setsingleItemdata(data);
      // } else {
      setItemGroupdata(data.data);
      // }
    } catch (error) {
    } finally {
      setTableLoading(false);
    }
  };

  const getComplainList = async () => {
    try {
      const response = await fetch(`${base_url}/api/v1/complaint/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   slpCode: slp,
        // }),
      });

      const data = await response.json();
      setComplainListData(data.data);
      console.log("customer", data);
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const addComplain = async (text) => {
    try {
      const response = await fetch(`${base_url}/api/v1/complaint/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // slpCode: slp,
          complaint: text,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const ComplaintDetail = async (id) => {
    try {
      const response = await fetch(
        `${base_url}/api/v1/complaint/details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setComplainListData(data.data);
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const CloseComplaint = async (id) => {
    try {
      const response = await fetch(`${base_url}/api/v1/complaint/close/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Closed",
        }),
      });

      const data = await response.json();
      toast.success(data.message);
      getComplainList();
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const getSuggestion = async () => {
    try {
      const response = await fetch(`${base_url}/api/v1/suggestion/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   slpCode: slp,
        // }),
      });

      const data = await response.json();
      setSuggestionListData(data.data);
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const addSuggestion = async (text) => {
    try {
      const response = await fetch(`${base_url}/api/v1/suggestion/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // slpCode: slp,
          suggestion: text,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const SuggestionDetail = async (id) => {
    try {
      const response = await fetch(
        `${base_url}/api/v1/suggestion/details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setSuggestionListData(data.data);
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const getAttributeList = async (
    groupcode,
    u_PROPRT1,
    u_PROPRT2,
    u_PROPRT3,
    u_PROPRT4,
    u_PROPRT5
  ) => {
    try {
      const response = await fetch(`${base_url}/api/v1/item/attribute/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itmsGrpCod: groupcode.toString(),
          u_PROPRT1: u_PROPRT1,
          u_PROPRT2: u_PROPRT2,
          u_PROPRT3: u_PROPRT3,
          u_PROPRT4: u_PROPRT4,
          u_PROPRT5: u_PROPRT5,
        }),
      });

      const data = await response.json();
      setAttributeList(data.data);
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const AttributeAdd = async (
    groupcode,
    attribute,
    level1,
    level2,
    level3,
    level4,
    level5
  ) => {
    try {
      const response = await axios.post(
        `${baseURL2}/api/v1/item/attribute/add`,
        {
          itmsGrpCod: groupcode,
          u_PROPRT1: level1,
          u_PROPRT2: level2,
          u_PROPRT3: level3,
          u_PROPRT4: level4,
          u_PROPRT5: level5,
          attribute: attribute,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      toast.success(data.message);
      getAttributeList();
    } catch (error) {}
  };

  const getItemMatrixList = async (groupCode, pR_PCODE, plevel) => {
    try {
      const response = await fetch(`${base_url}/api/v1/item_matrices/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itmsGrpCod: groupCode,
          pR_PCODE: pR_PCODE || "",
          plevel: plevel,
        }),
      });

      const data = await response.json();
      setItemMatrixList(data.data);
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const getsecondItemMatrices = async (groupCode, pRcode) => {
    try {
      const response = await axios.post(
        `${base_url}/api/v1/item_matrices/list`,
        { itmsGrpCod: groupCode, pR_PCODE: pRcode || "" },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setSecondItemMatrics(data.data);
    } catch (error) {
      // Handle errors here
    }
  };

  const getAttributeValueList = async (itemcode) => {
    try {
      const response = await fetch(
        `${base_url}/api/v1/item/attribute-value/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemCode: itemcode,
          }),
        }
      );

      const data = await response.json();
      setItemAttributeList(data.data);
    } catch (error) {
      console.error("Error in getDoc:", error);
    }
  };

  const getItemDetail = async (id) => {
    try {
      setTableLoading(true);
      const response = await axios.get(
        `${baseURL2}/api/v1/item/details/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;

      // if (ItemCode) {
      //   setsingleItemdata(data);
      // } else {
      setsingleItemdata(data.data);
      // }
    } catch (error) {
    } finally {
      setTableLoading(false);
    }
  };

  const ItemAttributeValueAdd = async (itemCode, attributeValues) => {
    try {
      const formData = new FormData();

      attributeValues.forEach((item, index) => {
        formData.append(`attributeData[${index}][itemCode]`, itemCode);
        formData.append(
          `attributeData[${index}][attributeId]`,
          item.attributeId
        );
        formData.append(`attributeData[${index}][value]`, item.value);
      });

      const response = await axios.post(
        `${baseURL2}/api/v1/item/attribute-value/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data } = response;
      // toast.success(data.message);
    } catch (error) {
      console.error("Error adding item attribute values:", error);
    }
  };

  const updateDescription = async (itemCode, des, pdf,isClearance1,isNewLaunch1,isBestSeller1,isHotProduct1, TechDescription,ShippingInformation) => {
    try {
      const formData = new FormData();
      formData.append("itemCode", itemCode);
      formData.append("description", des || "");
      if (pdf) {
        formData.append("brochure", pdf || "");
      }
      formData.append('technical_information' , TechDescription)
      formData.append('shipping_information' , ShippingInformation)
      formData.append("isClearance" , isClearance1 || '')
      formData.append("isNewLaunch" , isNewLaunch1 || '')
      formData.append("isBestSeller" , isBestSeller1 || '')
      formData.append("isHotProduct" , isHotProduct1 || '')
      const response = await axios.post(
        `${base_url}/api/v1/item/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setSecondItemMatrics(data.data);
      toast.success("item Update success");
      navigate("/product-list");
    } catch (error) {
      // Handle errors here
    }
  };

  const SyncBrandItem = async () => {
    try {
      // setSyncLoading(true);
      const response = await axios.get(`${base_url}/api/v1/brand/sync`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${access}`,
        },
      });

      const { data } = response;
      // toast.success(data.message);
    } catch (error) {
      // toast.error(error);
    } finally {
      // setSyncLoading(false);
    }
  };

  const SyncItem = async () => {
    try {
      setSyncLoading(true);
      const response = await axios.get(`${base_url}/api/v1/item/sync`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${access}`,
        },
      });

      const { data } = response;
      toast.success(data.message);
      SyncBrandItem()
    } catch (error) {
      // Handle errors here
      toast.error(error);
    } finally {
      setSyncLoading(false);
    }
  };

  useEffect(() => {
    const log = localStorage.getItem("log7");

    if (log) {
      const data = JSON.parse(log);
      const { status } = data;

      if (status === 200) {
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
    } else {
      setIsLogIn(false);
    }

    const fetchData = async () => {
      await getItemMatrixList();
    };
    getBP();
    getItem();
    getGroupBP();
    getUnApprovedBP();
    getReverificationBP();
    getItemGroup();
    getRejectedBP();
    // fetchData();
    // getAttributeList()
  }, [isLogIn]);

  const abc = {
    LoginUser,
    isLogIn,
    loginData,
    setLoginData,
    BPdata,
    logoutUser,
    getBP,
    singleBPdata,
    BPPost,
    createLoading,
    itemdata,
    tableLoading,
    SalseOrderPlace,
    bpGroupList,
    BpUpdate,
    getUnApprovedBP,
    UpdateLeadTocustomer,
    BPudata,
    singleBPudata,
    logindiable,
    ApproveandReject,
    getDoc,
    getrejectDoc,
    docData,
    getComplainList,
    addComplain,
    CloseComplaint,
    complaintListData,
    SuggestionListData,
    addSuggestion,
    getSuggestion,
    SuggestionDetail,
    BPVlist,
    attributeList,
    itemMatrixList,
    getItemDetail,
    singleItemdata,
    itemGroupdata,
    updateDescription,
    getItemMatrixList,
    getAttributeValueList,
    itemAttributeList,
    getAttributeList,
    AttributeAdd,
    ItemAttributeValueAdd,
    getsecondItemMatrices,
    seconditemMatrics,
    SyncItem,
    syncLoading,
    baseURL2,
    BPrdata,
    addBanner,
    getBanner,
    bannerList,
    cmslist,
    editCMS,
    getCmsList,
    deleteBanner,
    getContactList,
    contactList,
    getBrand,
    addBrand,
    deleteBrand,
    brandList,
    updateBrand,updateBanner , fleshNewsList , getFleshNewsList , editnews
 
  };

  return <AppContext.Provider value={abc}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
