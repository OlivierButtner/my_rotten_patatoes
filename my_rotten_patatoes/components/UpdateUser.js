import axios from "axios";
import {useRouter} from 'next/router';

export default function UpdateUser(){

    const router = useRouter();
    const {id} = router.query


    function UpdateUs () {
        axios.put(`http://localhost:3000/api/auth/changeStatus/${id}`)
        router.push('/Admin')
    }
    return (
        <div>
            <button onClick={UpdateUs}>
                Update User/Admin
            </button>
        </div>
    );
}

