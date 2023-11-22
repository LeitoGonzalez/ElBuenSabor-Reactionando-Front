import { TypeDetalleCarrito } from "../../../types/TypeDetalleCarrito";
import { FormaPago } from "../../../types/Enums/FormaPago";
import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { TipoEnvio } from "../../../types/Enums/TipoEnvio";
import { Pedido } from "../../../types/Pedido";
import { EstadoPedido } from "../../../types/Enums/EstadoPedido";
import { PedidoService } from "../../../services/PedidoService";

type PagoModalProps = {
  show: boolean;
  detalleCarrito: TypeDetalleCarrito[];
  onHide: () => void;
  total: number;
};

const PagoModal = ({ show, detalleCarrito, onHide, total }: PagoModalProps) => {
  const [medioPago, setMedioPago] = useState<FormaPago>(FormaPago.EFECTIVO);
  const [tipoEnvio, setTipoEnvio] = useState<TipoEnvio>(TipoEnvio.TAKE_AWAY);

  const handleSaveUpdate = async (pedido: Pedido) => {
    try {
      await PedidoService.createPedido(pedido, window.localStorage.getItem("token"));
      onHide(); //Una vez que se crea el producto, se esconde el Modal
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const detallePedidos = detalleCarrito.map((detalleCarrito) => ({
      cantidad: detalleCarrito.cantidad,
      subtotal: detalleCarrito.subTotal,
      producto: {
        id: detalleCarrito.productoId
      }
      
    }));

    const pedido: Pedido = {
      fechaHoraAlta: new Date(),
      fechaHoraPedido: new Date(),
      formaPago: medioPago,
      estado: EstadoPedido.A_CONFIRMAR,
      tipoEnvio: tipoEnvio,
      total: total,
      detallePedido: detallePedidos
    };
    handleSaveUpdate(pedido);
    onHide;
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Detalles De Compra</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>  
            <tbody>
            {detalleCarrito.map((product) => (
              <tr key={product.productoId}>
                <td>{product.titulo}</td>
                <td>{product.cantidad}</td>
                <td>{product.subTotal}</td>
              </tr>
          ))}
            </tbody>
          </Table>
          
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFormaPago">
            <Form.Label>Forma de Pago</Form.Label>
            <Form.Check
              type="radio"
              label="Efectivo"
              id="efectivo"
              name="formaPago"
              checked={medioPago === FormaPago.EFECTIVO}
              onChange={() => setMedioPago(FormaPago.EFECTIVO)}
            />

            <Form.Check
              type="radio"
              label="Mercado Pago"
              id="mercadoPago"
              name="formaPago"
              checked={medioPago === FormaPago.MERCADO_PAGO}
              onChange={() => setMedioPago(FormaPago.MERCADO_PAGO)}
            />
          </Form.Group>
          <Form.Group controlId="formTipoEnvio">
            <Form.Label>Tipo de Envio</Form.Label>
            <Form.Check
              type="radio"
              label="Retiro Por Local"
              id="take_away"
              name="tipoEnvio"
              checked={tipoEnvio === TipoEnvio.TAKE_AWAY}
              onChange={() => setTipoEnvio(TipoEnvio.TAKE_AWAY)}
            />

            <Form.Check
              type="radio"
              label="Delivery"
              id="delivery"
              name="tipoEnvio"
              checked={tipoEnvio === TipoEnvio.DELIVERY}
              onChange={() => setTipoEnvio(TipoEnvio.DELIVERY)}
            />
          </Form.Group>

          <Modal.Footer>
            <h3>Total: ${total}</h3>
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PagoModal;
