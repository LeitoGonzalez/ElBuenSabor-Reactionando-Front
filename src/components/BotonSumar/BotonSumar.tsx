import { PlusCircle } from "react-bootstrap-icons"

interface PropBotonSumar{
  onClick:()=>void;
}

const BotonSumar = ({onClick}:PropBotonSumar) => {
  return (
    <PlusCircle
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

export default BotonSumar