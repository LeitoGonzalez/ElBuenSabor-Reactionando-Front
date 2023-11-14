 import  { useState } from 'react' 
 import { CarritoHeader } from '../CarritoHeader/CarritoHeader' 
import ProductosList from '../ProductosList/ProductosList'
 import { TypeDetalleCarrito } from '../../types/TypeDetalleCarrito'; 

const Carrito = () => {

   const [detalleProducto,setDetalleProducto] = useState<TypeDetalleCarrito[]>([]); 
   const [total,setTotal]= useState(0);
  const [countProducts, setCountProducts] = useState(0); 
	

  return (
    <div>
       <CarritoHeader
      detalleProducto={detalleProducto}
      setDetalleProducto={setDetalleProducto}
      total={total}
      setTotal={setTotal}
      countProducts={countProducts}
      setCountProducts={setCountProducts}
      /> 

      <ProductosList
       detalleProducto={detalleProducto}
      setDetalleProducto={setDetalleProducto} 
      total={total}
      setTotal={setTotal}
      countProducts={countProducts}
      setCountProducts={setCountProducts} 
      />

      </div>
  )
}

export default Carrito