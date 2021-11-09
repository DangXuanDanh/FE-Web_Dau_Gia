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
import './Css/product.css';
import { useState } from "react";

function Product({
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
  luot_ra_gia_hien_tai
}) {
  const [evaluatestar, setEvaluateStar] = useState([]);
  const history = useHistory();
  const evaluateStar = (luot_ra_gia_hien_tai) => {
    let setEvaluateStar=[];
    let temp=luot_ra_gia_hien_tai;
    for(;luot_ra_gia_hien_tai<100 && setEvaluateStar.length<6;){
      setEvaluateStar.push(<StarIcon fontSize="small" />)
      temp-=100
    }
    if(temp>50 && setEvaluateStar.length<6) {setEvaluateStar.push(<StarHalfIcon fontSize="small" />);}
    else{
      for(;setEvaluateStar.length<6;){
        setEvaluateStar.push(<StarBorderIcon fontSize="small" />)
      }
    }
    return setEvaluateStar
  }
  const onClickDetail = () => {
    history.push(`detail/${masanpham}`);
  };

  return (
    <Grid  style={{margin:10}}>
    <Card sx={ 4 } className="cardProduct">
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
            Giá mua ngay: 
              {/* <PersonIcon /> */}
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
            Giá hiện tại: 
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
        </CardContent>
        <CardActions>
          <Button className="detailProduct" variant="outlined" size="large" startIcon={<TouchAppRoundedIcon />} onClick={onClickDetail}>
            Xem chi tiết
          </Button>
        </CardActions>
    </Card>
  </Grid>
  );
}

export default Product;
