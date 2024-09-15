import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    LOGIN,
    LOGIN_SUCCCESSFUL,
    SUCCESS,
  } from "../../utils/string";
import { useGlobalState } from "../../utils";

const client_id = "545890069172-vedknji7le2114ompk2l5nq5830pn3g6.apps.googleusercontent.com";
// const secret = "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"

function GoogleLogin(props) {
    const navigate = useNavigate();
    const [user, setUser] = useGlobalState("user");

    function handleCredentialResponse(response){
        console.log(response.credential)
        Swal.fire(LOGIN, LOGIN_SUCCCESSFUL, SUCCESS).then(() => {
            setUser(props.user);
            navigate(props.path);
          });
    }

    useEffect(()=>{
        /*global google*/
        google.accounts.id.initialize({
            client_id: client_id,
            callback: handleCredentialResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline",size:"large"}
        );
    },[])

    return(
        <div>
            <div id="signInDiv"></div>
        </div>
    )
}
export default GoogleLogin