import StarIcon from '@mui/icons-material/StarBorder';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

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
  taikhoanMataikhoan
}) {

  const history = useHistory();

  const onClickDetail = () => {
    history.push(`detail`);
  };

  return (
    <Grid sx={{xs:2}} style={{margin:10}}>
    <Card sx={{ width:210, height:280 }}>
      <CardActionArea onClick={onClickDetail}>
        <CardMedia
          component="img"
          height="140"
          image={anhdaidien}
        />
        <CardContent>
          <Typography variant="subtitle2" style={{textAlign:"center"}}>
            {tensanpham}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
              <PersonIcon />
            <NumberFormat
            thousandsGroupStyle="thousand"
            value={giamuangay}
            decimalSeparator="."
            displayType="text"
            type="text"
            thousandSeparator={true}
            suffix=" VNĐ" />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
  );
}

export default Product;
