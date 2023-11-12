import { useState } from 'react';
import { TypeDetalleCarrito } from '../../types/TypeDetalleCarrito';


type CarritoHeaderProps={
	detalleProducto: TypeDetalleCarrito[];
	setDetalleProducto: React.Dispatch<React.SetStateAction<TypeDetalleCarrito[]>>;
	total: number;
	setTotal:React.Dispatch<React.SetStateAction<number>>;
	countProducts: number;
	setCountProducts: React.Dispatch<React.SetStateAction<number>>;
	
}

export const CarritoHeader = ({
	detalleProducto,
	setDetalleProducto,
	total,
	countProducts,
	setCountProducts,
	setTotal
}:CarritoHeaderProps) => {
	const [active, setActive] = useState(false);

	const onDeleteProduct = (product:TypeDetalleCarrito) => {
		const results = detalleProducto.filter(
			item => item.productoId!== product.productoId
		);

		setTotal(total - product.precioVenta * product.cantidad);
		setCountProducts(countProducts - product.cantidad);
		setDetalleProducto(results);
	};

	const onCleanCart = () => {
		setDetalleProducto([]);
		setTotal(0);
		setCountProducts(0);
	};

	const handleAgregar=(product:TypeDetalleCarrito)=>{
		const products = detalleProducto.map(item =>
			item.productoId === product.productoId
				? { ...item, cantidad: item.cantidad + 1 }
				: item
		);
		setTotal(total + product.precioVenta);
		setCountProducts(countProducts + 1);
		setDetalleProducto(products);
	}
	const handleDisminuir=(product:TypeDetalleCarrito)=>{
		const products = detalleProducto.map(item =>
			item.productoId === product.productoId
				?{ ...item, cantidad: item.cantidad - 1}
				: item
		
		).filter((item) => item.cantidad > 0);
		
		setDetalleProducto(products);
		setTotal(total - product.precioVenta);
		setCountProducts(countProducts - 1);
	}

	return (
		<header>
			<h1>Tienda</h1>

			<div className='container-icon'>
				<div
					className='container-cart-icon'
					onClick={() => setActive(!active)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon-cart'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>
					<div className='count-products'>
						<span id='contador-productos'>{countProducts}</span> {/* Contador de Productos */}
					</div>
				</div>

				<div
					className={`container-cart-products ${
						active ? '' : 'hidden-cart'
					}`}
				>
					{detalleProducto.length ? (
						<>
							<div className='row-product'>
								{detalleProducto.map(product => (
									<div className='cart-product' key={product.productoId}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{product.cantidad}{" "}
											</span>
											<p className='titulo-producto-carrito'>
												{product.titulo}
											</p>
											<span className='precio-producto-carrito'>
												${product.precioVenta}
											</span>
										</div>
										<button onClick={()=>handleAgregar(product)}>agregar</button>
										<button onClick={()=>handleDisminuir(product)}>disminuir</button>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(product)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
						</>
					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>
			</div>
		</header>
	);
};