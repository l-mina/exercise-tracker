import { userLogin } from "../store/userLogin"

function Dashboard (){

    const { refreshToken, loading, refresh } = userLogin();
    

    return(
        <div>user dash</div>
    )
}

export default Dashboard;