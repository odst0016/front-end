import { axiosWithAuth } from "../utilities/axiosWithAuth"

axiosWithAuth()
    .get("https://potluck-planner-api.herokuapp.com/api/potlucks")
    .then((res)=>{
        res.data.map((item)=>{
            return <div>{item.items}</div>
        })
    })