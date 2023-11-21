import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { DTOProducto } from "../../types/DTOProducto"
import { ProductoService } from "../../services/ProductoService";
const MainProducts = () => {

    const [productos, setProductos] = useState<DTOProducto[]>();

    useEffect(() => {
        const obtenerProductos = async () =>{
            const response = await ProductoService.getProductosList();
            setProductos(response);
        };

        obtenerProductos();
    }, []);

  return (
    <div>
        <Container>
            <p className="h2 pt-4 align-content-center mx-auto text-center pb-4 mt-4">¡Algunos de nuestros productos!</p>
            <Row lg={4} xs={2}>
                {productos?.map((producto) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={producto.urlImagen} style={{height: "9rem", objectFit: "cover"}}/>
                            <Card.Body>
                                <Card.Title>{producto.denominacion}</Card.Title>
                                <Card.Text>{producto.descripcion}</Card.Text>
                                <Card.Subtitle>${producto.precio}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
  )
}
export default MainProducts