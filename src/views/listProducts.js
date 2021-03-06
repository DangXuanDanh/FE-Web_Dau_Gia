import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { Chip } from '@mui/material';
import { CardActionArea, Stack } from '@mui/material';
import Product from '../components/product';
import { axiosInstance, parseJwt } from '../utils/axios';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './../components/Css/paging.css';

export default function ListProducts(propsListProducts) {
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get('name') || ""
  const category= queryParams.get('category') || ""
  // Lay 5 san pham cao gia nhat
  const [resultByName, setData] = React.useState([]);
  
  let currentPage=1
  async function searchByName() {
      if (name){
        const res = await axiosInstance.get(`sanpham/get/Name?name=`+name+'&page='+currentPage)
        setData(res.data)
      }
      else if(category){
        const res = await axiosInstance.get(`sanpham/get/category?id=`+category+'&page='+currentPage)
        setData(res.data)
      }
    }

    const sortTangdan =async () => {
      if(name!=""){
        const res = await axiosInstance.get(`sanpham/get/Name?name=`+name+'&page='+currentPage+'&orderType=giakhoidiem')
        setData(res.data)
      }
      else{
        const res = await axiosInstance.get(`sanpham/get/category?id=`+category+'&page='+currentPage+'&orderType=giakhoidiem')
        setData(res.data)
      }
    };
    const sortGiamdan =async () => {
      if(name!=""){
        const res = await axiosInstance.get(`sanpham/get/Name?name=`+name+'&page='+currentPage+'&orderType=giakhoidiem'+'&orderBy=desc')
        setData(res.data)
      }
      else {
        const res = await axiosInstance.get(`sanpham/get/category?id=`+category+'&page='+currentPage+'&orderType=giakhoidiem'+'&orderBy=desc')
        setData(res.data)
      }
    };
    const sortNgayketthuc =async () => {
      if(name!=""){
        const res = await axiosInstance.get(`sanpham/get/Name?name=`+name+'&page='+currentPage+'&orderType=ngayketthuc'+'&orderBy=desc')
        setData(res.data)
      }
      else{
        const res = await axiosInstance.get(`sanpham/get/category?id=`+category+'&page='+currentPage+'&orderType=ngayketthuc'+'&orderBy=desc')
        setData(res.data)
      }
    };
  function pageNumber(){
    if(resultByName.length>0){
      let length=resultByName[0].sl;
      if(length==0) return 1;
      return Math.ceil(length/8)
    }
    else return 1;
  }
  async function pagingHandle(event, value){
    let res;
    if(name!=""){
      res = await axiosInstance.get(`sanpham/get/Name?name=`+name+'&page='+value)
    }
    else{
      res = await axiosInstance.get(`sanpham/get/category?id=`+category+'&page='+value)
    }
    currentPage=value;
    setData(res.data)
  }
  React.useEffect(() => {
    searchByName()
  }, [])
  
  React.useEffect(() => {
    sortTangdan()
  }, [])
  return (
    <div>
      <Container>
        <br/>
        <Grid columnSpacing={2} container rowSpacing={2}>
          <br/>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <Chip label="Gi?? t??ng d???n" variant="outlined" onClick={sortTangdan} />
              <Chip label="Gi?? gi???m d???n" variant="outlined" onClick={sortGiamdan} />
              <Chip label="G???n k???t th??c" variant="outlined" onClick={sortNgayketthuc} />
            </Stack>
          </Grid>
          {
             resultByName?.length > 0 && resultByName.map((item, index) => {
                return <Product
                  tensanpham={item.tensanpham}
                  giamuangay={item.giamuangay}
                  anhdaidien={item.anhdaidien}
                  masanpham={item.masanpham}
                  luot_ra_gia_hien_tai={item.luot_ra_gia_hien_tai}
                  giakhoidiem={item.giakhoidiem}
                  ngayketthuc={item.ngayketthuc}
                />
              })
            }
            <Grid item xs={12} >
              <Stack spacing={2} className="paging-products">
                <Pagination
                  style={{alignSelf:"center"}}
                  onChange={pagingHandle}           
                  count={pageNumber()}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </Grid>
        </Grid>

      </Container>
    </div>
  )
}
