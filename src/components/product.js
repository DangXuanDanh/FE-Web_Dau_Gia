import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Card, CardContent, CardActions, CardMedia, Button } from '@mui/material';
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import DateRangeIcon from '@mui/icons-material/DateRange';
import './Css/product.css';
import { useState } from "react";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import moment from "moment";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { axiosInstance, parseJwt } from '../utils/axios';

function Product({
  sl,
  masanpham,
  tensanpham,
  mota,
  madanhmuc,
  manguoidang,
  anhdaidien,  
  giakhoidiem,
  giamuangay,
  buocgia,
  malichsucaonhat,
  tudonggiahan,
  ngaydang,
  ngayketthuc,
  is_delete,
  danhmucMadanhmuc,
  taikhoanMataikhoan,
  luot_ra_gia_hien_tai,
  stay,
}) {
  const [evaluatestar, setEvaluateStar] = useState([]);
  const [watch, setWatch] = useState(false);
  const history = useHistory();

  const idUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).mataikhoan : 13


  const evaluateStar = (luot_ra_gia_hien_tai) => {
    let setEvaluateStar=[];
    let temp=luot_ra_gia_hien_tai;
    for(;luot_ra_gia_hien_tai<100 && setEvaluateStar.length<6;){
      setEvaluateStar.push(<StarIcon fontSize="small" />)
      temp-=100
    }
    if(temp>50 && setEvaluateStar.length<6) {setEvaluateStar.push(<StarHalfIcon fontSize="small" />);}
    else{
      for(let i=0;setEvaluateStar.length<6;){
        i++
        setEvaluateStar.push(<StarBorderIcon key={i} fontSize="small" />)
      }
    }
    return setEvaluateStar
  }
  const onClickDetail = () => {
    if (!stay)
    {
      history.push(`detail/${masanpham}`);
    } else {
      history.replace(`${masanpham}`);
    }
    window.location.reload()
  };

  async function YeuThich() {
    if (watch == false) {
      await axiosInstance.post(`yeuthich`, {
        masanpham: masanpham,
        mataikhoan: idUser
      })
    } else {
      await axiosInstance.delete(`yeuthich/find/${idUser}/${masanpham}`)
    }
    setWatch(!watch)
  }

  React.useEffect(async () => {
    const yeuthich = await axiosInstance.get(`yeuthich/find/${idUser}/${masanpham}`).then((res) => {
      if (res.data) {
        if (res.data.mayeuthich) {
          setWatch(true)
        }
      }
    })
  }, [])

  return (
    <Grid item xs={ 3 } >
    <Card  className="cardProduct">
        <CardMedia
          component="img"
          height="140"
          image={anhdaidien}
          className="imageProduct"
        />
        <CardContent>
          <Typography variant="subtitle2" style={{textAlign:"center"}}>
            {tensanpham}
          </Typography>
          {evaluateStar({luot_ra_gia_hien_tai})} ({luot_ra_gia_hien_tai})
          <Typography gutterBottom variant="body2" component="div">
            <MonetizationOnIcon fontSize="small" />Giá mua ngay: 
            <NumberFormat
            thousandsGroupStyle="thousand"
            value={giamuangay}
            decimalSeparator="."
            displayType="text"
            type="text"
            thousandSeparator={true}
            suffix=" VNĐ" />
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
          <MonetizationOnIcon fontSize="small" /> Giá hiện tại: 
              {/* <PersonIcon /> */}
            <NumberFormat
            thousandsGroupStyle="thousand"
            value={giakhoidiem}
            decimalSeparator="."
            displayType="text"
            type="text"
            thousandSeparator={true}
            suffix=" VNĐ" />
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
          <DateRangeIcon fontSize="small" /> Ngày kết thúc:{moment(ngayketthuc).format("DD/MM/YYYY")}
          </Typography>
        </CardContent>
        <CardActions>
        <Button className="detailProduct" variant="outlined" onClick={()=>{YeuThich()}}>
            {!watch ? <FavoriteBorderIcon/> : <FavoriteIcon />}
          </Button>
          <Button className="detailProduct" variant="outlined" size="large" startIcon={<TouchAppRoundedIcon />} onClick={onClickDetail}>
            Xem chi tiết
          </Button>
        </CardActions>
    </Card>
  </Grid>
  );
}

export default Product;
