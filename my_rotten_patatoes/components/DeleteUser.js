import axios from "axios";
import {useRouter} from 'next/router';

export default function DeleteUser(){

    const router = useRouter();
    const {id} = router.query


     function deleteUs () {
         axios.delete(`http://localhost:3000/api/users/${id}`)
         router.push('/Admin')
     }
    return (
        <div>
            <button onClick={deleteUs}>
                Delete User
            </button>
        </div>
    );
}

