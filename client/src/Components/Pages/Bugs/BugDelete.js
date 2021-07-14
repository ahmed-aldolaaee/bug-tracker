import axios from "axios";
import { useHistory } from "react-router-dom";

const BugDelete = ({id}) => {

    const history = useHistory();

    const deleteBug = async () => {
        const post = await axios.delete(`http://localhost:5000/bugs/delete/${id}`)
        .then((res) => {history.push("/bugs/all")})
        .catch((err) => {
            console.log(err)
        })
    } 

    return (
        <a className="button button-danger" onClick={deleteBug}>Delete</a>
    )
}

export default BugDelete;