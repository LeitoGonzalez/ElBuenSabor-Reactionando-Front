import { DashCircle } from "react-bootstrap-icons"

interface PropBotonRestar{
    onClick:()=>void;
}

const BotonRestar = ({onClick}:PropBotonRestar) => {
  return (
    <DashCircle
    onClick={onClick}
    onMouseEnter={() => {
        document.body.style.cursor = "pointer";
      }}
    onMouseLeave={() => {
        document.body.style.cursor = "default";
      }}
    />
  )
}

export default BotonRestar